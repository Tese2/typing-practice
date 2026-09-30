import { Monitor, Moon, RotateCcw, Sun } from 'lucide-react'
import type { TestSettings, ThemePreference, TextSizePreference, CaretPreference } from '../types/typing'

interface SettingsPageProps { settings: TestSettings; onChange: (settings: TestSettings) => void; onReset: () => void }

const switches = [
  { key: 'showTimer', title: 'Show timer', detail: 'Display the remaining time during practice.' },
  { key: 'showWpm', title: 'Show WPM', detail: 'Show live typing speed.' },
  { key: 'showAccuracy', title: 'Show accuracy', detail: 'Show live character accuracy.' },
  { key: 'showErrors', title: 'Show errors', detail: 'Show the current error count.' },
  { key: 'showProgress', title: 'Show progress', detail: 'Show passage completion progress.' },
  { key: 'autoFocus', title: 'Auto focus typing area', detail: 'Focus the typing input when a passage starts.' },
  { key: 'reduceMotion', title: 'Reduce animations', detail: 'Minimize transitions and animated effects.' },
  { key: 'typingSound', title: 'Typing sound', detail: 'Play a soft tone for correct keystrokes.' },
  { key: 'errorSound', title: 'Error sound', detail: 'Play a soft tone for incorrect keystrokes.' },
  { key: 'completionSound', title: 'Completion sound', detail: 'Play a tone when a test ends.' },
] as const

export function SettingsPage({ settings, onChange, onReset }: SettingsPageProps) {
  const update = <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => onChange({ ...settings, [key]: value })
  return <main className="page-main data-page settings-page"><div className="page-heading compact-heading"><span className="section-kicker">MAKE THE SPACE YOURS</span><h1>Your practice, <em>your way.</em></h1><p>Preferences are saved only in this browser.</p></div>
    <section className="settings-section"><div className="settings-section-heading"><span className="section-kicker">APPEARANCE</span><h2>Reading comfort</h2></div>
      <div className="settings-row"><div><strong>Theme</strong><small>Choose a look or follow your device.</small></div><div className="settings-segment" role="group" aria-label="Theme">{([{ value: 'system', label: 'System', icon: <Monitor size={14}/> }, { value: 'light', label: 'Light', icon: <Sun size={14}/> }, { value: 'dark', label: 'Dark', icon: <Moon size={14}/> }] as const).map((option) => <button key={option.value} className={settings.theme === option.value ? 'selected' : ''} aria-pressed={settings.theme === option.value} onClick={() => update('theme', option.value as ThemePreference)}>{option.icon}{option.label}</button>)}</div></div>
      <label className="settings-row"><span><strong>Text size</strong><small>Adjust the passage and reading text.</small></span><select value={settings.textSize} onChange={(event) => update('textSize', event.target.value as TextSizePreference)}><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option><option value="extra-large">Extra large</option></select></label>
      <div className="settings-row"><div><strong>Caret style</strong><small>Choose how the current character is marked.</small></div><div className="settings-segment" role="group" aria-label="Caret style">{(['line', 'block', 'underline'] as const).map((style) => <button key={style} className={settings.caretStyle === style ? 'selected' : ''} aria-pressed={settings.caretStyle === style} onClick={() => update('caretStyle', style as CaretPreference)}>{style[0].toUpperCase() + style.slice(1)}</button>)}</div></div>
    </section>
    <section className="settings-section"><div className="settings-section-heading"><span className="section-kicker">PRACTICE DISPLAY</span><h2>Keep the useful signals.</h2></div>{switches.slice(0, 6).map(({ key, title, detail }) => <label className="settings-toggle-row" key={key}><span><strong>{title}</strong><small>{detail}</small></span><input type="checkbox" checked={settings[key]} onChange={(event) => update(key, event.target.checked)}/></label>)}</section>
    <section className="settings-section"><div className="settings-section-heading"><span className="section-kicker">SOUND & MOTION</span><h2>Keep it comfortable.</h2></div>{switches.slice(6).map(({ key, title, detail }) => <label className="settings-toggle-row" key={key}><span><strong>{title}</strong><small>{detail}</small></span><input type="checkbox" checked={settings[key]} onChange={(event) => update(key, event.target.checked)}/></label>)}</section>
    <div className="settings-reset-row"><span>Restore the default appearance and practice controls.</span><button className="button button-outline" onClick={onReset}><RotateCcw size={15}/> Reset settings</button></div>
  </main>
}