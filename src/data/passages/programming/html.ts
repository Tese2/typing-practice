import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Structure a page', content: '<main>\n  <h1>Field notes</h1>\n  <p>Clear pages are easier to explore.</p>\n</main>', difficulty: 'Beginner', learningPoint: 'Semantic elements describe the purpose of page regions.' },
  { title: 'Label a form field', content: '<label for="email">Email address</label>\n<input id="email" name="email" type="email">', difficulty: 'Easy', learningPoint: 'A matching label and input id make a form control easier to identify.' },
  { title: 'Add a useful link', content: '<a href="/guide">Read the field guide</a>', difficulty: 'Beginner', learningPoint: 'Descriptive link text tells people where a link will take them.' },
  { title: 'Group related navigation', content: '<nav aria-label="Account">\n  <a href="/profile">Profile</a>\n</nav>', difficulty: 'Easy', learningPoint: 'A named navigation landmark helps assistive technology users move around.' },
  { title: 'Describe an image', content: '<img src="map.png" alt="Trail map showing the north loop">', difficulty: 'Medium', learningPoint: 'Alt text conveys meaningful image information when the image cannot be seen.' },
  { title: 'List ordered steps', content: '<ol>\n  <li>Save your work.</li>\n  <li>Check the result.</li>\n</ol>', difficulty: 'Medium', learningPoint: 'An ordered list communicates that the sequence of items matters.' },
  { title: 'Mark a table header', content: '<th scope="col">Departure time</th>\n<td>09:30</td>', difficulty: 'Hard', learningPoint: 'The scope attribute connects a table heading to its data cells.' },
  { title: 'Provide document language', content: '<html lang="en">\n  <meta charset="utf-8">\n</html>', difficulty: 'Hard', learningPoint: 'A document language helps screen readers choose pronunciation rules.' },
  { title: 'Use an accessible button', content: '<button type="button" aria-expanded="false">Details</button>', difficulty: 'Expert', learningPoint: 'Native buttons provide keyboard behavior; state attributes expose expanded content.' },
  { title: 'Explain expandable content', content: '<details>\n  <summary>Read the safety note</summary>\n  <p>Keep the original label nearby.</p>\n</details>', difficulty: 'Expert', learningPoint: 'details and summary provide a built-in disclosure interaction.' },
  { title: 'Add a page description', content: '<meta name="description" content="A field guide to local plants">', difficulty: 'Beginner', learningPoint: 'A concise description can summarize a page in search results.' },
  { title: 'Create a button label', content: '<button type="button">Save changes</button>', difficulty: 'Beginner', learningPoint: 'Visible action text communicates a button’s purpose.' },
  { title: 'Group form choices', content: '<fieldset>\n  <legend>Choose a delivery time</legend>\n</fieldset>', difficulty: 'Easy', learningPoint: 'fieldset and legend group related form controls with a shared label.' },
  { title: 'Mark emphasized text', content: '<p>Please <strong>save a copy</strong> before closing.</p>', difficulty: 'Easy', learningPoint: 'strong communicates importance rather than visual boldness alone.' },
  { title: 'Connect an error message', content: '<input id="email" aria-describedby="email-help">\n<p id="email-help">Use your work address.</p>', difficulty: 'Medium', learningPoint: 'aria-describedby connects supporting text to the control it explains.' },
  { title: 'Load responsive images', content: '<img src="small.jpg" srcset="large.jpg 2x" alt="A close view of a leaf">', difficulty: 'Medium', learningPoint: 'srcset lets a browser choose an image resource suited to the display.' },
  { title: 'Mark the current page', content: '<a href="/lessons" aria-current="page">Lessons</a>', difficulty: 'Hard', learningPoint: 'aria-current identifies the active item in a related navigation set.' },
  { title: 'Describe a data table', content: '<table>\n  <caption>Weekly practice totals</caption>\n</table>', difficulty: 'Hard', learningPoint: 'A caption gives a table a concise accessible name and context.' },
  { title: 'Set an input requirement', content: '<input name="email" type="email" required autocomplete="email">', difficulty: 'Expert', learningPoint: 'Native input attributes provide validation and useful browser autofill.' },
  { title: 'Defer a script', content: '<script src="app.js" defer></script>', difficulty: 'Expert', learningPoint: 'defer lets parsing continue and runs the script after the document is parsed.' },
]

export const htmlPassages = educationalPassages('Programming', rows, 'HTML')