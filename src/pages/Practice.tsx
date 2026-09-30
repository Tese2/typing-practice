import { ArrowLeft, RotateCcw, Timer, Zap } from 'lucide-react'
import { TestSettingsPanel } from '../components/TestSettings'
import { TypingArea } from '../components/TypingArea'
import type { TestSettings, TypingPassage, TypingState } from '../types/typing'

interface PracticeProps {
  settings: TestSettings
  onSettingsChange: (settings: TestSettings) => void
  state: TypingState
  passageTitle: string
  onBegin: (passage: TypingPassage) => void
  onType: (value: string) => void
  onBackspace: () => void
  onReset: () => void
  onFinish: () => void
  onHome: () => void
}

function formatTime(seconds: number) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}` }

export function Practice({ settings, onSettingsChange, state, passageTitle, onBegin, onType, onBackspace, onReset, onFinish, onHome }: PracticeProps) {
  if (!state.targetText) return <main className="page-main practice-page"><div className="page-heading"><span className="section-kicker">PRACTICE WITH PURPOSE</span><h1>Learn something.<br /><em>Get a little faster.</em></h1><p>Choose a topic, preview what you’ll learn, and practice at your own pace.</p></div><TestSettingsPanel settings={settings} onChange={onSettingsChange} onStart={onBegin}/><div className="practice-reassurance"><span>01 / PICK A TOPIC</span><span>02 / LEARN AS YOU TYPE</span><span>03 / KEEP YOUR PROGRESS</span></div></main>

  const progress = state.targetText.length ? Math.round((state.typedText.length / state.targetText.length) * 100) : 0
  return <main className="page-main live-practice"><button className="back-link" onClick={onHome}><ArrowLeft size={15} /> Leave session</button><div className="practice-title-row"><div><span className="section-kicker">{settings.mode === 'Words' ? `${settings.wordTarget} WORD SESSION` : `${settings.durationSeconds} SECOND SESSION`}</span><h1>Stay in the <em>moment.</em></h1></div><button className="icon-button" onClick={onReset} aria-label="Restart this test" title="Restart test"><RotateCcw size={17}/></button></div>
    {(settings.showWpm || settings.showAccuracy || settings.showErrors || settings.showTimer) && <div className="live-stats" style={{ gridTemplateColumns: `repeat(${[settings.showWpm, settings.showAccuracy, settings.showErrors, settings.showTimer].filter(Boolean).length}, minmax(0, 1fr))` }}>
      {settings.showWpm && <div className="live-stat live-speed"><span><Zap size={14}/> SPEED</span><strong>{state.wpm}<small> WPM</small></strong></div>}
      {settings.showAccuracy && <div className="live-stat"><span>ACCURACY</span><strong>{state.accuracy}<small>%</small></strong></div>}
      {settings.showErrors && <div className="live-stat"><span>ERRORS</span><strong>{state.errors}</strong></div>}
      {settings.showTimer && <div className="live-stat live-clock"><span><Timer size={14}/> {settings.mode === 'Words' ? 'WORDS' : 'TIME'}</span><strong>{settings.mode === 'Words' ? `${Math.min(settings.wordTarget, state.typedText.trim().split(/\s+/).filter(Boolean).length)} / ${settings.wordTarget}` : formatTime(state.remainingSeconds)}</strong></div>}
    </div>}
    <div className="passage-meta"><span>PASSAGE</span><strong className="passage-name">{passageTitle}</strong><span>{state.targetText.split(/\s+/).length} words</span>{settings.showProgress && <span className="passage-progress">{progress}% complete</span>}</div><TypingArea targetText={state.targetText} typedText={state.typedText} active={!state.isFinished} finished={state.isFinished} autoFocus={settings.autoFocus} caretStyle={settings.caretStyle} onType={onType} onBackspace={onBackspace}/>
    <div className="practice-bottom"><span>{state.isStarted ? 'Nice and steady. Accuracy first.' : 'Start typing whenever you feel ready.'}</span><button className="text-button finish-button" onClick={onFinish} disabled={!state.isStarted}>Finish early <ArrowLeft size={14}/></button></div>
  </main>
}