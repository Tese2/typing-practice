import { businessPassages } from './business'
import { businessMorePassages } from './businessMore'
import { dailyLifePassages } from './dailyLife'
import { dailyLifeMorePassages } from './dailyLifeMore'
import { educationPassages } from './education'
import { educationMorePassages } from './educationMore'
import { generalPassages } from './general'
import { generalMorePassages } from './generalMore'
import { numberPassages } from './numbers'
import { numberMorePassages } from './numbersMore'
import { quotePassages } from './quotes'
import { quoteMorePassages } from './quotesMore'
import { sciencePassages } from './science'
import { scienceMorePassages } from './scienceMore'
import { technologyPassages } from './technology'
import { technologyMorePassages } from './technologyMore'
import { bashPassages } from './programming/bash'
import { cPassages } from './programming/c'
import { cppPassages } from './programming/cpp'
import { csharpPassages } from './programming/csharp'
import { cssPassages } from './programming/css'
import { htmlPassages } from './programming/html'
import { javaPassages } from './programming/java'
import { javascriptPassages } from './programming/javascript'
import { jsonPassages } from './programming/json'
import { nodejsPassages } from './programming/nodejs'
import { phpPassages } from './programming/php'
import { pythonPassages } from './programming/python'
import { reactPassages } from './programming/react'
import { sqlPassages } from './programming/sql'
import { typescriptPassages } from './programming/typescript'
import { programmingLanguages } from './programming/languages'
import type { ProgrammingLanguage } from './programming/languages'
import type { Category, Difficulty, TypingPassage } from '../../types/typing'

const allSeeds: Omit<TypingPassage, 'id'>[] = [
  ...generalPassages,
  ...generalMorePassages,
  ...technologyPassages,
  ...technologyMorePassages,
  ...businessPassages,
  ...businessMorePassages,
  ...educationPassages,
  ...educationMorePassages,
  ...sciencePassages,
  ...scienceMorePassages,
  ...dailyLifePassages,
  ...dailyLifeMorePassages,
  ...quotePassages,
  ...quoteMorePassages,
  ...numberPassages,
  ...numberMorePassages,
  ...javascriptPassages,
  ...typescriptPassages,
  ...pythonPassages,
  ...phpPassages,
  ...htmlPassages,
  ...cssPassages,
  ...nodejsPassages,
  ...javaPassages,
  ...cPassages,
  ...cppPassages,
  ...csharpPassages,
  ...sqlPassages,
  ...reactPassages,
  ...jsonPassages,
  ...bashPassages,
]

export const passages: TypingPassage[] = allSeeds.map((passage, index) => ({ ...passage, id: index + 1 }))
export const categories: Category[] = ['General', 'Technology', 'Programming', 'Business', 'Education', 'Science', 'Daily Life', 'Quotes', 'Numbers']
export const difficulties: Difficulty[] = ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']
export { programmingLanguages }
export type { ProgrammingLanguage } from './programming/languages'

export interface PassageFilters {
  category: Category
  difficulty?: Difficulty
  language?: string
}

export function filterPassages(filters: PassageFilters): TypingPassage[] {
  return passages.filter((passage) => passage.category === filters.category
    && (!filters.difficulty || passage.difficulty === filters.difficulty)
    && (filters.category !== 'Programming' || !filters.language || passage.language === filters.language))
}

export function countPassages(filters: Partial<PassageFilters> = {}): number {
  return passages.filter((passage) => (!filters.category || passage.category === filters.category)
    && (!filters.difficulty || passage.difficulty === filters.difficulty)
    && (!filters.language || passage.language === filters.language)).length
}

export function getDifficultyCounts(category: Category, language?: string): Record<Difficulty, number> {
  return Object.fromEntries(difficulties.map((difficulty) => [difficulty, filterPassages({ category, difficulty, language }).length])) as Record<Difficulty, number>
}

export function getCategoryCounts(): Record<Category, number> {
  return Object.fromEntries(categories.map((category) => [category, countPassages({ category })])) as Record<Category, number>
}

export function getLanguageCounts(): Record<ProgrammingLanguage, number> {
  return Object.fromEntries(programmingLanguages.map((language) => [language, countPassages({ category: 'Programming', language })])) as Record<ProgrammingLanguage, number>
}