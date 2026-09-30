import { educationalPassages, type PassageSeed } from './shared'

const rows: PassageSeed[] = [
  { title: 'Curiosity as a practice', content: 'A curious mind asks how an idea works, then looks for evidence that could change its first impression.', difficulty: 'Beginner', learningPoint: 'Curiosity becomes useful when questions lead to checking.' },
  { title: 'Small steady efforts', content: 'Progress often comes from small actions repeated with care, not from one dramatic effort that cannot be sustained.', difficulty: 'Easy', learningPoint: 'Consistent practice is easier to maintain than occasional intensity.' },
  { title: 'Questions and learning', content: 'A good question can open a path to better evidence, a clearer explanation, and a more useful decision.', difficulty: 'Medium', learningPoint: 'Questions guide attention toward what needs to be understood.' },
  { title: 'Learning from attempts', content: 'An unsuccessful attempt can still provide information when you notice what happened and adjust the next approach.', difficulty: 'Hard', learningPoint: 'Reflection turns an attempt into evidence for the next one.' },
  { title: 'Careful observation', content: 'Notice what is present, describe it accurately, and leave room for another explanation before deciding what it means.', difficulty: 'Expert', learningPoint: 'Separating observation from interpretation reduces premature conclusions.' },
]

export const quotePassages = educationalPassages('Quotes', rows)