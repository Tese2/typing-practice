import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Check the current folder', content: 'pwd\nls -la', difficulty: 'Beginner', learningPoint: 'pwd prints the working directory and ls lists its contents.' },
  { title: 'Store a shell value', content: 'project="field-notes"\nprintf "%s\\n" "$project"', difficulty: 'Easy', learningPoint: 'Quote variable expansions to preserve spaces and avoid unwanted splitting.' },
  { title: 'Check a command result', content: 'if grep -q "ready" status.txt; then\n  echo "Service is ready"\nfi', difficulty: 'Beginner', learningPoint: 'A shell if statement branches on a command’s exit status.' },
  { title: 'Loop over a short list', content: 'for file in notes.txt report.txt; do\n  printf "%s\\n" "$file"\ndone', difficulty: 'Easy', learningPoint: 'Quoting each expansion helps filenames remain a single argument.' },
  { title: 'Find matching files', content: 'find . -type f -name "*.log" -print', difficulty: 'Medium', learningPoint: 'find can filter by file type and name before taking an action.' },
  { title: 'Connect commands with a pipe', content: 'grep " 404 " access.log | wc -l', difficulty: 'Medium', learningPoint: 'A pipe sends one command’s output to another command as input.' },
  { title: 'Stop on common failures', content: 'set -euo pipefail\n./run-checks.sh', difficulty: 'Hard', learningPoint: 'Strict shell options expose failed commands, unset variables, and pipeline failures.' },
  { title: 'Use safe parameter expansion', content: ': "${DATA_DIR:=./data}"\nprintf "%s\\n" "$DATA_DIR"', difficulty: 'Hard', learningPoint: 'Parameter expansion can provide a default when a variable is empty or unset.' },
  { title: 'Capture an exit status', content: 'if ./validate.sh; then\n  echo "Validation passed"\nelse\n  status=$?\n  exit "$status"\nfi', difficulty: 'Expert', learningPoint: 'A nonzero exit status signals failure and can be propagated to the caller.' },
  { title: 'Redirect output safely', content: './build.sh >build.log 2>&1\nstatus=$?\ncat build.log\nexit "$status"', difficulty: 'Expert', learningPoint: 'Redirecting both output streams makes logs available while preserving the command status.' },
  { title: 'Print a helpful message', content: 'printf "Build complete: %s\\n" "$project_name"', difficulty: 'Beginner', learningPoint: 'printf formats output consistently and expands quoted values safely.' },
  { title: 'Test whether a file exists', content: 'if [ -f "config.json" ]; then\n  echo "Configuration found"\nfi', difficulty: 'Beginner', learningPoint: 'The -f test checks that a path names a regular file.' },
  { title: 'Pass a script argument', content: 'input_file="$1"\nprintf "Reading %s\\n" "$input_file"', difficulty: 'Easy', learningPoint: 'Positional parameter one contains the first argument passed to a script.' },
  { title: 'Create a temporary folder', content: 'temp_dir=$(mktemp -d)\ntrap \'rm -rf "$temp_dir"\' EXIT', difficulty: 'Easy', learningPoint: 'A trap can clean temporary files when a script exits.' },
  { title: 'Check for a command', content: 'if command -v git >/dev/null 2>&1; then\n  echo "Git is available"\nfi', difficulty: 'Medium', learningPoint: 'command -v checks whether a command can be found on the current path.' },
  { title: 'Read a line safely', content: 'while IFS= read -r line; do\n  printf "%s\\n" "$line"\ndone <names.txt', difficulty: 'Medium', learningPoint: 'read -r preserves backslashes while IFS prevents leading and trailing trimming.' },
  { title: 'Use a case statement', content: 'case "$action" in\n  start) run_service ;;\n  stop) stop_service ;;\n  *) exit 2 ;;\nesac', difficulty: 'Hard', learningPoint: 'case selects one command branch from a set of patterns.' },
  { title: 'Use an array of arguments', content: 'args=(--quiet --output "$destination")\n./export.sh "${args[@]}"', difficulty: 'Hard', learningPoint: 'Quoted array expansion preserves each argument as a separate value.' },
  { title: 'Choose a restrictive mode', content: 'umask 077\nmkdir -p "$HOME/private-notes"', difficulty: 'Expert', learningPoint: 'umask removes permission bits from newly created files and directories.' },
  { title: 'Handle an interrupt', content: 'trap \'echo "Stopping safely"; cleanup\' INT TERM EXIT', difficulty: 'Expert', learningPoint: 'Signal traps can run cleanup when a process is interrupted.' },
]

export const bashPassages = educationalPassages('Programming', rows, 'Bash / Shell')