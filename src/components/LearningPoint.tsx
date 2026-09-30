import { Lightbulb } from 'lucide-react'

interface LearningPointProps { title?: string; children?: string }

export function LearningPoint({ title = 'What you’ll learn', children }: LearningPointProps) {
  if (!children) return null
  return <aside className="learning-point"><span className="learning-point-icon"><Lightbulb size={16}/></span><div><span className="section-kicker">{title}</span><p>{children}</p></div></aside>
}