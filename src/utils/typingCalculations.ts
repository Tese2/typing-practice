export interface TypingMetrics {
  correctCharacters: number
  incorrectCharacters: number
  totalCharacters: number
  wpm: number
  rawWpm: number
  accuracy: number
}

export function calculateMetrics(targetText: string, typedText: string, elapsedSeconds: number): TypingMetrics {
  let correctCharacters = 0
  for (let index = 0; index < typedText.length; index += 1) {
    if (typedText[index] === targetText[index]) correctCharacters += 1
  }
  const totalCharacters = typedText.length
  const minutes = Math.max(elapsedSeconds, 1) / 60
  return {
    correctCharacters,
    incorrectCharacters: totalCharacters - correctCharacters,
    totalCharacters,
    wpm: Math.round((correctCharacters / 5) / minutes),
    rawWpm: Math.round((totalCharacters / 5) / minutes),
    accuracy: totalCharacters === 0 ? 100 : Math.round((correctCharacters / totalCharacters) * 100),
  }
}