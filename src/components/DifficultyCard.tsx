import type { Difficulty } from '../types/typing'
import { PassageCount } from './PassageCount'

export const difficultyDescriptions: Record<Difficulty, string> = {
  Beginner: 'Simple words and short sentences.',
  Easy: 'Build confidence with everyday sentences.',
  Medium: 'Longer sentences and more punctuation.',
  Hard: 'Complex vocabulary and longer passages.',
  Expert: 'Advanced text, technical content and challenging punctuation.',
}

interface DifficultyCardProps { difficulty: Difficulty; count: number; selected: boolean; onSelect: () => void }

export function DifficultyCard({ difficulty, count, selected, onSelect }: DifficultyCardProps) {
  return <button className={`difficulty-card ${selected ? 'selected' : ''}`} onClick={onSelect} aria-pressed={selected} disabled={count === 0}>
    <span className="difficulty-card-name">{difficulty}</span><span className="difficulty-card-description">{difficultyDescriptions[difficulty]}</span><PassageCount count={count}/>
  </button>
}