export type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Expert'
export type Category = 'General' | 'Technology' | 'Programming' | 'Business' | 'Education' | 'Science' | 'Daily Life' | 'Quotes' | 'Numbers'
export type TestMode = 'Time' | 'Words' | 'Custom'
export type ThemePreference = 'system' | 'light' | 'dark'
export type TextSizePreference = 'small' | 'medium' | 'large' | 'extra-large'
export type CaretPreference = 'line' | 'block' | 'underline'

export interface TypingPassage {
  id: number
  title: string
  content: string
  category: Category
  difficulty: Difficulty
  language: string
  wordCount: number
  description?: string
  learningPoint?: string
}

export interface TestSettings {
  durationSeconds: number
  difficulty: Difficulty
  category: Category
  mode: TestMode
  wordTarget: number
  customText: string
  language: string
  theme: ThemePreference
  textSize: TextSizePreference
  caretStyle: CaretPreference
  showTimer: boolean
  showWpm: boolean
  showAccuracy: boolean
  showErrors: boolean
  showProgress: boolean
  typingSound: boolean
  completionSound: boolean
  errorSound: boolean
  autoFocus: boolean
  reduceMotion: boolean
}

export interface TypingState {
  targetText: string
  typedText: string
  currentIndex: number
  correctCharacters: number
  incorrectCharacters: number
  totalCharacters: number
  errors: number
  backspaces: number
  elapsedSeconds: number
  remainingSeconds: number
  wpm: number
  rawWpm: number
  accuracy: number
  isStarted: boolean
  isFinished: boolean
}

export interface TestResult {
  id: string
  date: string
  wpm: number
  rawWpm: number
  accuracy: number
  correctCharacters: number
  incorrectCharacters: number
  totalCharacters: number
  completionPercentage: number
  errors: number
  backspaces: number
  durationSeconds: number
  difficulty: Difficulty
  category: Category
  passageTitle: string
  passageId?: number
  passageContent?: string
  settingsDurationSeconds?: number
  mode?: TestMode
  wordTarget?: number
  language?: string
  wordCount?: number
  description?: string
  learningPoint?: string
  lessonId?: string
  lessonComplete?: boolean
  lessonAttempts?: number
  lessonBestWpm?: number
  lessonBestAccuracy?: number
}