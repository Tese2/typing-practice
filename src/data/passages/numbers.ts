import { educationalPassages, type PassageSeed } from './shared'

const rows: PassageSeed[] = [
  { title: 'Count with care', content: 'Count 1, 2, and 3 slowly, then check that each object was counted exactly once.', difficulty: 'Beginner', learningPoint: 'A consistent count avoids skipping or counting an item twice.' },
  { title: 'Read a percentage', content: 'A 20 percent discount on a 50 dollar item is 10 dollars, leaving a price of 40 dollars before tax.', difficulty: 'Easy', learningPoint: 'Convert a percentage to a decimal before multiplying by the original amount.' },
  { title: 'Compare unit prices', content: 'A 750 gram package costs 6 dollars, or 8 dollars per kilogram. Compare the same unit before choosing a size.', difficulty: 'Medium', learningPoint: 'Unit prices make different package sizes comparable.' },
  { title: 'Estimate a monthly cost', content: 'A 12 dollar monthly service costs 144 dollars over a year, before taxes or price changes.', difficulty: 'Hard', learningPoint: 'Multiplying a recurring cost by its frequency reveals the annual amount.' },
  { title: 'Check a rate', content: 'If 18 of 24 tasks are complete, the completion rate is 75 percent because 18 divided by 24 equals 0.75.', difficulty: 'Expert', learningPoint: 'A rate uses the part divided by the whole, then multiplied by 100.' },
]

export const numberPassages = educationalPassages('Numbers', rows)