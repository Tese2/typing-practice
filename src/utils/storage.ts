import { categories, difficulties, programmingLanguages } from '../data/passages/index'
import type { LessonProgress, TypingLesson } from '../types/lesson'
import type { TestResult, TestSettings } from '../types/typing'

const HISTORY_KEY = 'typing_history'
const SETTINGS_KEY = 'typing_settings'
const LESSONS_KEY = 'lesson_progress'
const LESSON_PROGRESS_KEY = 'typing_lesson_progress'

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage may be disabled or full; the app remains usable for this session.
  }
}

export function getHistory(): TestResult[] {
  const value = readJson<unknown>(HISTORY_KEY, [])
  return Array.isArray(value) ? value.map(normalizeResult).filter((item): item is TestResult => item !== undefined) : []
}

function normalizeResult(value: unknown): TestResult | undefined {
  if (!value || typeof value !== 'object') return undefined
  const item = value as Record<string, unknown>
  const numericFields = ['wpm', 'rawWpm', 'accuracy', 'correctCharacters', 'incorrectCharacters', 'errors', 'backspaces', 'durationSeconds']
  const valid = typeof item.id === 'string' && typeof item.date === 'string' && Number.isFinite(Date.parse(item.date))
    && typeof item.passageTitle === 'string' && numericFields.every((field) => typeof item[field] === 'number' && Number.isFinite(item[field]))
    && (item.accuracy as number) >= 0 && (item.accuracy as number) <= 100
    && difficulties.includes(item.difficulty as TestResult['difficulty'])
    && categories.includes(item.category as TestResult['category'])
  if (!valid) return undefined

  const correctCharacters = item.correctCharacters as number
  const incorrectCharacters = item.incorrectCharacters as number
  const completion = item.completionPercentage
  return {
    ...item,
    totalCharacters: typeof item.totalCharacters === 'number' && Number.isFinite(item.totalCharacters) ? item.totalCharacters : correctCharacters + incorrectCharacters,
    completionPercentage: typeof completion === 'number' && Number.isFinite(completion) && completion >= 0 && completion <= 100 ? completion : 0,
    language: typeof item.language === 'string' ? item.language : 'English',
    settingsDurationSeconds: typeof item.settingsDurationSeconds === 'number' ? item.settingsDurationSeconds : undefined,
    mode: ['Time', 'Words', 'Custom'].includes(String(item.mode)) ? item.mode as TestResult['mode'] : undefined,
    wordTarget: typeof item.wordTarget === 'number' ? item.wordTarget : undefined,
    passageContent: typeof item.passageContent === 'string' ? item.passageContent : undefined,
    lessonId: typeof item.lessonId === 'string' ? item.lessonId : undefined,
    lessonComplete: typeof item.lessonComplete === 'boolean' ? item.lessonComplete : undefined,
    lessonAttempts: typeof item.lessonAttempts === 'number' ? item.lessonAttempts : undefined,
    lessonBestWpm: typeof item.lessonBestWpm === 'number' ? item.lessonBestWpm : undefined,
    lessonBestAccuracy: typeof item.lessonBestAccuracy === 'number' ? item.lessonBestAccuracy : undefined,
  } as unknown as TestResult
}

function updateStatistics(history: TestResult[]): void {
  const tests = history.length
  const averageWpm = tests ? Math.round(history.reduce((sum, item) => sum + item.wpm, 0) / tests) : 0
  writeJson('typing_statistics', { tests, averageWpm, bestWpm: Math.max(0, ...history.map((item) => item.wpm)) })
}

export function saveResult(result: TestResult): void {
  const history = [result, ...getHistory()]
  writeJson(HISTORY_KEY, history)
  updateStatistics(history)
}

export function deleteResult(id: string): TestResult[] {
  const history = getHistory().filter((item) => item.id !== id)
  writeJson(HISTORY_KEY, history)
  updateStatistics(history)
  return history
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(HISTORY_KEY)
    window.localStorage.removeItem('typing_statistics')
  } catch {
    // Storage may be disabled; keep the in-memory view responsive.
  }
}

export function getSettings(fallback: TestSettings): TestSettings {
  const value = readJson<Partial<TestSettings>>(SETTINGS_KEY, {})
  const saved = value && typeof value === 'object' ? value : {}
  return {
    durationSeconds: [15, 30, 60, 120].includes(Number(saved.durationSeconds)) ? Number(saved.durationSeconds) : fallback.durationSeconds,
    difficulty: difficulties.includes(saved.difficulty as TestSettings['difficulty']) ? saved.difficulty as TestSettings['difficulty'] : fallback.difficulty,
    category: categories.includes(saved.category as TestSettings['category']) ? saved.category as TestSettings['category'] : fallback.category,
    mode: ['Time', 'Words', 'Custom'].includes(String(saved.mode)) ? saved.mode as TestSettings['mode'] : fallback.mode,
    wordTarget: [10, 25, 50].includes(Number(saved.wordTarget)) ? Number(saved.wordTarget) : fallback.wordTarget,
    customText: typeof saved.customText === 'string' ? saved.customText : fallback.customText,
    language: programmingLanguages.includes(saved.language as typeof programmingLanguages[number]) ? saved.language as string : fallback.language,
    theme: ['system', 'light', 'dark'].includes(String(saved.theme)) ? saved.theme as TestSettings['theme'] : fallback.theme,
    textSize: ['small', 'medium', 'large', 'extra-large'].includes(String(saved.textSize)) ? saved.textSize as TestSettings['textSize'] : fallback.textSize,
    caretStyle: ['line', 'block', 'underline'].includes(String(saved.caretStyle)) ? saved.caretStyle as TestSettings['caretStyle'] : fallback.caretStyle,
    showTimer: typeof saved.showTimer === 'boolean' ? saved.showTimer : fallback.showTimer,
    showWpm: typeof saved.showWpm === 'boolean' ? saved.showWpm : fallback.showWpm,
    showAccuracy: typeof saved.showAccuracy === 'boolean' ? saved.showAccuracy : fallback.showAccuracy,
    showErrors: typeof saved.showErrors === 'boolean' ? saved.showErrors : fallback.showErrors,
    showProgress: typeof saved.showProgress === 'boolean' ? saved.showProgress : fallback.showProgress,
    typingSound: typeof saved.typingSound === 'boolean' ? saved.typingSound : fallback.typingSound,
    completionSound: typeof saved.completionSound === 'boolean' ? saved.completionSound : fallback.completionSound,
    errorSound: typeof saved.errorSound === 'boolean' ? saved.errorSound : fallback.errorSound,
    autoFocus: typeof saved.autoFocus === 'boolean' ? saved.autoFocus : fallback.autoFocus,
    reduceMotion: typeof saved.reduceMotion === 'boolean' ? saved.reduceMotion : fallback.reduceMotion,
  }
}

export function saveSettings(settings: TestSettings): void {
  writeJson(SETTINGS_KEY, settings)
}

export function getCompletedLessons(): string[] {
  const value = readJson<unknown>(LESSONS_KEY, readJson<unknown>('typing_lessons', []))
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

export function completeLesson(lesson: TypingLesson): void {
  const completed = new Set(getCompletedLessons())
  completed.add(lesson.id)
  writeJson(LESSONS_KEY, [...completed])
  writeJson('typing_lessons', [...completed])
}

export function getLessonProgress(): Record<string, LessonProgress> {
  const value = readJson<unknown>(LESSON_PROGRESS_KEY, {})
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, LessonProgress] => {
    const progress = entry[1]
    return Boolean(progress && typeof progress === 'object'
      && typeof (progress as LessonProgress).attempts === 'number'
      && typeof (progress as LessonProgress).bestWpm === 'number'
      && typeof (progress as LessonProgress).bestAccuracy === 'number'
      && typeof (progress as LessonProgress).completed === 'boolean')
  }))
}

export function recordLessonAttempt(lesson: TypingLesson, result: TestResult, completed: boolean): void {
  const progress = getLessonProgress()
  const previous = progress[lesson.id] ?? { attempts: 0, bestWpm: 0, bestAccuracy: 0, completed: false }
  progress[lesson.id] = {
    attempts: previous.attempts + 1,
    bestWpm: Math.max(previous.bestWpm, result.wpm),
    bestAccuracy: Math.max(previous.bestAccuracy, result.accuracy),
    completed: previous.completed || completed,
  }
  writeJson(LESSON_PROGRESS_KEY, progress)
  if (progress[lesson.id].completed) completeLesson(lesson)
}