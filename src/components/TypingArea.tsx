import { useEffect, useRef } from 'react'

interface TypingAreaProps {
  targetText: string
  typedText: string
  active: boolean
  finished: boolean
  autoFocus: boolean
  caretStyle: 'line' | 'block' | 'underline'
  onType: (value: string) => void
  onBackspace: () => void
}

export function TypingArea({ targetText, typedText, active, finished, autoFocus, caretStyle, onType, onBackspace }: TypingAreaProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (active && !finished && autoFocus) inputRef.current?.focus()
  }, [active, autoFocus, finished, targetText])

  return <div className={`typing-surface ${active ? 'is-typing' : ''}`} onClick={() => inputRef.current?.focus()}>
    <label className="sr-only" htmlFor="typing-input">Type the passage shown above</label>
    <div className="passage-text" aria-hidden="true">
      {[...targetText].map((character, index) => {
        const typed = typedText[index]
        const state = typed === undefined ? (index === typedText.length ? 'current' : 'pending') : typed === character ? 'correct' : 'incorrect'
        return <span key={`${index}-${character}`} className={`char char-${state} ${state === 'current' ? `caret-${caretStyle}` : ''}`}>{character === ' ' ? '\u00a0' : character}</span>
      })}
      {targetText.length === 0 && <span className="passage-placeholder">Choose a passage to begin.</span>}
    </div>
    <textarea
      ref={inputRef}
      id="typing-input"
      className="typing-input"
      value={typedText}
      onChange={(event) => onType(event.target.value)}
      onKeyDown={(event) => { if (event.key === 'Backspace') onBackspace() }}
      disabled={!active || finished}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      aria-describedby="typing-hint"
      aria-label="Typing input"
    />
    <div className="typing-hint" id="typing-hint">{finished ? 'Test complete' : active ? 'Keep your eyes on the text' : 'Your typing area will appear here'}</div>
  </div>
}