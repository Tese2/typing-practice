import type { Category, Difficulty, TypingPassage } from '../../types/typing'

export interface PassageSeed {
  title: string
  content: string
  difficulty: Difficulty
  learningPoint: string
  description?: string
}

export function educationalPassages(category: Category, rows: PassageSeed[], language = 'English'): Omit<TypingPassage, 'id'>[] {
  return rows.map((row) => ({
    ...row,
    description: row.description ?? `${category} practice about ${row.title.toLowerCase()}.`,
    category,
    language,
    wordCount: row.content.trim().split(/\s+/).length,
  }))
}