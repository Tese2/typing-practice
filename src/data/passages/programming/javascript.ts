import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Declare a constant', content: 'const taxRate = 0.08;\nconst total = price * (1 + taxRate);', difficulty: 'Beginner', learningPoint: 'Use const when a variable binding will not be reassigned.' },
  { title: 'Map an array', content: 'const names = users.map(user => user.name);', difficulty: 'Easy', learningPoint: 'map creates a new array by transforming each item.' },
  { title: 'Filter a list', content: 'const adults = people.filter(person => person.age >= 18);', difficulty: 'Easy', learningPoint: 'filter keeps items whose callback returns a truthy value.' },
  { title: 'Destructure an object', content: 'const { title, year } = book;\nconsole.log(`${title} (${year})`);', difficulty: 'Medium', learningPoint: 'Destructuring reads named properties into local variables.' },
  { title: 'Use a default value', content: 'function greet(name = "friend") {\n  return `Hello, ${name}`;\n}', difficulty: 'Beginner', learningPoint: 'A default parameter is used when an argument is omitted or undefined.' },
  { title: 'Await a request', content: 'async function loadUsers() {\n  const response = await fetch("/users");\n  return response.json();\n}', difficulty: 'Medium', learningPoint: 'await pauses an async function until a promise settles.' },
  { title: 'Handle a rejected promise', content: 'try {\n  const profile = await getProfile();\n} catch (error) {\n  reportError(error);\n}', difficulty: 'Hard', learningPoint: 'try and catch let asynchronous failures be handled near the operation.' },
  { title: 'Optional chaining', content: 'const city = account.profile?.address?.city ?? "Unknown";', difficulty: 'Medium', learningPoint: 'Optional chaining safely stops when an intermediate value is nullish.' },
  { title: 'Reduce to a total', content: 'const total = cart.reduce((sum, item) => sum + item.price, 0);', difficulty: 'Hard', learningPoint: 'reduce combines array values into one result using an accumulator.' },
  { title: 'Close over a value', content: 'function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}', difficulty: 'Expert', learningPoint: 'A closure retains access to variables from its surrounding function.' },
  { title: 'Choose a branch', content: 'if (score >= 60) {\n  status = "passed";\n} else {\n  status = "review";\n}', difficulty: 'Beginner', learningPoint: 'A conditional runs different code according to a Boolean expression.' },
  { title: 'Copy an array', content: 'const updated = [...items, newItem];', difficulty: 'Beginner', learningPoint: 'Spread syntax creates a shallow copy while keeping the original array unchanged.' },
  { title: 'Check every value', content: 'const allReady = tasks.every(task => task.ready);', difficulty: 'Easy', learningPoint: 'every returns true only when each array element passes its test.' },
  { title: 'Read object keys', content: 'const fields = Object.keys(record);', difficulty: 'Easy', learningPoint: 'Object.keys returns an array of an object’s own enumerable string keys.' },
  { title: 'Set a fallback once', content: 'settings.timeout ??= 2500;', difficulty: 'Medium', learningPoint: 'Nullish assignment sets a value only when the existing value is null or undefined.' },
  { title: 'Parse query parameters', content: 'const query = new URLSearchParams(location.search);\nconst page = Number(query.get("page") ?? 1);', difficulty: 'Medium', learningPoint: 'URLSearchParams reads and updates encoded query-string values.' },
  { title: 'Run independent tasks', content: 'const [profile, alerts] = await Promise.all([\n  loadProfile(),\n  loadAlerts(),\n]);', difficulty: 'Hard', learningPoint: 'Promise.all waits for independent work concurrently and rejects if one promise rejects.' },
  { title: 'Prevent duplicate requests', content: 'const controller = new AbortController();\nfetch(url, { signal: controller.signal });\ncontroller.abort();', difficulty: 'Hard', learningPoint: 'AbortController can cancel a fetch that is no longer needed.' },
  { title: 'Yield values gradually', content: 'function* steps() {\n  yield "plan";\n  yield "build";\n  yield "review";\n}', difficulty: 'Expert', learningPoint: 'A generator pauses at yield and resumes when the consumer requests another value.' },
  { title: 'Avoid unsafe object keys', content: 'const counts = new Map();\ncounts.set("ready", 2);\ncounts.get("ready");', difficulty: 'Expert', learningPoint: 'Map stores key-value pairs without ordinary object prototype-key behavior.' },
]

export const javascriptPassages = educationalPassages('Programming', rows, 'JavaScript')