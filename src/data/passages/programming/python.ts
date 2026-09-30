import { educationalPassages, type PassageSeed } from '../shared'

const rows: PassageSeed[] = [
  { title: 'Sum a list', content: 'numbers = [1, 2, 3, 4, 5]\ntotal = sum(numbers)\nprint(total)', difficulty: 'Beginner', learningPoint: 'Python sum calculates the total of numeric values in an iterable.' },
  { title: 'Loop through items', content: 'for name in names:\n    print(name.title())', difficulty: 'Beginner', learningPoint: 'A for loop visits each item in an iterable in sequence.' },
  { title: 'Build a list', content: 'squares = [number ** 2 for number in range(5)]', difficulty: 'Easy', learningPoint: 'A list comprehension transforms or filters values into a new list.' },
  { title: 'Count with enumerate', content: 'for index, word in enumerate(words, start=1):\n    print(index, word)', difficulty: 'Easy', learningPoint: 'enumerate pairs each item with its position without a manual counter.' },
  { title: 'Read a dictionary', content: 'profile = {"name": "Ari", "active": True}\nprint(profile.get("name"))', difficulty: 'Medium', learningPoint: 'A dictionary stores values under keys; get can supply a safe lookup.' },
  { title: 'Handle a conversion', content: 'try:\n    amount = int(raw_value)\nexcept ValueError:\n    amount = 0', difficulty: 'Medium', learningPoint: 'A narrow exception handler responds to a conversion that cannot succeed.' },
  { title: 'Define a function', content: 'def average(values):\n    if not values:\n        return 0\n    return sum(values) / len(values)', difficulty: 'Hard', learningPoint: 'A function packages reusable logic and returns a result to its caller.' },
  { title: 'Use a generator', content: 'def positive(values):\n    for value in values:\n        if value > 0:\n            yield value', difficulty: 'Hard', learningPoint: 'yield produces values lazily instead of building a complete list at once.' },
  { title: 'Preserve a file handle', content: 'with open("notes.txt", encoding="utf-8") as file:\n    text = file.read()', difficulty: 'Expert', learningPoint: 'A with statement closes a file even when reading raises an exception.' },
  { title: 'Use a dataclass', content: 'from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float', difficulty: 'Expert', learningPoint: 'dataclass generates common methods for classes that primarily store data.' },
  { title: 'Check a condition', content: 'if temperature > 30:\n    print("Take water")\nelse:\n    print("Enjoy the day")', difficulty: 'Beginner', learningPoint: 'if and else choose a code path based on a Boolean condition.' },
  { title: 'Keep a value unchanged', content: 'name = "Mina"\nmessage = f"Welcome, {name}!"', difficulty: 'Beginner', learningPoint: 'An f-string inserts evaluated expressions into readable text.' },
  { title: 'Sort with a key', content: 'ordered = sorted(records, key=lambda item: item["date"])', difficulty: 'Easy', learningPoint: 'sorted returns a new list and key chooses the value used for ordering.' },
  { title: 'Combine two lists', content: 'pairs = list(zip(names, scores))', difficulty: 'Easy', learningPoint: 'zip groups values at matching positions from multiple iterables.' },
  { title: 'Provide a keyword-only option', content: 'def connect(host, *, timeout=5):\n    return open_connection(host, timeout)', difficulty: 'Medium', learningPoint: 'Parameters after * must be passed by name, clarifying optional settings.' },
  { title: 'Use a set for membership', content: 'allowed = {"read", "write"}\nif action in allowed:\n    authorize()', difficulty: 'Medium', learningPoint: 'Sets provide a clear representation for unique values and membership checks.' },
  { title: 'Define a context manager', content: 'from contextlib import closing\nwith closing(open_resource()) as resource:\n    resource.read()', difficulty: 'Hard', learningPoint: 'A context manager centralizes setup and cleanup around a block.' },
  { title: 'Preserve function metadata', content: 'from functools import wraps\ndef logged(function):\n    @wraps(function)\n    def wrapper(*args, **kwargs):\n        return function(*args, **kwargs)\n    return wrapper', difficulty: 'Hard', learningPoint: 'wraps copies useful metadata when a decorator replaces a function.' },
  { title: 'Create an iterator', content: 'class Countdown:\n    def __init__(self, start):\n        self.value = start\n    def __iter__(self):\n        return self', difficulty: 'Expert', learningPoint: 'An iterator implements the protocol that lets Python request values in sequence.' },
  { title: 'Use a typed protocol', content: 'from typing import Protocol\nclass Sized(Protocol):\n    def __len__(self) -> int: ...', difficulty: 'Expert', learningPoint: 'A protocol describes compatible behavior without requiring shared inheritance.' },
]

export const pythonPassages = educationalPassages('Programming', rows, 'Python')