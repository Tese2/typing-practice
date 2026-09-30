export const programmingLanguages = [
  'JavaScript', 'TypeScript', 'Python', 'PHP', 'HTML', 'CSS', 'Node.js', 'Java', 'C', 'C++', 'C#', 'SQL', 'React', 'JSON', 'Bash / Shell',
] as const

export type ProgrammingLanguage = typeof programmingLanguages[number]