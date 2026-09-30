import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Select named columns', content: 'SELECT name, email\nFROM customers;', difficulty: 'Beginner', learningPoint: 'SELECT names the columns returned from a table.' },
  { title: 'Filter rows', content: 'SELECT name\nFROM customers\nWHERE active = TRUE;', difficulty: 'Easy', learningPoint: 'WHERE keeps only rows that satisfy a condition.' },
  { title: 'Sort the results', content: 'SELECT title, created_at\nFROM lessons\nORDER BY created_at DESC;', difficulty: 'Beginner', learningPoint: 'ORDER BY controls result order; DESC sorts from newest to oldest here.' },
  { title: 'Join related tables', content: 'SELECT orders.id, customers.name\nFROM orders\nJOIN customers ON customers.id = orders.customer_id;', difficulty: 'Medium', learningPoint: 'A join combines related rows using a key relationship.' },
  { title: 'Group and count', content: 'SELECT category, COUNT(*)\nFROM lessons\nGROUP BY category;', difficulty: 'Easy', learningPoint: 'GROUP BY collects rows with shared values for aggregate calculations.' },
  { title: 'Filter an aggregate', content: 'SELECT category, COUNT(*) AS total\nFROM lessons\nGROUP BY category\nHAVING COUNT(*) > 2;', difficulty: 'Medium', learningPoint: 'HAVING filters grouped results after aggregate values are calculated.' },
  { title: 'Use a transaction', content: 'BEGIN;\nUPDATE accounts SET balance = balance - 20 WHERE id = 1;\nCOMMIT;', difficulty: 'Hard', learningPoint: 'A transaction groups changes so they can be committed or rolled back together.' },
  { title: 'Add a common index', content: 'CREATE INDEX lessons_created_at_idx\nON lessons (created_at);', difficulty: 'Hard', learningPoint: 'An index can speed up lookups, while adding storage and write overhead.' },
  { title: 'Rank within a group', content: 'SELECT name, score,\n  ROW_NUMBER() OVER (PARTITION BY team ORDER BY score DESC) AS rank\nFROM players;', difficulty: 'Expert', learningPoint: 'A window function calculates values across related rows without collapsing them.' },
  { title: 'Build a common table expression', content: 'WITH active_users AS (\n  SELECT id FROM users WHERE active = TRUE\n)\nSELECT COUNT(*) FROM active_users;', difficulty: 'Expert', learningPoint: 'A CTE gives a named query block that can clarify a larger statement.' },
  { title: 'Insert a record', content: 'INSERT INTO customers (name, active)\nVALUES ("Ari", TRUE);', difficulty: 'Beginner', learningPoint: 'INSERT adds a new row by matching values to named columns.' },
  { title: 'Update selected rows', content: 'UPDATE tasks\nSET complete = TRUE\nWHERE id = 7;', difficulty: 'Beginner', learningPoint: 'A WHERE clause limits which rows an UPDATE changes.' },
  { title: 'Find a missing value', content: 'SELECT name\nFROM customers\nWHERE phone IS NULL;', difficulty: 'Easy', learningPoint: 'SQL uses IS NULL rather than equality to check for a missing value.' },
  { title: 'Limit the results', content: 'SELECT title\nFROM lessons\nORDER BY created_at DESC\nLIMIT 5;', difficulty: 'Easy', learningPoint: 'LIMIT returns only a requested number of rows after sorting.' },
  { title: 'Combine conditions', content: 'SELECT id\nFROM orders\nWHERE paid = TRUE AND total > 0;', difficulty: 'Medium', learningPoint: 'AND requires both conditions to match.' },
  { title: 'Count distinct values', content: 'SELECT COUNT(DISTINCT category)\nFROM lessons;', difficulty: 'Medium', learningPoint: 'DISTINCT removes duplicates before an aggregate counts values.' },
  { title: 'Use a foreign key', content: 'CREATE TABLE notes (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER REFERENCES users(id)\n);', difficulty: 'Hard', learningPoint: 'A foreign key enforces a relationship to a row in another table.' },
  { title: 'Avoid a parameter injection', content: 'SELECT id FROM users WHERE email = ?;', difficulty: 'Hard', learningPoint: 'Parameterized queries keep user values separate from SQL syntax.' },
  { title: 'Rank results by team', content: 'SELECT team, name, score,\n  RANK() OVER (PARTITION BY team ORDER BY score DESC)\nFROM players;', difficulty: 'Expert', learningPoint: 'RANK assigns ordered positions within each partition and preserves ties.' },
  { title: 'Handle a conflict on insert', content: 'INSERT INTO settings (key, value) VALUES (?, ?)\nON CONFLICT (key) DO UPDATE SET value = excluded.value;', difficulty: 'Expert', learningPoint: 'An upsert inserts a new row or updates the conflicting key.' },
]

export const sqlPassages = educationalPassages('Programming', rows, 'SQL')