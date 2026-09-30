import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Apply the box model', content: '* {\n  box-sizing: border-box;\n}', difficulty: 'Beginner', learningPoint: 'border-box includes padding and border within an element’s declared size.' },
  { title: 'Arrange with flexbox', content: '.toolbar {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}', difficulty: 'Easy', learningPoint: 'Flexbox aligns items along a row or column without manual positioning.' },
  { title: 'Create a grid', content: '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}', difficulty: 'Medium', learningPoint: 'CSS Grid divides a layout into explicit rows and columns.' },
  { title: 'Define a custom property', content: ':root {\n  --accent: #557d50;\n}\n.button { color: var(--accent); }', difficulty: 'Beginner', learningPoint: 'Custom properties keep repeated design values consistent.' },
  { title: 'Add a responsive rule', content: '@media (max-width: 640px) {\n  .sidebar { display: none; }\n}', difficulty: 'Easy', learningPoint: 'A media query applies styles when viewport conditions match.' },
  { title: 'Show keyboard focus', content: 'button:focus-visible {\n  outline: 3px solid #557d50;\n  outline-offset: 2px;\n}', difficulty: 'Medium', learningPoint: 'A visible focus indicator helps keyboard users track their position.' },
  { title: 'Use a flexible measure', content: '.content {\n  width: min(100% - 2rem, 70rem);\n  margin-inline: auto;\n}', difficulty: 'Hard', learningPoint: 'A maximum width preserves readable line lengths on large screens.' },
  { title: 'Respect reduced motion', content: '@media (prefers-reduced-motion: reduce) {\n  *, *::before { animation-duration: 0.01ms; }\n}', difficulty: 'Hard', learningPoint: 'Reduced-motion preferences let people limit nonessential animation.' },
  { title: 'Layer a selector carefully', content: '.panel :is(h2, h3) {\n  margin-block: 0.5rem;\n}', difficulty: 'Expert', learningPoint: ':is groups selectors while taking the specificity of its most specific argument.' },
  { title: 'Avoid layout shifts', content: '.avatar {\n  width: 3rem;\n  aspect-ratio: 1;\n  object-fit: cover;\n}', difficulty: 'Expert', learningPoint: 'Stable dimensions reserve space before an image finishes loading.' },
  { title: 'Set a readable line length', content: '.article {\n  max-width: 68ch;\n  margin-inline: auto;\n}', difficulty: 'Beginner', learningPoint: 'The ch unit can constrain text width to a comfortable reading measure.' },
  { title: 'Style a hover state', content: '.button:hover {\n  background: var(--accent-dark);\n}', difficulty: 'Beginner', learningPoint: 'A hover state provides feedback when a pointer rests over a control.' },
  { title: 'Lay out a sidebar', content: '.layout {\n  display: grid;\n  grid-template-columns: 15rem 1fr;\n}', difficulty: 'Easy', learningPoint: 'Grid tracks describe the relationship between fixed and flexible columns.' },
  { title: 'Set a fallback font', content: 'body {\n  font-family: "Trebuchet MS", sans-serif;\n}', difficulty: 'Easy', learningPoint: 'A font stack provides a fallback when the first face is unavailable.' },
  { title: 'Use an intrinsic size', content: '.panel {\n  width: min(100%, 42rem);\n  margin-inline: auto;\n}', difficulty: 'Medium', learningPoint: 'min combines a responsive limit with a maximum readable width.' },
  { title: 'Add spacing with gap', content: '.actions {\n  display: flex;\n  gap: 0.75rem;\n}', difficulty: 'Medium', learningPoint: 'gap creates consistent space between layout children without margins on each item.' },
  { title: 'Use a stacking context', content: '.dialog {\n  position: relative;\n  z-index: 2;\n}', difficulty: 'Hard', learningPoint: 'z-index orders positioned elements within their stacking context.' },
  { title: 'Animate a property', content: '.menu {\n  transition: opacity 180ms ease;\n}', difficulty: 'Hard', learningPoint: 'A targeted transition limits animation to the property that needs it.' },
  { title: 'Use container queries', content: '@container card (min-width: 32rem) {\n  .card-title { font-size: 1.25rem; }\n}', difficulty: 'Expert', learningPoint: 'Container queries respond to component space rather than viewport width.' },
  { title: 'Define a layer order', content: '@layer reset, base, components, utilities;', difficulty: 'Expert', learningPoint: 'Cascade layers make precedence between groups of rules explicit.' },
]

export const cssPassages = educationalPassages('Programming', rows, 'CSS')