import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Declare a typed value', content: 'int count = 3;\nString label = "ready";\nSystem.out.println(label);', difficulty: 'Beginner', learningPoint: 'Java variable declarations state the type and name of each value.' },
  { title: 'Loop over a range', content: 'for (int index = 0; index < 5; index++) {\n    System.out.println(index);\n}', difficulty: 'Easy', learningPoint: 'A for loop groups initialization, a condition, and an update.' },
  { title: 'Write a method', content: 'static int square(int value) {\n    return value * value;\n}', difficulty: 'Beginner', learningPoint: 'A method defines reusable behavior with parameters and a return type.' },
  { title: 'Store values in a list', content: 'List<String> names = List.of("Ada", "Lin");\nnames.forEach(System.out::println);', difficulty: 'Easy', learningPoint: 'List<T> expresses the element type and List.of creates an immutable list.' },
  { title: 'Define a record', content: 'record Point(double x, double y) {}', difficulty: 'Medium', learningPoint: 'A record provides a concise data carrier with generated accessors and value methods.' },
  { title: 'Use an optional value', content: 'Optional<String> city = findCity();\ncity.ifPresent(System.out::println);', difficulty: 'Medium', learningPoint: 'Optional represents a value that may be absent without using null as the result.' },
  { title: 'Close a resource', content: 'try (var reader = Files.newBufferedReader(path)) {\n    return reader.readLine();\n}', difficulty: 'Hard', learningPoint: 'Try-with-resources closes supported resources automatically.' },
  { title: 'Transform with a stream', content: 'List<String> upper = names.stream()\n    .map(String::toUpperCase)\n    .toList();', difficulty: 'Hard', learningPoint: 'Stream operations describe a pipeline that transforms collection elements.' },
  { title: 'Compare with a comparator', content: 'users.sort(Comparator.comparing(User::lastName)\n    .thenComparing(User::firstName));', difficulty: 'Expert', learningPoint: 'Composed comparators define a stable, multi-field ordering.' },
  { title: 'Handle a checked failure', content: 'try {\n    return Files.readString(path);\n} catch (IOException error) {\n    throw new UncheckedIOException(error);\n}', difficulty: 'Expert', learningPoint: 'Checked exceptions make callers account for operations that can fail.' },
  { title: 'Compare strings by value', content: 'if (name.equals("Ari")) {\n    greet(name);\n}', difficulty: 'Beginner', learningPoint: 'equals compares string contents; == compares object references.' },
  { title: 'Use a boolean condition', content: 'if (score >= 60) {\n    status = "passed";\n}', difficulty: 'Beginner', learningPoint: 'A Boolean expression controls whether a conditional block executes.' },
  { title: 'Count with an enhanced loop', content: 'for (String name : names) {\n    System.out.println(name);\n}', difficulty: 'Easy', learningPoint: 'The enhanced for loop visits each element without exposing an index.' },
  { title: 'Build a string safely', content: 'String message = "Hello, " + name + "!";', difficulty: 'Easy', learningPoint: 'String concatenation creates a new string from its parts.' },
  { title: 'Use a set for uniqueness', content: 'Set<String> tags = new HashSet<>();\ntags.add("science");', difficulty: 'Medium', learningPoint: 'A set stores unique elements and ignores duplicate additions.' },
  { title: 'Handle a missing value', content: 'String label = Optional.ofNullable(value).orElse("Unknown");', difficulty: 'Medium', learningPoint: 'Optional makes the possibility of an absent value explicit.' },
  { title: 'Define a sealed choice', content: 'sealed interface Shape permits Circle, Rectangle {}', difficulty: 'Hard', learningPoint: 'A sealed type restricts which classes can implement or extend it.' },
  { title: 'Write a comparator chain', content: 'Comparator<Person> byAge = Comparator.comparingInt(Person::age);', difficulty: 'Hard', learningPoint: 'A comparator defines an ordering that sorting algorithms can apply.' },
  { title: 'Describe a record pattern', content: 'if (value instanceof Point(double x, double y)) {\n    show(x, y);\n}', difficulty: 'Expert', learningPoint: 'A record pattern tests a type and extracts its components.' },
  { title: 'Use try with resources', content: 'try (var stream = Files.lines(path)) {\n    return stream.count();\n}', difficulty: 'Expert', learningPoint: 'Try-with-resources closes an AutoCloseable resource at the end of its scope.' },
]

export const javaPassages = educationalPassages('Programming', rows, 'Java')