export interface TypingLesson {
  id: string
  title: string
  description: string
  practiceText: string
  targetWpm: number
  targetAccuracy: number
  durationSeconds: number
}

export interface LessonProgress {
  attempts: number
  bestWpm: number
  bestAccuracy: number
  completed: boolean
}