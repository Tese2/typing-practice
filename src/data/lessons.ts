import type { TypingLesson } from '../types/lesson'

export const lessons: TypingLesson[] = [
  { id: 'home-row', title: 'Home row', description: 'Build a steady foundation with the keys your fingers return to.', practiceText: 'asdf jkl; asdf jkl; sad lad fall ask flask', targetWpm: 18, targetAccuracy: 90, durationSeconds: 30 },
  { id: 'left-hand', title: 'Left hand', description: 'Practice reaching across the left side without looking down.', practiceText: 'we are ready to read; a few words are easy', targetWpm: 20, targetAccuracy: 91, durationSeconds: 30 },
  { id: 'right-hand', title: 'Right hand', description: 'Let your right hand find common letters and punctuation.', practiceText: 'join your right hand to the rhythm of typing', targetWpm: 20, targetAccuracy: 91, durationSeconds: 30 },
  { id: 'top-row', title: 'Top row', description: 'Reach upward while keeping your hands relaxed.', practiceText: 'quiet power grows when you type with care', targetWpm: 22, targetAccuracy: 92, durationSeconds: 30 },
  { id: 'bottom-row', title: 'Bottom row', description: 'Get comfortable with the lower row and nearby spaces.', practiceText: 'move your fingers below the home row with ease', targetWpm: 22, targetAccuracy: 92, durationSeconds: 30 },
  { id: 'numbers', title: 'Numbers', description: 'Practice number sequences and keep a consistent rhythm.', practiceText: '2026 brings 12 new months, 52 weeks, and 365 chances.', targetWpm: 24, targetAccuracy: 92, durationSeconds: 30 },
  { id: 'symbols', title: 'Symbols', description: 'Build accuracy with quotes, commas, brackets, and marks.', practiceText: '“Pause,” she said, “then try again: one step at a time.”', targetWpm: 24, targetAccuracy: 93, durationSeconds: 30 },
  { id: 'programming', title: 'Code practice', description: 'Type realistic code punctuation with accuracy and flow.', practiceText: 'const total = items.reduce((sum, item) => sum + item.price, 0);', targetWpm: 26, targetAccuracy: 94, durationSeconds: 30 },
]