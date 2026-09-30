import { useCallback, useEffect, useRef, useState } from 'react'
import type { TestResult, TestSettings, TypingPassage, TypingState } from '../types/typing'
import { calculateMetrics } from '../utils/typingCalculations'
import { useTimer } from './useTimer'

const emptyState: TypingState = {
  targetText: '', typedText: '', currentIndex: 0, correctCharacters: 0, incorrectCharacters: 0,
  totalCharacters: 0, errors: 0, backspaces: 0, elapsedSeconds: 0, remainingSeconds: 60,
  wpm: 0, rawWpm: 0, accuracy: 100, isStarted: false, isFinished: false,
}

export function useTypingTest(settings: TestSettings, onFinish: (result: TestResult) => void) {
  const [state, setState] = useState<TypingState>({ ...emptyState, remainingSeconds: settings.durationSeconds })
  const [passageTitle, setPassageTitle] = useState('Practice passage')
  const [passageMetadata, setPassageMetadata] = useState<Partial<TypingPassage>>({})
  const finishCallback = useRef(onFinish)
  const finishedRef = useRef(false)
  const backspacesRef = useRef(0)
  finishCallback.current = onFinish

  const finish = useCallback((finalState = state) => {
    if (finishedRef.current || finalState.isFinished) return
    finishedRef.current = true
    const metrics = calculateMetrics(finalState.targetText, finalState.typedText, finalState.elapsedSeconds)
    const result: TestResult = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      date: new Date().toISOString(),
      ...metrics,
      completionPercentage: finalState.targetText.length ? Math.round((finalState.typedText.length / finalState.targetText.length) * 100) : 0,
      errors: finalState.errors,
      backspaces: finalState.backspaces,
      durationSeconds: Math.max(1, finalState.elapsedSeconds),
      difficulty: settings.difficulty,
      category: settings.category,
      passageTitle,
      passageId: passageMetadata.id && passageMetadata.id > 0 ? passageMetadata.id : undefined,
      passageContent: finalState.targetText,
      settingsDurationSeconds: settings.durationSeconds,
      mode: settings.mode,
      wordTarget: settings.wordTarget,
      language: passageMetadata.language ?? settings.language,
      wordCount: passageMetadata.wordCount,
      description: passageMetadata.description,
      learningPoint: passageMetadata.learningPoint,
    }
    if (passageMetadata.category) result.category = passageMetadata.category
    if (passageMetadata.difficulty) result.difficulty = passageMetadata.difficulty
    setState({ ...finalState, ...metrics, isFinished: true, remainingSeconds: settings.mode === 'Words' ? 0 : Math.max(0, settings.durationSeconds - finalState.elapsedSeconds) })
    finishCallback.current(result)
  }, [passageMetadata, passageTitle, settings, state])

  const timer = useTimer(state.isStarted && !state.isFinished, settings.mode === 'Words' ? 0 : settings.durationSeconds, (elapsed) => {
    const elapsedSeconds = settings.mode === 'Words' ? elapsed : settings.durationSeconds
    const metrics = calculateMetrics(state.targetText, state.typedText, elapsedSeconds)
    finish({ ...state, ...metrics, elapsedSeconds, remainingSeconds: 0 })
  })

  useEffect(() => {
    if (state.isStarted || state.isFinished || !state.targetText || state.remainingSeconds === settings.durationSeconds) return
    setState((current) => ({ ...current, remainingSeconds: settings.durationSeconds }))
  }, [settings.durationSeconds, state.isFinished, state.isStarted, state.remainingSeconds, state.targetText])

  useEffect(() => {
    if (!state.isStarted || state.isFinished) return
    const elapsedSeconds = settings.mode === 'Words' ? timer.elapsedSeconds : Math.min(settings.durationSeconds, timer.elapsedSeconds)
    if (elapsedSeconds === state.elapsedSeconds) return
    const metrics = calculateMetrics(state.targetText, state.typedText, elapsedSeconds)
    const next = { ...state, ...metrics, elapsedSeconds, remainingSeconds: settings.mode === 'Words' ? 0 : Math.max(0, settings.durationSeconds - elapsedSeconds) }
    setState(next)
    if (settings.mode !== 'Words' && elapsedSeconds >= settings.durationSeconds) finish(next)
  }, [finish, settings.durationSeconds, settings.mode, state, timer.elapsedSeconds])

  const start = (targetText: string, title = 'Practice passage', metadata: Partial<TypingPassage> = {}) => {
    const safeText = targetText.trim() || 'Take a breath, find your rhythm, and begin again.'
    finishedRef.current = false
    backspacesRef.current = 0
    setPassageTitle(title)
    setPassageMetadata(metadata)
    timer.reset()
    setState({ ...emptyState, targetText: safeText, remainingSeconds: settings.durationSeconds })
  }

  const type = (typedText: string) => {
    if (state.isFinished || !state.targetText) return
    const nextText = typedText.slice(0, state.targetText.length)
    const newlyTyped = nextText.length > state.typedText.length ? nextText.slice(state.typedText.length) : ''
    const addedErrors = [...newlyTyped].reduce((count, character, offset) => {
      return count + (character === state.targetText[state.typedText.length + offset] ? 0 : 1)
    }, 0)
    const elapsedSeconds = Math.max(0, timer.elapsedSeconds)
    const metrics = calculateMetrics(state.targetText, nextText, elapsedSeconds)
    const next: TypingState = {
      ...state,
      ...metrics,
      typedText: nextText,
      currentIndex: nextText.length,
      errors: state.errors + addedErrors,
      backspaces: backspacesRef.current,
      isStarted: state.isStarted || nextText.length > 0,
      elapsedSeconds,
      remainingSeconds: Math.max(0, settings.durationSeconds - elapsedSeconds),
    }
    setState(next)
    const wordsTyped = nextText.trim().split(/\s+/).filter(Boolean).length
    if (nextText.length >= state.targetText.length || (settings.mode === 'Words' && wordsTyped >= settings.wordTarget)) finish(next)
  }

  const countBackspace = () => {
    if (state.isFinished) return
    backspacesRef.current += 1
    setState((current) => ({ ...current, backspaces: backspacesRef.current }))
  }

  return { state, start, type, countBackspace, finish: () => finish(), reset: () => { finishedRef.current = false; backspacesRef.current = 0; timer.reset(); setState({ ...emptyState, remainingSeconds: settings.durationSeconds }) } }
}