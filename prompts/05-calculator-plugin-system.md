# Prompt: Calculator System

Help design or implement the calculator system for this site.

## Goal

Each calculator should be independent and easy to add or remove.

## Constraints

- Version 1 should remain a static site.
- Prefer browser-side calculators.
- Keep metadata explicit.
- Keep unit handling clear.
- Avoid a backend unless truly necessary.

## Suggested calculator folder shape

```text
/data/calculators/<calculator_slug>/
  meta.yml
  schema.json
  examples.md
  solver.py
  tests/
```

The final browser implementation does not need to execute `solver.py` directly, but the project may use Python code for reference logic, validation, or generating test cases.

## What I want from you

Please propose or implement:
- how calculators are discovered
- how metadata is defined
- how forms are generated or built
- how outputs are rendered
- how unit handling is represented
- how examples and related formulas are linked

## Priorities

1. simple authoring
2. independence between calculators
3. clear inputs/outputs
4. easy maintenance
5. testability
