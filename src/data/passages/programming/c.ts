import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Declare an integer', content: '#include <stdio.h>\nint main(void) {\n    int count = 3;\n    printf("%d\\n", count);\n}', difficulty: 'Beginner', learningPoint: 'A C declaration gives a variable a type that determines its representation.' },
  { title: 'Repeat with a loop', content: 'for (int index = 0; index < 4; index++) {\n    printf("%d\\n", index);\n}', difficulty: 'Easy', learningPoint: 'A loop condition controls how many times a block executes.' },
  { title: 'Write a function', content: 'int square(int value) {\n    return value * value;\n}', difficulty: 'Beginner', learningPoint: 'A function signature states its return type and parameter types.' },
  { title: 'Pass an address', content: 'void increment(int *value) {\n    (*value)++;\n}', difficulty: 'Medium', learningPoint: 'A pointer stores an address and can let a function modify a caller value.' },
  { title: 'Define a structure', content: 'struct Point {\n    double x;\n    double y;\n};', difficulty: 'Easy', learningPoint: 'A struct groups related fields into one programmer-defined type.' },
  { title: 'Check an array bound', content: 'if (index >= 0 && index < length) {\n    total += values[index];\n}', difficulty: 'Medium', learningPoint: 'Bounds checks prevent reading or writing outside an array.' },
  { title: 'Allocate and release memory', content: 'int *values = malloc(count * sizeof *values);\nif (values != NULL) {\n    free(values);\n}', difficulty: 'Hard', learningPoint: 'Dynamically allocated memory must be checked and released when no longer needed.' },
  { title: 'Read a file safely', content: 'FILE *file = fopen("notes.txt", "r");\nif (file != NULL) {\n    fclose(file);\n}', difficulty: 'Hard', learningPoint: 'Always check whether a file opened successfully and close it afterward.' },
  { title: 'Use an enum', content: 'enum Status { PENDING, COMPLETE, FAILED };\nenum Status state = PENDING;', difficulty: 'Expert', learningPoint: 'An enum gives related integer constants readable names.' },
  { title: 'Return an error code', content: 'int parse_count(const char *text, int *result) {\n    if (text == NULL || result == NULL) return -1;\n    return 0;\n}', difficulty: 'Expert', learningPoint: 'An explicit status value lets a caller distinguish success from failure.' },
  { title: 'Choose a branch', content: 'if (score >= 60) {\n    puts("passed");\n} else {\n    puts("review");\n}', difficulty: 'Beginner', learningPoint: 'A conditional selects a block based on whether its expression is nonzero.' },
  { title: 'Define a named constant', content: 'const double tax_rate = 0.08;\ndouble total = price * (1.0 + tax_rate);', difficulty: 'Beginner', learningPoint: 'const prevents accidental reassignment through that identifier.' },
  { title: 'Count array values', content: 'for (size_t index = 0; index < length; index++) {\n    total += values[index];\n}', difficulty: 'Easy', learningPoint: 'size_t is the unsigned type commonly used for object sizes and indices.' },
  { title: 'Return the string length', content: 'size_t length = strlen(label);', difficulty: 'Easy', learningPoint: 'strlen counts bytes before the terminating null character.' },
  { title: 'Check a pointer first', content: 'if (buffer != NULL) {\n    buffer[0] = "A"[0];\n}', difficulty: 'Medium', learningPoint: 'Checking a pointer prevents dereferencing a null address.' },
  { title: 'Copy text with a bound', content: 'snprintf(output, sizeof output, "%s", input);', difficulty: 'Medium', learningPoint: 'snprintf limits the number of bytes written to a destination buffer.' },
  { title: 'Use a header guard', content: '#ifndef POINT_H\n#define POINT_H\nstruct Point { double x; double y; };\n#endif', difficulty: 'Hard', learningPoint: 'A header guard prevents the same declarations from being included repeatedly.' },
  { title: 'Pass a constant array', content: 'double mean(const double *values, size_t length);', difficulty: 'Hard', learningPoint: 'const documents that the function reads but does not change the pointed-to values.' },
  { title: 'Check integer division', content: 'double ratio = (double)completed / total;', difficulty: 'Expert', learningPoint: 'Casting before division avoids truncation from integer arithmetic.' },
  { title: 'Release an allocated buffer', content: 'char *buffer = calloc(count, sizeof *buffer);\nif (buffer != NULL) { free(buffer); }', difficulty: 'Expert', learningPoint: 'calloc allocates zeroed storage that must later be released with free.' },
]

export const cPassages = educationalPassages('Programming', rows, 'C')