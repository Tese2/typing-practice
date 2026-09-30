import { filterPassages } from '../data/passages/index'
import type { Category, Difficulty, TypingPassage } from '../types/typing'

const recentByFilter = new Map<string, number[]>()

export function choosePassage(category: Category, difficulty?: Difficulty, language?: string, excludeId?: number): TypingPassage | undefined {
  const matches = filterPassages({ category, difficulty, language })
  const key = `${category}|${difficulty ?? '*'}|${category === 'Programming' ? language ?? '*' : '*'}`
  const recent = recentByFilter.get(key) ?? []
  const alternatives = matches.filter((passage) => passage.id !== excludeId && !recent.includes(passage.id))
  const unexcluded = matches.filter((passage) => passage.id !== excludeId)
  const pool = alternatives.length > 0 ? alternatives : unexcluded.length > 0 ? unexcluded : matches
  if (pool.length === 0) return undefined
  const selected = pool[Math.floor(Math.random() * pool.length)]
  const updatedRecent = [...recent, selected.id].slice(-Math.max(1, matches.length - 1))
  recentByFilter.set(key, updatedRecent)
  return selected
}