import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Use a vector', content: '#include <vector>\nstd::vector<int> scores{82, 91, 88};', difficulty: 'Beginner', learningPoint: 'std::vector manages a resizable sequence of values.' },
  { title: 'Pass by reference', content: 'void rename(std::string& name) {\n    name = "Updated";\n}', difficulty: 'Easy', learningPoint: 'A non-const reference lets a function work with the original object.' },
  { title: 'Prefer automatic cleanup', content: 'auto file = std::make_unique<File>(path);\nfile->read();', difficulty: 'Medium', learningPoint: 'RAII ties resource lifetime to object lifetime for reliable cleanup.' },
  { title: 'Find a value', content: 'auto found = std::find(values.begin(), values.end(), target);', difficulty: 'Beginner', learningPoint: 'Standard algorithms work with iterator ranges across many containers.' },
  { title: 'Store named scores', content: 'std::map<std::string, int> scores{{"Ada", 94}};', difficulty: 'Easy', learningPoint: 'std::map associates ordered keys with values.' },
  { title: 'Write a lambda', content: 'auto isReady = [](int score) { return score >= 80; };', difficulty: 'Medium', learningPoint: 'A lambda creates a small callable value, often near its use.' },
  { title: 'Make a function generic', content: 'template <typename T>\nT larger(T left, T right) {\n    return left < right ? right : left;\n}', difficulty: 'Hard', learningPoint: 'Templates generate type-safe functions for compatible types.' },
  { title: 'Avoid modifying a value', content: 'void print(const std::vector<int>& values) {\n    for (int value : values) std::cout << value;\n}', difficulty: 'Hard', learningPoint: 'A const reference avoids copying while promising not to modify the argument.' },
  { title: 'Return an optional result', content: 'std::optional<int> findScore(const Scores& scores, Name name);', difficulty: 'Expert', learningPoint: 'std::optional represents a result that may legitimately be absent.' },
  { title: 'Move a large value', content: 'std::vector<int> takeValues() {\n    std::vector<int> values{1, 2, 3};\n    return values;\n}', difficulty: 'Expert', learningPoint: 'Move semantics can transfer resources instead of copying large objects.' },
  { title: 'Print a value', content: 'std::cout << "Ready" << std::endl;', difficulty: 'Beginner', learningPoint: 'The stream insertion operator sends values to an output stream.' },
  { title: 'Choose with a condition', content: 'if (score >= 60) {\n    status = "passed";\n}', difficulty: 'Beginner', learningPoint: 'A Boolean condition selects which block of code executes.' },
  { title: 'Count a container', content: 'for (const auto& name : names) {\n    std::cout << name;\n}', difficulty: 'Easy', learningPoint: 'A range-based loop visits each element in a collection.' },
  { title: 'Use a constant reference', content: 'void show(const std::string& label) {\n    std::cout << label;\n}', difficulty: 'Easy', learningPoint: 'A const reference avoids a copy while protecting the original value.' },
  { title: 'Find with a predicate', content: 'auto ready = std::find_if(tasks.begin(), tasks.end(),\n    [](const Task& task) { return task.ready; });', difficulty: 'Medium', learningPoint: 'find_if returns the first iterator whose predicate is true.' },
  { title: 'Use an unordered map', content: 'std::unordered_map<std::string, int> counts;\ncounts["ready"] = 2;', difficulty: 'Medium', learningPoint: 'unordered_map provides average constant-time key lookup without sorted order.' },
  { title: 'Capture a value in a lambda', content: 'int tax = 8;\nauto addTax = [tax](double price) { return price * (1 + tax / 100.0); };', difficulty: 'Hard', learningPoint: 'A lambda capture list controls which outside values are available inside.' },
  { title: 'Use a scoped lock', content: 'std::lock_guard<std::mutex> lock(mutex);\nupdateSharedValue();', difficulty: 'Hard', learningPoint: 'A scoped lock releases a mutex automatically when its object leaves scope.' },
  { title: 'Return a variant', content: 'std::variant<int, std::string> value = "ready";', difficulty: 'Expert', learningPoint: 'variant stores one value from a fixed set of possible types.' },
  { title: 'Constrain a template', content: 'template <typename T>\nrequires std::integral<T>\nT doubleValue(T value) { return value * 2; }', difficulty: 'Expert', learningPoint: 'A concept constraint states which types are valid template arguments.' },
]

export const cppPassages = educationalPassages('Programming', rows, 'C++')