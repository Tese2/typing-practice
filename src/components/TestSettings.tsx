import type { TestSettings, TypingPassage } from '../types/typing'
import { PracticeFilters } from './PracticeFilters'

interface TestSettingsProps { settings: TestSettings; onChange: (next: TestSettings) => void; onStart: (passage: TypingPassage) => void }

export function TestSettingsPanel({ settings, onChange, onStart }: TestSettingsProps) {
  return <section className="settings-panel learning-settings" aria-label="Practice settings">
    <PracticeFilters settings={settings} onChange={onChange} onStart={onStart}/>
  </section>
}