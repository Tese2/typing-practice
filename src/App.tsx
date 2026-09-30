import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Lessons } from './pages/Lessons'
import { Practice } from './pages/Practice'
import { Results } from './pages/Results'
import { SettingsPage } from './pages/Settings'
import { lessons } from './data/lessons'
import { Statistics } from './pages/Statistics'
import { useTypingTest } from './hooks/useTypingTest'
import { choosePassage } from './utils/randomPassage'
import { categories, passages, programmingLanguages } from './data/passages/index'
import { clearHistory, deleteResult, getHistory, getLessonProgress, getSettings, recordLessonAttempt, saveResult, saveSettings } from './utils/storage'
import { recordRecentPassage } from './utils/practiceStorage'
import type { TypingLesson } from './types/lesson'
import type { Category, Difficulty, TestResult, TestSettings, TypingPassage } from './types/typing'

const defaults: TestSettings = {
  durationSeconds: 60, difficulty: 'Medium', category: 'General', mode: 'Time', wordTarget: 25, customText: '', language: 'JavaScript',
  theme: 'system', textSize: 'medium', caretStyle: 'line', showTimer: true, showWpm: true, showAccuracy: true, showErrors: true,
  showProgress: true, typingSound: false, completionSound: false, errorSound: false, autoFocus: true, reduceMotion: false,
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '')

function categoryFromUrl(value: string | null): Category | undefined {
  return categories.find((category) => slug(category) === slug(value ?? ''))
}

function difficultyFromUrl(value: string | null): Difficulty | undefined {
  return ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'].find((difficulty) => slug(difficulty) === slug(value ?? '')) as Difficulty | undefined
}

function languageFromUrl(value: string | null): string | undefined {
  return programmingLanguages.find((language) => slug(language) === slug(value ?? ''))
}

export default function App() {
  const location = useLocation()
  const routerNavigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = location.pathname.replace(/\/$/, '') || '/'
  const [settings, setSettings] = useState<TestSettings>(() => getSettings(defaults))
  const [history, setHistory] = useState<TestResult[]>(() => getHistory())
  const [lastResult, setLastResult] = useState<TestResult | undefined>(() => getHistory()[0])
  const [currentPassage, setCurrentPassage] = useState<TypingPassage | undefined>()
  const [activeLesson, setActiveLesson] = useState<TypingLesson | undefined>()
  const audioContext = useRef<AudioContext | null>(null)

  const playTone = (frequency: number) => {
    try {
      if (!audioContext.current) audioContext.current = new window.AudioContext()
      const context = audioContext.current
      if (context.state === 'suspended') void context.resume()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.frequency.value = frequency
      gain.gain.setValueAtTime(0.035, context.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.045)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start()
      oscillator.stop(context.currentTime + 0.05)
    } catch {
      // Audio is optional; unsupported browser audio never blocks practice.
    }
  }

  const navigate = (path: string) => {
    routerNavigate(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useLayoutEffect(() => {
    if (page !== '/practice') return
    const categoryParam = categoryFromUrl(searchParams.get('category'))
    const difficultyParam = difficultyFromUrl(searchParams.get('difficulty'))
    const languageParam = languageFromUrl(searchParams.get('language'))
    const nextCategory = categoryParam ?? settings.category
    const nextDifficulty = difficultyParam ?? settings.difficulty
    const nextLanguage = nextCategory === 'Programming'
      ? languageParam ?? (settings.category === 'Programming' && programmingLanguages.includes(settings.language as typeof programmingLanguages[number]) ? settings.language : programmingLanguages[0])
      : ''
    setSettings((current) => {
      if (current.category === nextCategory && current.difficulty === nextDifficulty && current.language === nextLanguage) return current
      return { ...current, category: nextCategory, difficulty: nextDifficulty, language: nextLanguage }
    })
    const normalizedParams = new URLSearchParams(searchParams)
    normalizedParams.set('category', slug(nextCategory))
    normalizedParams.set('difficulty', slug(nextDifficulty))
    if (nextCategory === 'Programming') normalizedParams.set('language', slug(nextLanguage))
    else normalizedParams.delete('language')
    if (normalizedParams.toString() !== searchParams.toString()) setSearchParams(normalizedParams, { replace: true })
  }, [location.search, page, searchParams, setSearchParams, settings.category, settings.difficulty, settings.language])

  const updateSettings = (next: TestSettings) => {
    setSettings(next)
    if (page !== '/practice') return
    const params = new URLSearchParams(location.search)
    params.set('category', slug(next.category))
    params.set('difficulty', slug(next.difficulty))
    if (next.category === 'Programming') params.set('language', slug(next.language))
    else params.delete('language')
    setSearchParams(params)
  }

  useEffect(() => saveSettings(settings), [settings])

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applyPreferences = () => {
      root.dataset.theme = settings.theme === 'system' ? media.matches ? 'dark' : 'light' : settings.theme
      root.dataset.textSize = settings.textSize
      root.dataset.reduceMotion = String(settings.reduceMotion)
    }
    applyPreferences()
    if (settings.theme !== 'system') return
    media.addEventListener('change', applyPreferences)
    return () => media.removeEventListener('change', applyPreferences)
  }, [settings.reduceMotion, settings.textSize, settings.theme])

  const handleFinish = (result: TestResult) => {
    if (settings.completionSound) playTone(660)
    if (result.passageId) recordRecentPassage(result.passageId)
    let completedResult = result
    if (activeLesson) {
      const passed = result.wpm >= activeLesson.targetWpm && result.accuracy >= activeLesson.targetAccuracy
      recordLessonAttempt(activeLesson, result, passed)
      const progress = getLessonProgress()[activeLesson.id]
      completedResult = {
        ...result,
        lessonId: activeLesson.id,
        lessonComplete: progress.completed,
        lessonAttempts: progress.attempts,
        lessonBestWpm: progress.bestWpm,
        lessonBestAccuracy: progress.bestAccuracy,
      }
    }
    saveResult(completedResult)
    setHistory(getHistory())
    setLastResult(completedResult)
    setActiveLesson(undefined)
    navigate(`/results?id=${result.id}`)
  }

  const test = useTypingTest(settings, handleFinish)

  const passageForResult = (result?: TestResult): TypingPassage | undefined => {
    if (!result) return undefined
    const catalogPassage = passages.find((item) => item.id === result.passageId)
    if (catalogPassage) return catalogPassage
    if (!result.passageContent) return undefined
    return {
      id: -1,
      title: result.passageTitle,
      content: result.passageContent,
      category: result.category,
      difficulty: result.difficulty,
      language: result.language ?? 'English',
      wordCount: result.wordCount ?? result.passageContent.trim().split(/\s+/).length,
      description: result.description,
      learningPoint: result.learningPoint,
    }
  }

  const selectedResultId = searchParams.get('id')
  const selectedResult = history.find((item) => item.id === selectedResultId) ?? lastResult

  const restoreResultSettings = (result: TestResult) => {
    setSettings((current) => ({
      ...current,
      category: result.category,
      difficulty: result.difficulty,
      language: result.category === 'Programming' && programmingLanguages.includes((result.language ?? '') as typeof programmingLanguages[number]) ? result.language ?? programmingLanguages[0] : '',
      durationSeconds: result.settingsDurationSeconds ?? current.durationSeconds,
      mode: result.mode ?? current.mode,
      wordTarget: result.wordTarget ?? current.wordTarget,
      customText: result.mode === 'Custom' ? result.passageContent ?? current.customText : current.customText,
    }))
  }

  const handleTyping = (value: string) => {
    if (value.length > test.state.typedText.length) {
      [...value.slice(test.state.typedText.length)].forEach((character, offset) => {
        const index = test.state.typedText.length + offset
        if (character !== test.state.targetText[index]) {
          if (settings.errorSound) playTone(180)
        } else if (settings.typingSound) playTone(420)
      })
    }
    test.type(value)
  }

  const visitPractice = (path: string) => {
    if (path.split('?')[0] === '/practice' && test.state.isFinished) test.reset()
    navigate(path)
  }

  const beginTest = (passage?: TypingPassage) => {
    const selected = passage ?? choosePassage(settings.category, settings.difficulty, settings.category === 'Programming' ? settings.language : undefined)
    const selectedText = settings.mode === 'Custom' && settings.customText.trim() ? settings.customText : selected?.content ?? 'Take a breath, find your rhythm, and begin again.'
    const selectedTitle = settings.mode === 'Custom' ? 'Custom practice' : selected?.title ?? 'A fresh start'
    const metadata = settings.mode === 'Custom' ? { ...selected, id: undefined, title: selectedTitle, content: selectedText, learningPoint: undefined } : selected
    if (metadata) setCurrentPassage(metadata as TypingPassage)
    test.start(selectedText, selectedTitle, metadata)
  }

  const startLesson = (lesson: TypingLesson) => {
    const lessonSettings: TestSettings = { ...settings, durationSeconds: lesson.durationSeconds, difficulty: 'Beginner', category: 'General', mode: 'Custom', customText: lesson.practiceText }
    setSettings(lessonSettings)
    setActiveLesson(lesson)
    const lessonPassage: TypingPassage = { id: -1, title: lesson.title, content: lesson.practiceText, category: 'Education', difficulty: 'Beginner', language: 'English', wordCount: lesson.practiceText.split(/\s+/).length, learningPoint: lesson.description }
    test.start(lesson.practiceText, lesson.title, lessonPassage)
    setCurrentPassage(lessonPassage)
    navigate('/practice')
  }

  const retryTest = () => {
    const result = selectedResult
    const passage = currentPassage?.title === result?.passageTitle ? currentPassage : passageForResult(result)
    if (result) {
      restoreResultSettings(result)
      setActiveLesson(lessons.find((lesson) => lesson.id === result.lessonId))
    } else setActiveLesson(undefined)
    if (passage) {
      setCurrentPassage(passage)
      test.start(passage.content, passage.title, passage)
      navigate('/practice')
    } else {
      test.reset()
      navigate('/practice')
    }
  }

  const freshPractice = () => {
    setActiveLesson(undefined)
    test.reset()
    navigate('/practice')
  }

  const changeResultSettings = () => {
    const passage = passageForResult(selectedResult)
    const category = selectedResult?.category ?? settings.category
    const difficulty = selectedResult?.difficulty ?? settings.difficulty
    const language = category === 'Programming' && programmingLanguages.includes((selectedResult?.language ?? '') as typeof programmingLanguages[number])
      ? selectedResult?.language ?? programmingLanguages[0]
      : category === 'Programming' ? programmingLanguages[0] : ''
    setSettings((current) => ({
      ...current,
      category,
      difficulty,
      language,
      durationSeconds: selectedResult?.settingsDurationSeconds ?? current.durationSeconds,
      mode: selectedResult?.mode ?? current.mode,
      wordTarget: selectedResult?.wordTarget ?? current.wordTarget,
    }))
    setCurrentPassage(passage)
    test.reset()
    const params = new URLSearchParams({ category: slug(category), difficulty: slug(difficulty) })
    if (category === 'Programming') params.set('language', slug(language))
    navigate(`/practice?${params}`)
  }

  const nextPractice = () => {
    const previous = currentPassage ?? passages.find((item) => item.id === selectedResult?.passageId)
    const category = previous?.category ?? selectedResult?.category ?? settings.category
    const difficulty = previous?.difficulty ?? selectedResult?.difficulty ?? settings.difficulty
    const language = previous?.language ?? selectedResult?.language ?? settings.language
    const languageSelection = category === 'Programming' && programmingLanguages.includes(language as typeof programmingLanguages[number]) ? language : settings.language
    const next = choosePassage(category, difficulty, category === 'Programming' ? languageSelection : undefined, previous?.id)
    if (!next) {
      setSettings((current) => ({ ...current, category, difficulty, language: languageSelection }))
      test.reset()
      navigate('/practice')
      return
    }
    setSettings((current) => ({ ...current, category, difficulty, language: languageSelection }))
    setCurrentPassage(next)
    test.start(next.content, next.title, next)
    navigate('/practice')
  }

  const viewResult = (result: TestResult) => {
    setLastResult(result)
    setCurrentPassage(passageForResult(result))
    restoreResultSettings(result)
    navigate(`/results?id=${result.id}`)
  }

  const practiceHistoryResult = (result: TestResult) => {
    setLastResult(result)
    const passage = passageForResult(result)
    setCurrentPassage(passage)
    restoreResultSettings(result)
    setActiveLesson(lessons.find((lesson) => lesson.id === result.lessonId))
    const category = result.category
    const language = category === 'Programming' && programmingLanguages.includes((result.language ?? '') as typeof programmingLanguages[number]) ? result.language ?? programmingLanguages[0] : ''
    navigate(`/practice?category=${slug(category)}&difficulty=${slug(result.difficulty)}${language ? `&language=${slug(language)}` : ''}`)
    if (passage) {
      setCurrentPassage(passage)
      test.start(passage.content, passage.title, passage)
    }
  }

  const removeResult = (id: string) => {
    if (!window.confirm('Delete this practice session?')) return
    const next = deleteResult(id)
    setHistory(next)
    if (lastResult?.id === id) setLastResult(next[0])
  }

  const removeAll = () => {
    if (!window.confirm('Clear your entire practice history? This cannot be undone.')) return
    clearHistory()
    setHistory([])
    setLastResult(undefined)
  }

  const resetSettings = () => {
    if (!window.confirm('Reset appearance and practice controls to their defaults?')) return
    setSettings(defaults)
  }

  const pageContent = () => {
    switch (page) {
      case '/practice': return <Practice settings={settings} onSettingsChange={updateSettings} state={test.state} passageTitle={currentPassage?.title ?? 'Practice text'} onBegin={beginTest} onType={handleTyping} onBackspace={test.countBackspace} onReset={retryTest} onFinish={test.finish} onHome={() => navigate('/')}/>
      case '/results': {
        const result = selectedResult
        return <Results result={result} onRetry={retryTest} onPractice={changeResultSettings} onNextPractice={nextPractice} onHistory={() => navigate('/history')}/>
      }
      case '/history': return <History history={history} onView={viewResult} onPracticeResult={practiceHistoryResult} onDelete={removeResult} onClear={removeAll} onPractice={freshPractice}/>
      case '/statistics': return <Statistics history={history} onPractice={freshPractice}/>
      case '/settings': return <SettingsPage settings={settings} onChange={setSettings} onReset={resetSettings}/>
      case '/lessons': return <Lessons onStart={startLesson}/>
      case '/about': return <About />
      default: return <Home navigate={visitPractice} history={history}/>
    }
  }

  return <div className="app-frame"><Navbar page={page} navigate={visitPractice}/><div className="site-content">{pageContent()}</div><Footer/></div>
}