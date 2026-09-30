import { useEffect, useMemo, useState } from 'react'
import { Search, Shuffle, Star } from 'lucide-react'
import { categories, countPassages, difficulties, filterPassages, passages, programmingLanguages } from '../data/passages/index'
import type { Category, TestSettings, TypingPassage } from '../types/typing'
import { choosePassage } from '../utils/randomPassage'
import { getFavoritePassageIds, getRecentPassageIds, toggleFavoritePassage } from '../utils/practiceStorage'
import { CategoryCard } from './CategoryCard'
import { DifficultyCard } from './DifficultyCard'
import { PassagePreview } from './PassagePreview'
import { PassageSelector } from './PassageSelector'
import { ProgrammingLanguageSelector } from './ProgrammingLanguageSelector'

interface PracticeFiltersProps {
  settings: TestSettings
  onChange: (settings: TestSettings) => void
  onStart: (passage: TypingPassage) => void
}

export function PracticeFilters({ settings, onChange, onStart }: PracticeFiltersProps) {
  const [selectedId, setSelectedId] = useState<number>()
  const [search, setSearch] = useState('')
  const [lengthFilter, setLengthFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [favorites, setFavorites] = useState<number[]>(getFavoritePassageIds)
  const [recentIds] = useState<number[]>(getRecentPassageIds)
  const matchingPassages = useMemo(() => filterPassages({
    category: settings.category,
    language: settings.category === 'Programming' ? settings.language : undefined,
  }).filter((passage) => {
    if (passage.difficulty !== settings.difficulty) return false
    if (favoritesOnly && !favorites.includes(passage.id)) return false
    if (lengthFilter === 'short' && passage.wordCount > 15) return false
    if (lengthFilter === 'medium' && (passage.wordCount < 16 || passage.wordCount > 35)) return false
    if (lengthFilter === 'long' && passage.wordCount < 36) return false
    const query = search.trim().toLowerCase()
    return !query || [passage.title, passage.content, passage.category, passage.language, passage.learningPoint ?? ''].some((field) => field.toLowerCase().includes(query))
  }), [favorites, favoritesOnly, lengthFilter, search, settings.category, settings.difficulty, settings.language])
  const selectedPassage = matchingPassages.find((passage) => passage.id === selectedId) ?? matchingPassages[0]

  useEffect(() => {
    if (matchingPassages.some((passage) => passage.id === selectedId)) return
    const alternatives = matchingPassages.filter((passage) => !recentIds.includes(passage.id))
    const choices = alternatives.length > 0 ? alternatives : matchingPassages
    setSelectedId(choices.length ? choices[Math.floor(Math.random() * choices.length)].id : undefined)
  }, [matchingPassages, recentIds, selectedId])

  const update = (values: Partial<TestSettings>) => onChange({ ...settings, ...values })
  const selectCategory = (category: Category) => update({ category, language: category === 'Programming' ? programmingLanguages.includes(settings.language as typeof programmingLanguages[number]) ? settings.language : programmingLanguages[0] : 'English' })
  const selectAnother = () => {
    const fresh = matchingPassages.filter((passage) => passage.id !== selectedPassage?.id && !recentIds.includes(passage.id))
    const alternatives = matchingPassages.filter((passage) => passage.id !== selectedPassage?.id)
    const pool = fresh.length ? fresh : alternatives.length ? alternatives : matchingPassages
    const passage = pool.length ? pool[Math.floor(Math.random() * pool.length)] : choosePassage(settings.category, settings.difficulty, settings.category === 'Programming' ? settings.language : undefined, selectedPassage?.id)
    setSelectedId(passage?.id)
  }
  const toggleFavorite = () => {
    if (!selectedPassage || selectedPassage.id < 1) return
    setFavorites(toggleFavoritePassage(selectedPassage.id))
  }
  const clearFilters = () => {
    setSearch('')
    setLengthFilter('all')
    setFavoritesOnly(false)
    update({ category: 'General', difficulty: 'Medium', language: '' })
  }
  const startSelected = () => {
    if (!selectedPassage) return
    if (settings.mode === 'Custom') {
      const content = settings.customText.trim()
      onStart({ ...selectedPassage, id: -1, title: 'Custom practice', content, wordCount: content.split(/\s+/).length, description: 'Your own text for this practice session.', learningPoint: undefined })
      return
    }
    onStart(selectedPassage)
  }

  const matchesQuickFilters = (passage: TypingPassage) => {
    const query = search.trim().toLowerCase()
    const queryMatch = !query || [passage.title, passage.content, passage.category, passage.language, passage.learningPoint ?? ''].some((field) => field.toLowerCase().includes(query))
    const lengthMatch = lengthFilter === 'all' || (lengthFilter === 'short' ? passage.wordCount <= 15 : lengthFilter === 'medium' ? passage.wordCount >= 16 && passage.wordCount <= 35 : passage.wordCount >= 36)
    return queryMatch && lengthMatch && (!favoritesOnly || favorites.includes(passage.id))
  }
  const categoryCounts = Object.fromEntries(categories.map((category) => [category, passages.filter((passage) => passage.category === category && matchesQuickFilters(passage)).length])) as Record<Category, number>
  const difficultyCounts = Object.fromEntries(difficulties.map((difficulty) => [difficulty, filterPassages({ category: settings.category, difficulty, language: settings.category === 'Programming' ? settings.language : undefined }).filter(matchesQuickFilters).length]))
  const languageCount = settings.category === 'Programming' ? countPassages({ category: 'Programming', language: settings.language }) : 0
  const recentPassages = recentIds.map((id) => matchingPassages.find((passage) => passage.id === id)).filter((passage): passage is TypingPassage => Boolean(passage)).slice(0, 4)

  return <div className="practice-filters">
    <section className="filter-step"><div className="filter-step-heading"><span className="step-number">01</span><div><span className="section-kicker">CHOOSE A TOPIC</span><h2>What do you want to practice?</h2></div></div><div className="filter-category-grid">{categories.map((category) => <CategoryCard key={category} category={category} count={categoryCounts[category]} selected={settings.category === category} onSelect={() => selectCategory(category)}/>)}</div></section>
    {settings.category === 'Programming' && <section className="filter-step language-step"><div className="filter-step-heading"><span className="step-number">02</span><div><span className="section-kicker">CODE PRACTICE</span><h2>Choose your language.</h2></div></div><ProgrammingLanguageSelector selectedLanguage={settings.language} onSelect={(language) => update({ language })}/><div className="language-total">{languageCount} educational texts available in {settings.language}</div></section>}
    <section className="practice-search-filter"><label className="practice-search"><Search size={16}/><span className="sr-only">Search practice texts</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search practice texts..."/></label><label className="length-filter"><span>Length</span><select value={lengthFilter} onChange={(event) => setLengthFilter(event.target.value as typeof lengthFilter)}><option value="all">All lengths</option><option value="short">Short · up to 15 words</option><option value="medium">Medium · 16 to 35 words</option><option value="long">Long · 36+ words</option></select></label><label className="favorites-filter"><input type="checkbox" checked={favoritesOnly} onChange={(event) => setFavoritesOnly(event.target.checked)}/><Star size={14}/> Favorites only</label><button className="text-button clear-filter-button" onClick={clearFilters}>Clear filters</button></section>
    <section className="filter-step difficulty-step"><div className="filter-step-heading"><span className="step-number">{settings.category === 'Programming' ? '03' : '02'}</span><div><span className="section-kicker">FIND YOUR LEVEL</span><h2>Choose your level.</h2></div></div><div className="difficulty-grid">{Object.entries(difficultyCounts).map(([difficulty, count]) => <DifficultyCard key={difficulty} difficulty={difficulty as TestSettings['difficulty']} count={count} selected={settings.difficulty === difficulty} onSelect={() => update({ difficulty: difficulty as TestSettings['difficulty'] })}/>)}</div></section>
    {matchingPassages.length === 0 ? <section className="filter-empty"><span className="section-kicker">{favoritesOnly ? 'YOUR SAVED TEXTS' : 'NO TEXTS IN THIS COMBINATION'}</span><h2>{favoritesOnly ? 'No favorite passages yet.' : 'No passages found.'}</h2><p>{favoritesOnly ? 'Tap the star on a passage to save it here.' : 'Try changing your filters.'}</p><button className="button button-outline" onClick={favoritesOnly ? () => setFavoritesOnly(false) : clearFilters}>{favoritesOnly ? 'Browse passages' : 'Clear filters'}</button></section> : selectedPassage && <section className="filter-step preview-step"><div className="filter-step-heading"><span className="step-number">{settings.category === 'Programming' ? '04' : '03'}</span><div><span className="section-kicker">A LITTLE PREVIEW</span><h2>Choose a practice text.</h2></div></div><div className="preview-toolbar"><PassageSelector passages={matchingPassages} selectedId={selectedPassage.id} onChange={setSelectedId}/><button className="text-button" onClick={selectAnother} type="button">Pick another <span aria-hidden="true">↻</span></button><button className="button button-outline random-button" onClick={selectAnother}><Shuffle size={14}/> Random practice</button></div><PassagePreview passage={selectedPassage} favorite={favorites.includes(selectedPassage.id)} onToggleFavorite={toggleFavorite}/></section>}
    {recentPassages.length > 0 && <section className="recent-practices"><span className="section-kicker">RECENTLY PRACTICED</span><div>{recentPassages.map((passage) => <button key={passage.id} className="recent-passage" onClick={() => setSelectedId(passage.id)}>{passage.title}<span>{passage.language === 'English' ? passage.category : passage.language}</span></button>)}</div></section>}
    <div className="filter-settings-footer"><fieldset className="session-mode"><legend>Test mode</legend><div className="mode-switch">{(['Time', 'Words', 'Custom'] as const).map((mode) => <button type="button" key={mode} className={settings.mode === mode ? 'selected' : ''} aria-pressed={settings.mode === mode} onClick={() => update({ mode })}>{mode}</button>)}</div></fieldset>{settings.mode === 'Words' && <label className="setting-field word-setting"><span className="field-label">Word target</span><select value={settings.wordTarget} onChange={(event) => update({ wordTarget: Number(event.target.value) })}><option value={10}>10 words</option><option value={25}>25 words</option><option value={50}>50 words</option></select></label>}{settings.mode === 'Custom' && <label className="setting-field custom-setting"><span className="field-label">Your passage</span><textarea rows={3} value={settings.customText} onChange={(event) => update({ customText: event.target.value })} placeholder="Paste or write a passage to practice"/></label>}<fieldset className="session-mode duration-setting"><legend>Duration</legend><div className="option-row">{[15, 30, 60, 120].map((seconds) => <button type="button" key={seconds} className={`option-button ${settings.durationSeconds === seconds ? 'selected' : ''}`} aria-pressed={settings.durationSeconds === seconds} onClick={() => update({ durationSeconds: seconds })}>{seconds}<small>s</small></button>)}</div></fieldset></div>
    <button className="button button-green start-button" onClick={startSelected} disabled={!selectedPassage || (settings.mode === 'Custom' && !settings.customText.trim())}><span>Start practice</span><span aria-hidden="true">↗</span></button>
    <p className="settings-note">No account needed. Your progress and learning history stay on this device.</p>
  </div>
}