import { ArrowUpRight, Check, Target } from 'lucide-react'
import type { TypingLesson } from '../types/lesson'
import type { LessonProgress } from '../types/lesson'

interface LessonCardProps { lesson: TypingLesson; index: number; progress?: LessonProgress; onStart: () => void }

export function LessonCard({ lesson, index, progress, onStart }: LessonCardProps) {
  const completed = progress?.completed ?? false
  return <article className={`lesson-card ${completed ? 'lesson-done' : ''}`}>
    <div className="lesson-number">{String(index + 1).padStart(2, '0')}<span>{completed && <Check size={14} />}</span></div>
    <div className="lesson-content"><span className="section-kicker">{completed ? 'COMPLETED' : `LESSON ${index + 1}`}</span><h2>{lesson.title}</h2><p>{lesson.description}</p><div className="lesson-target"><span><Target size={14} /> {lesson.targetWpm} WPM</span><span>{lesson.targetAccuracy}% accuracy</span></div>{progress && <div className="lesson-progress-summary"><span>Attempts <strong>{progress.attempts}</strong></span><span>Best <strong>{progress.bestWpm} WPM</strong></span><span><strong>{progress.bestAccuracy}%</strong> accuracy</span></div>}<button className="text-button" onClick={onStart}>{completed ? 'Practice again' : 'Start lesson'} <ArrowUpRight size={15} /></button></div>
    <div className="lesson-sample" aria-label="Practice text">{lesson.practiceText}</div>
  </article>
}