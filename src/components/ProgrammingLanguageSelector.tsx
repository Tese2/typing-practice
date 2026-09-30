import { Check } from 'lucide-react'
import type { ProgrammingLanguage } from '../data/passages/index'
import { getLanguageCounts, programmingLanguages } from '../data/passages/index'
import { PassageCount } from './PassageCount'

interface ProgrammingLanguageSelectorProps { selectedLanguage: string; onSelect: (language: ProgrammingLanguage) => void }

export function ProgrammingLanguageSelector({ selectedLanguage, onSelect }: ProgrammingLanguageSelectorProps) {
  const counts = getLanguageCounts()
  return <fieldset className="language-fieldset"><legend>Programming language <span>CHOOSE ONE</span></legend><div className="language-grid">{programmingLanguages.map((language) => <button type="button" key={language} className={`language-option ${selectedLanguage === language ? 'selected' : ''}`} aria-pressed={selectedLanguage === language} onClick={() => onSelect(language)}><span>{language}</span><PassageCount count={counts[language]} compact/>{selectedLanguage === language && <Check size={13}/>}</button>)}</div></fieldset>
}