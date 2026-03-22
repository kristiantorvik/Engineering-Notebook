# Prompt: Content Schema

Help define or implement content schemas for this engineering knowledge base.

## Content types

### Note
Should support at least:
- title
- summary
- tags
- aliases (optional)
- updated date (optional)
- body in Markdown

### Formula
Should support at least:
- title
- summary
- tags
- aliases (optional)
- formula or formulas in rendered math
- variable definitions
- units
- assumptions
- examples
- optional machine-copyable representations such as LaTeX or Python expression strings

### Calculator
Should support at least:
- title
- summary
- tags
- input definitions
- output definitions
- unit notes
- examples
- related formulas or notes

## Requirements

- Use human-editable text formats.
- Prefer YAML frontmatter plus Markdown body.
- Keep the schema easy to author manually.
- Keep room for future validation scripts.

## Deliverables

When implementing, provide:
- schema proposal
- example files
- validation approach
- any assumptions or tradeoffs
