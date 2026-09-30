import { ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, FlaskConical, Globe2, House, Laptop, NotebookPen, Quote } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Category } from '../types/typing'
import { PassageCount } from './PassageCount'

const categoryIcons: Record<Category, ReactNode> = {
  General: <Globe2 size={18} />,
  Technology: <Laptop size={18} />,
  Programming: <Code2 size={18} />,
  Business: <BriefcaseBusiness size={18} />,
  Education: <BookOpen size={18} />,
  Science: <FlaskConical size={18} />,
  'Daily Life': <House size={18} />,
  Quotes: <Quote size={18} />,
  Numbers: <NotebookPen size={18} />,
}

interface CategoryCardProps { category: Category; count: number; selected: boolean; onSelect: () => void }

export function CategoryCard({ category, count, selected, onSelect }: CategoryCardProps) {
  return <button className={`filter-category-card ${selected ? 'selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
    <span className="filter-category-icon">{categoryIcons[category]}</span><strong>{category}</strong><PassageCount count={count} compact/><ArrowUpRight className="filter-category-arrow" size={15}/>
  </button>
}