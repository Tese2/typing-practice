import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Declare a property', content: 'public sealed class Person {\n    public string Name { get; init; } = "";\n}', difficulty: 'Beginner', learningPoint: 'Properties expose data while allowing controlled access and initialization.' },
  { title: 'Use a record', content: 'public record Point(double X, double Y);', difficulty: 'Easy', learningPoint: 'Records provide value-oriented equality and concise data declarations.' },
  { title: 'Query with LINQ', content: 'var names = people\n    .Where(person => person.Active)\n    .Select(person => person.Name);', difficulty: 'Medium', learningPoint: 'LINQ composes filtering and projection operations over a sequence.' },
  { title: 'Await an operation', content: 'async Task<string> ReadAsync() {\n    return await File.ReadAllTextAsync("notes.txt");\n}', difficulty: 'Beginner', learningPoint: 'Task<T> represents an asynchronous operation that produces a value.' },
  { title: 'Dispose a resource', content: 'using var reader = File.OpenText("notes.txt");\nvar firstLine = reader.ReadLine();', difficulty: 'Easy', learningPoint: 'using disposes objects that hold resources when their scope ends.' },
  { title: 'Handle nullable data', content: 'string? nickname = FindNickname();\nstring label = nickname ?? "Guest";', difficulty: 'Medium', learningPoint: 'Nullable reference annotations make possible absence visible to the compiler.' },
  { title: 'Use a dictionary', content: 'var scores = new Dictionary<string, int> {\n    ["Ada"] = 94,\n};', difficulty: 'Hard', learningPoint: 'A dictionary provides efficient lookup by a unique key.' },
  { title: 'Define an interface', content: 'public interface IClock {\n    DateTimeOffset Now { get; }\n}', difficulty: 'Hard', learningPoint: 'An interface defines capabilities that multiple implementations can provide.' },
  { title: 'Create a generic helper', content: 'static T First<T>(IReadOnlyList<T> values) => values[0];', difficulty: 'Expert', learningPoint: 'Generics preserve type information while sharing reusable logic.' },
  { title: 'Match a result type', content: 'var message = result switch {\n    200 => "Ready",\n    404 => "Missing",\n    _ => "Unknown"\n};', difficulty: 'Expert', learningPoint: 'A switch expression returns a value from the matched pattern.' },
  { title: 'Check a condition', content: 'if (score >= 60) {\n    Console.WriteLine("Passed");\n}', difficulty: 'Beginner', learningPoint: 'A Boolean expression decides whether an if block executes.' },
  { title: 'Interpolate a string', content: 'string message = $"Welcome, {name}!";', difficulty: 'Beginner', learningPoint: 'String interpolation inserts evaluated expressions into a string.' },
  { title: 'Loop through a collection', content: 'foreach (var name in names) {\n    Console.WriteLine(name);\n}', difficulty: 'Easy', learningPoint: 'foreach visits each element without requiring an index.' },
  { title: 'Use a nullable value', content: 'int? selectedId = null;\nint displayId = selectedId ?? 0;', difficulty: 'Easy', learningPoint: 'Nullable value types can represent either a value or null.' },
  { title: 'Create an immutable list', content: 'IReadOnlyList<string> steps = ["plan", "build", "review"];', difficulty: 'Medium', learningPoint: 'An IReadOnlyList interface exposes ordered values without collection mutation methods.' },
  { title: 'Filter with a predicate', content: 'var active = users.Where(user => user.Enabled).ToList();', difficulty: 'Medium', learningPoint: 'Where keeps sequence elements that match a predicate.' },
  { title: 'Catch a narrow exception', content: 'try {\n    await SaveAsync();\n} catch (IOException error) {\n    Log(error);\n}', difficulty: 'Hard', learningPoint: 'A specific catch block handles the failure the caller knows how to recover from.' },
  { title: 'Define an async stream', content: 'async IAsyncEnumerable<int> ReadValues() {\n    yield return await ReadNextAsync();\n}', difficulty: 'Hard', learningPoint: 'IAsyncEnumerable yields values as asynchronous work produces them.' },
  { title: 'Constrain a generic', content: 'static T First<T>(IReadOnlyList<T> items) where T : notnull => items[0];', difficulty: 'Expert', learningPoint: 'A generic constraint narrows which types can be used by a method.' },
  { title: 'Use a cancellation token', content: 'await DownloadAsync(uri, cancellationToken);', difficulty: 'Expert', learningPoint: 'Cancellation tokens let callers request that longer operations stop.' },
]

export const csharpPassages = educationalPassages('Programming', rows, 'C#')