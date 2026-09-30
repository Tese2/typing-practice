import type { TypingPassage } from '../types/typing'

interface PassageSelectorProps { passages: TypingPassage[]; selectedId?: number; onChange: (passageId: number) => void }

export function PassageSelector({ passages, selectedId, onChange }: PassageSelectorProps) {
  return <label className="passage-select-label"><span>Practice text</span><select value={selectedId ?? ''} onChange={(event) => onChange(Number(event.target.value))} aria-label="Choose a practice text">{passages.map((passage) => <option key={passage.id} value={passage.id}>{passage.title} · {passage.wordCount} words</option>)}</select></label>
}