import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import type { TestResult } from '../types/typing'
import { LearningPoint } from './LearningPoint'

interface ResultCardProps { result: TestResult; onRetry: () => void; onPractice: () => void; onNextPractice: () => void; onHistory: () => void }

export function ResultCard({ result, onRetry, onPractice, onNextPractice, onHistory }: ResultCardProps) {
  const message = result.wpm >= 60 ? 'A lovely rhythm.' : result.wpm >= 35 ? 'Your flow is building.' : 'Every session is a fresh start.'
  return <section className="result-card">
    <div className="result-banner"><span className="section-kicker">{result.lessonId ? result.lessonComplete ? 'LESSON COMPLETE' : 'LESSON SESSION' : 'SESSION COMPLETE'}</span><span className="result-spark" aria-hidden="true">✳</span><h1>{result.lessonId && result.lessonComplete ? 'Lesson complete.' : message}</h1><p>You showed up, stayed focused, and put in the practice.</p></div>
    <div className="result-primary"><div><span>Typing speed</span><strong>{result.wpm}<small> WPM</small></strong></div><div><span>Accuracy</span><strong>{result.accuracy}<small>%</small></strong></div></div>
    <div className="result-detail-grid">
      <div><span>Raw speed</span><strong>{result.rawWpm} WPM</strong></div>
      <div><span>Correct characters</span><strong>{result.correctCharacters}</strong></div>
      <div><span>Incorrect characters</span><strong>{result.incorrectCharacters}</strong></div>
      <div><span>Passage completed</span><strong>{result.completionPercentage}%</strong></div>
      <div><span>Errors</span><strong>{result.errors}</strong></div>
      <div><span>Backspaces</span><strong>{result.backspaces}</strong></div>
      <div><span>Practice time</span><strong>{result.durationSeconds} sec</strong></div>
    </div>
    {result.learningPoint && <section className="result-learning"><span className="section-kicker">WHAT YOU LEARNED</span><h2>{result.passageTitle}</h2>{result.description && <p className="result-learning-description">{result.description}</p>}<LearningPoint title="KEY IDEA">{result.learningPoint}</LearningPoint></section>}
    {result.lessonId && <section className="lesson-result-summary"><span>Lesson attempts <strong>{result.lessonAttempts ?? 1}</strong></span><span>Best WPM <strong>{result.lessonBestWpm ?? result.wpm}</strong></span><span>Best accuracy <strong>{result.lessonBestAccuracy ?? result.accuracy}%</strong></span></section>}
    <div className="result-context"><span>{result.difficulty}</span><span>{result.category}</span>{result.category === 'Programming' && result.language && <span>{result.language}</span>}<span>{result.passageTitle}</span></div>
    <div className="result-actions"><button className="button button-dark" onClick={onRetry}><RotateCcw size={16} /> Try again</button><button className="button button-green" onClick={onNextPractice}>Continue <ArrowRight size={16} /></button><button className="button button-outline" onClick={onPractice}><ArrowLeft size={15}/> Change settings</button><button className="button button-quiet" onClick={onHistory}>View history</button></div>
  </section>
}