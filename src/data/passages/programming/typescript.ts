import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Type a function parameter', content: 'function square(value: number): number {\n  return value * value;\n}', difficulty: 'Beginner', learningPoint: 'Type annotations help tools catch incompatible values before runtime.' },
  { title: 'Describe an object', content: 'interface User {\n  id: number;\n  name: string;\n}', difficulty: 'Easy', learningPoint: 'An interface describes the properties an object is expected to provide.' },
  { title: 'Model alternative states', content: 'type Result = { ok: true; value: string } | { ok: false; error: Error };', difficulty: 'Medium', learningPoint: 'A discriminated union represents a value that can be one of several shapes.' },
  { title: 'Narrow a union', content: 'if (result.ok) {\n  console.log(result.value);\n} else {\n  console.error(result.error);\n}', difficulty: 'Medium', learningPoint: 'Checking a discriminant narrows which properties are available.' },
  { title: 'Write a generic function', content: 'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}', difficulty: 'Hard', learningPoint: 'A generic preserves the relationship between an input type and its output.' },
  { title: 'Use a readonly property', content: 'interface Point {\n  readonly x: number;\n  readonly y: number;\n}', difficulty: 'Easy', learningPoint: 'readonly prevents reassignment of a property through that type.' },
  { title: 'Type a record', content: 'const scores: Record<string, number> = {\n  Ada: 94,\n  Lin: 88,\n};', difficulty: 'Beginner', learningPoint: 'Record describes an object whose keys and values follow specified types.' },
  { title: 'Constrain a generic', content: 'function label<T extends { id: string }>(item: T) {\n  return item.id;\n}', difficulty: 'Hard', learningPoint: 'A generic constraint requires only the properties an operation needs.' },
  { title: 'Check an unknown value', content: 'function isText(value: unknown): value is string {\n  return typeof value === "string";\n}', difficulty: 'Expert', learningPoint: 'A type predicate communicates a runtime check to the compiler.' },
  { title: 'Await a typed result', content: 'async function readCount(): Promise<number> {\n  return 3;\n}', difficulty: 'Expert', learningPoint: 'Promise<T> describes the value an async function resolves to.' },
  { title: 'Type a Boolean flag', content: 'const isPublished: boolean = true;\nconst title: string = "Field guide";', difficulty: 'Beginner', learningPoint: 'Primitive annotations document the kinds of values a variable can hold.' },
  { title: 'Use a string union', content: 'type Status = "draft" | "ready" | "sent";\nconst status: Status = "ready";', difficulty: 'Beginner', learningPoint: 'A literal union limits a value to a known set of choices.' },
  { title: 'Make a field optional', content: 'interface Contact {\n  name: string;\n  phone?: string;\n}', difficulty: 'Easy', learningPoint: 'The question mark marks a property that may be absent.' },
  { title: 'Accept readonly values', content: 'function total(values: readonly number[]) {\n  return values.reduce((sum, value) => sum + value, 0);\n}', difficulty: 'Easy', learningPoint: 'A readonly array type prevents a function from mutating the supplied list.' },
  { title: 'Use a keyof constraint', content: 'function readField<T, K extends keyof T>(item: T, key: K) {\n  return item[key];\n}', difficulty: 'Medium', learningPoint: 'keyof connects a property name to the keys that actually exist on a type.' },
  { title: 'Check a value with satisfies', content: 'const routes = { home: "/", lessons: "/lessons" } satisfies Record<string, string>;', difficulty: 'Medium', learningPoint: 'satisfies checks compatibility while keeping the expression’s specific inferred type.' },
  { title: 'Exclude impossible values', content: 'type WithoutNull<T> = Exclude<T, null | undefined>;', difficulty: 'Hard', learningPoint: 'Exclude removes union members assignable to another type.' },
  { title: 'Make properties optional', content: 'type Draft<T> = { [Key in keyof T]?: T[Key] };', difficulty: 'Hard', learningPoint: 'A mapped type transforms each property in an existing type.' },
  { title: 'Infer a promise value', content: 'type AwaitedValue<T> = T extends Promise<infer Value> ? Value : T;', difficulty: 'Expert', learningPoint: 'infer captures a type inside a conditional type pattern.' },
  { title: 'Preserve literal values', content: 'const directions = ["north", "south"] as const;\ntype Direction = typeof directions[number];', difficulty: 'Expert', learningPoint: 'as const preserves literal types and readonly tuple structure.' },
]

export const typescriptPassages = educationalPassages('Programming', rows, 'TypeScript')