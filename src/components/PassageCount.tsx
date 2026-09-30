interface PassageCountProps { count: number; compact?: boolean }

export function PassageCount({ count, compact = false }: PassageCountProps) {
  return <span className={compact ? 'passage-count passage-count-compact' : 'passage-count'}>{count} {compact ? (count === 1 ? 'text' : 'texts') : (count === 1 ? 'practice text' : 'practice texts')}</span>
}