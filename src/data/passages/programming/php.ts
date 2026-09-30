import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Declare a typed function', content: '<?php\nfunction square(int $value): int {\n    return $value * $value;\n}', difficulty: 'Beginner', learningPoint: 'Parameter and return types document the values a function accepts and produces.' },
  { title: 'Join an array', content: '$parts = ["read", "learn", "practice"];\necho implode(", ", $parts);', difficulty: 'Easy', learningPoint: 'implode joins array elements with a chosen separator.' },
  { title: 'Loop over a list', content: 'foreach ($users as $user) {\n    echo $user["name"];\n}', difficulty: 'Beginner', learningPoint: 'foreach visits each element without managing a numeric index.' },
  { title: 'Use a null fallback', content: '$label = $profile["name"] ?? "Guest";', difficulty: 'Easy', learningPoint: 'The null coalescing operator supplies a fallback for a missing or null value.' },
  { title: 'Validate an input', content: '$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);', difficulty: 'Medium', learningPoint: 'Input validation checks that supplied data matches an expected format.' },
  { title: 'Return a structured value', content: 'function pageTitle(string $name): string {\n    return "Profile: " . $name;\n}', difficulty: 'Medium', learningPoint: 'A return type makes the function result contract explicit.' },
  { title: 'Use a prepared query', content: '$query = $pdo->prepare("SELECT id FROM users WHERE email = ?");\n$query->execute([$email]);', difficulty: 'Hard', learningPoint: 'Prepared statements keep values separate from SQL query structure.' },
  { title: 'Catch a specific error', content: 'try {\n    $file = new SplFileObject($path, "r");\n} catch (RuntimeException $error) {\n    logError($error);\n}', difficulty: 'Hard', learningPoint: 'Handling a specific exception avoids hiding unrelated programming errors.' },
  { title: 'Encode JSON safely', content: '$json = json_encode($record, JSON_THROW_ON_ERROR);', difficulty: 'Expert', learningPoint: 'JSON_THROW_ON_ERROR makes encoding failures explicit instead of returning false.' },
  { title: 'Choose a match arm', content: '$label = match ($status) {\n    200 => "ready",\n    404 => "missing",\n    default => "unknown",\n};', difficulty: 'Expert', learningPoint: 'match compares strictly and returns the value of the selected arm.' },
  { title: 'Interpolate a variable', content: '$name = "Mina";\necho "Welcome, {$name}!";', difficulty: 'Beginner', learningPoint: 'Braces make variable boundaries explicit inside an interpolated string.' },
  { title: 'Check an array key', content: 'if (array_key_exists("email", $profile)) {\n    echo $profile["email"];\n}', difficulty: 'Beginner', learningPoint: 'array_key_exists distinguishes a missing key from a key storing null.' },
  { title: 'Map a list', content: '$labels = array_map(fn($user) => $user["name"], $users);', difficulty: 'Easy', learningPoint: 'array_map applies a callback to each element and returns a transformed array.' },
  { title: 'Filter empty values', content: '$visible = array_filter($items, fn($item) => $item["active"]);', difficulty: 'Easy', learningPoint: 'array_filter keeps values accepted by its callback.' },
  { title: 'Use a typed property', content: 'class Report {\n    public function __construct(public string $title) {}\n}', difficulty: 'Medium', learningPoint: 'Constructor property promotion declares and initializes a property concisely.' },
  { title: 'Prevent an invalid state', content: 'enum Status: string {\n    case Draft = "draft";\n    case Published = "published";\n}', difficulty: 'Medium', learningPoint: 'An enum restricts a variable to a defined set of named cases.' },
  { title: 'Validate decoded JSON', content: '$data = json_decode($body, true, flags: JSON_THROW_ON_ERROR);', difficulty: 'Hard', learningPoint: 'JSON_THROW_ON_ERROR makes malformed input an explicit exception.' },
  { title: 'Yield from an iterable', content: 'function allNames($groups) {\n    foreach ($groups as $group) {\n        yield from $group;\n    }\n}', difficulty: 'Hard', learningPoint: 'yield from delegates iteration to another iterable.' },
  { title: 'Implement an interface', content: 'interface Cache {\n    public function get(string $key): mixed;\n}', difficulty: 'Expert', learningPoint: 'An interface specifies a contract that separate implementations can satisfy.' },
  { title: 'Use a value object', content: 'final readonly class Money {\n    public function __construct(public int $cents) {}\n}', difficulty: 'Expert', learningPoint: 'An immutable value object keeps a domain value and its rules together.' },
]

export const phpPassages = educationalPassages('Programming', rows, 'PHP')