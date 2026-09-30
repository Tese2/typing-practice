import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Read a JSON object', content: '{\n  "name": "Ari",\n  "active": true\n}', difficulty: 'Beginner', learningPoint: 'JSON objects store named values inside braces.' },
  { title: 'Store an ordered list', content: '{\n  "colors": ["green", "gold", "blue"]\n}', difficulty: 'Easy', learningPoint: 'A JSON array stores an ordered sequence inside square brackets.' },
  { title: 'Nest related data', content: '{\n  "profile": {\n    "name": "Lin",\n    "level": 3\n  }\n}', difficulty: 'Beginner', learningPoint: 'Nested objects group values that describe the same entity.' },
  { title: 'Represent a setting', content: '{\n  "theme": "light",\n  "durationSeconds": 60,\n  "showHints": false\n}', difficulty: 'Easy', learningPoint: 'JSON supports strings, numbers, booleans, arrays, objects, and null.' },
  { title: 'Escape quotation marks', content: '{\n  "message": "She said, \\"Ready?\\""\n}', difficulty: 'Medium', learningPoint: 'A backslash escapes a quote that belongs inside a JSON string.' },
  { title: 'Keep a stable identifier', content: '{\n  "id": "lesson-04",\n  "title": "Practice symbols"\n}', difficulty: 'Medium', learningPoint: 'A stable identifier remains useful even when a title changes.' },
  { title: 'Separate configuration', content: '{\n  "retryLimit": 3,\n  "timeoutMs": 2500\n}', difficulty: 'Hard', learningPoint: 'Configuration keeps adjustable values outside the logic that uses them.' },
  { title: 'Use null intentionally', content: '{\n  "completedAt": null,\n  "required": true\n}', difficulty: 'Hard', learningPoint: 'null explicitly represents an absent value rather than an empty string.' },
  { title: 'Validate before use', content: '{\n  "version": 1,\n  "items": [],\n  "unknownFieldsAllowed": false\n}', difficulty: 'Expert', learningPoint: 'Parsing checks syntax; schema validation checks whether data has the expected shape.' },
  { title: 'Round-trip structured data', content: 'const copy = JSON.parse(JSON.stringify(record));', difficulty: 'Expert', learningPoint: 'Serialization creates a JSON-compatible snapshot but drops unsupported values.' },
  { title: 'Store a numeric value', content: '{\n  "attempts": 3,\n  "bestScore": 92\n}', difficulty: 'Beginner', learningPoint: 'JSON numbers do not distinguish integers from decimals as separate data types.' },
  { title: 'Include a Boolean setting', content: '{\n  "showTimer": true,\n  "playSound": false\n}', difficulty: 'Beginner', learningPoint: 'JSON booleans are written as lowercase true and false without quotation marks.' },
  { title: 'Represent an empty value', content: '{\n  "middleName": null\n}', difficulty: 'Easy', learningPoint: 'JSON null explicitly marks a value as absent.' },
  { title: 'Keep array item order', content: '{\n  "steps": ["prepare", "type", "review"]\n}', difficulty: 'Easy', learningPoint: 'Array elements preserve their order during JSON serialization.' },
  { title: 'Avoid trailing commas', content: '{\n  "theme": "system",\n  "fontSize": "medium"\n}', difficulty: 'Medium', learningPoint: 'Standard JSON does not allow a comma after the final property.' },
  { title: 'Use a version field', content: '{\n  "schemaVersion": 2,\n  "records": []\n}', difficulty: 'Medium', learningPoint: 'A version field helps software interpret changes to a stored data shape.' },
  { title: 'Escape a newline', content: '{\n  "summary": "First line\\nSecond line"\n}', difficulty: 'Hard', learningPoint: 'Escape sequences represent control characters inside a JSON string.' },
  { title: 'Validate a nested object', content: '{\n  "user": { "id": 8, "name": "Mina" },\n  "roles": ["reader"]\n}', difficulty: 'Hard', learningPoint: 'Nested JSON values still need validation at every expected level.' },
  { title: 'Treat object keys as strings', content: '{\n  "8": "eight",\n  "08": "text with a leading zero"\n}', difficulty: 'Expert', learningPoint: 'JSON object keys are strings even when they look numeric.' },
  { title: 'Separate schema from data', content: '{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object"\n}', difficulty: 'Expert', learningPoint: 'A JSON Schema describes validation rules; the instance data is a separate document.' },
]

export const jsonPassages = educationalPassages('Programming', rows, 'JSON')