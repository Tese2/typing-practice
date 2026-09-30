import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Render a component', content: 'function Greeting() {\n  return <h1>Welcome back</h1>;\n}', difficulty: 'Beginner', learningPoint: 'A React component returns a description of interface elements.' },
  { title: 'Pass data with props', content: 'function Badge({ label }) {\n  return <span>{label}</span>;\n}', difficulty: 'Easy', learningPoint: 'Props pass read-only data from a parent to a component.' },
  { title: 'Store changing state', content: 'const [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>{count}</button>', difficulty: 'Beginner', learningPoint: 'useState stores a value that can trigger a render when updated.' },
  { title: 'Render a list with keys', content: 'items.map(item => (\n  <li key={item.id}>{item.title}</li>\n))', difficulty: 'Easy', learningPoint: 'Stable keys help React identify which list items changed.' },
  { title: 'Respond to an event', content: '<button onClick={() => saveDraft()}>Save draft</button>', difficulty: 'Medium', learningPoint: 'Event handlers run in response to user actions such as clicks.' },
  { title: 'Control an input', content: '<input value={name} onChange={event => setName(event.target.value)} />', difficulty: 'Medium', learningPoint: 'A controlled input displays a value owned by React state.' },
  { title: 'Run an effect', content: 'useEffect(() => {\n  document.title = title;\n}, [title]);', difficulty: 'Hard', learningPoint: 'An effect synchronizes a component with an external system when dependencies change.' },
  { title: 'Compose small components', content: 'function Profile() {\n  return <article><Avatar /><ProfileDetails /></article>;\n}', difficulty: 'Hard', learningPoint: 'Composition combines focused components into a larger interface.' },
  { title: 'Label an icon button', content: '<button aria-label="Close dialog" onClick={onClose}>\n  <CloseIcon />\n</button>', difficulty: 'Expert', learningPoint: 'An accessible name explains an icon-only control to assistive technology.' },
  { title: 'Avoid mutating state', content: 'setItems(current => current.map(item =>\n  item.id === id ? { ...item, done: true } : item\n));', difficulty: 'Expert', learningPoint: 'Immutable updates give React a new value to compare and render.' },
  { title: 'Render a conditional', content: '{isReady ? <ReadyLabel /> : <PendingLabel />}', difficulty: 'Beginner', learningPoint: 'A conditional expression can choose which element a component renders.' },
  { title: 'Name a fragment', content: 'return <>\n  <h2>Recent notes</h2>\n  <NoteList />\n</>;', difficulty: 'Beginner', learningPoint: 'A fragment groups sibling elements without adding an extra DOM node.' },
  { title: 'Read a checkbox', content: '<input type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.checked)} />', difficulty: 'Easy', learningPoint: 'A controlled checkbox stores its Boolean value in application state.' },
  { title: 'Describe an empty state', content: '{items.length === 0 && <p>No saved notes yet.</p>}', difficulty: 'Easy', learningPoint: 'Logical rendering can display helpful content only when a collection is empty.' },
  { title: 'Memoize a derived value', content: 'const visible = useMemo(() => items.filter(matches), [items, matches]);', difficulty: 'Medium', learningPoint: 'useMemo can reuse a calculation while its dependencies remain unchanged.' },
  { title: 'Clean up an effect', content: 'useEffect(() => {\n  const timer = setInterval(refresh, 5000);\n  return () => clearInterval(timer);\n}, [refresh]);', difficulty: 'Medium', learningPoint: 'An effect cleanup stops resources before the effect reruns or unmounts.' },
  { title: 'Use a reducer', content: 'const [state, dispatch] = useReducer(reducer, initialState);', difficulty: 'Hard', learningPoint: 'useReducer centralizes related state transitions as actions.' },
  { title: 'Avoid stale event state', content: 'setCount(current => current + 1);', difficulty: 'Hard', learningPoint: 'A functional state update receives the latest state value.' },
  { title: 'Move context close to use', content: 'const theme = useContext(ThemeContext);', difficulty: 'Expert', learningPoint: 'Context provides a value to descendants without passing it through every layer.' },
  { title: 'Defer a costly search', content: 'const deferredQuery = useDeferredValue(query);\nconst matches = filterItems(items, deferredQuery);', difficulty: 'Expert', learningPoint: 'useDeferredValue can keep urgent input updates responsive while rendering derived content.' },
]

export const reactPassages = educationalPassages('Programming', rows, 'React')