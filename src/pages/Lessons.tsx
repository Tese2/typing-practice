import { useEffect, useState } from 'react'
import { lessons } from '../data/lessons'
import { LessonCard } from '../components/LessonCard'
import { getLessonProgress } from '../utils/storage'
import type { TypingLesson } from '../types/lesson'

interface LessonsProps { onStart: (lesson: TypingLesson) => void }

export function Lessons({ onStart }: LessonsProps) {
  const [progress, setProgress] = useState(getLessonProgress)
  useEffect(() => setProgress(getLessonProgress()), [])
  return <main className="page-main lessons-page"><div className="page-heading compact-heading"><span className="section-kicker">GUIDED PRACTICE, AT YOUR PACE</span><h1>Learn the <em>lay of the keys.</em></h1><p>Short, focused lessons help build muscle memory without making a big thing of it.</p></div><div className="lesson-list">{lessons.map((lesson, index) => <LessonCard key={lesson.id} lesson={lesson} index={index} progress={progress[lesson.id]} onStart={() => onStart(lesson)}/>)}</div><p className="lesson-footnote">Complete the target goals to mark a lesson finished. Attempts and personal bests stay on this device.</p></main>
}