# AGENTS.md

You are working on an engineering knowledge base website.

## Product summary

This project is a simple, static, searchable technical reference site for an engineer / CNC programmer / operator / mechanic / handyman. It stores four primary content types:

1. Notes
2. Formulas
3. Calculators
4. Refrences

The site must prioritize simplicity, speed, maintainability, and easy content authoring over novelty.

The name of the repo and website will be "engineering-notebook"

## Core product principles

- Content is the product.
- The site should remain simple and clean.
- Tag-based discovery is preferred over deep navigation trees.
- The UI should feel like a technical reference, not a marketing site.
- Local-first editing is important.
- The repository should remain understandable by one technical person.
- New content should be easy to add without touching core app logic.
- Calculators must be isolated and easy to add or remove.

## Chosen technical direction

- Hosting: GitHub + Cloudflare Pages
- Site style: static site
- Framework: MkDocs + Material for MkDocs
- Content: Markdown files with YAML frontmatter
- Formula rendering: math support in Markdown pages
- Search: built-in static search first
- Calculators: browser-side components/pages for runtime simplicity
- Python is allowed and preferred for tooling, validation, indexing, data conversion, and content generation scripts
- Avoid requiring a Python backend for version 1

## Repository shape

```text
/app/                  # build helpers, scripts, custom theme overrides, shared assets
/data/
  notes/
  formulas/
  reference_data/
  calculators/
    beam_calculations/
      meta.yml
      schema.json
      examples.md
      solver.py
      tests/
/docs/                 # generated or assembled site content if needed by MkDocs
mkdocs.yml
```

The exact structure may evolve, but the separation of app logic and content should remain.

## Content model

Every content item should be findable by:

- title
- tags
- aliases / synonyms if relevant
- summary
- type

Primary content types:

### Note
General technical note in Markdown.

### Formula
A formula page should support:
- rendered math
- variable definitions
- units
- assumptions
- explanation text
- examples
- machine-copyable representations when practical
- single illustration image

### Calculator
A calculator should be an isolated module with:
- metadata
- input schema
- output description
- examples
- tests if logic is non-trivial
- clear unit handling

### Refrence data
Simple tables, graphs, plots etc
- image files
- markdown files
- only simple rendering

## Design rules

- Use a restrained, technical visual style.
- No unnecessary animations.
- No clutter.
- Avoid deep menu nesting.
- The home page should emphasize search and tags.
- Pages should be easy to scan.
- Formula pages should clearly separate the equation, variable meanings, assumptions, and examples.
- Calculator pages should clearly separate inputs, outputs, and related formulas.

## Engineering rules

- Prefer boring, maintainable solutions.
- Keep dependencies limited.
- Minimize framework complexity.
- Avoid overengineering version 1.
- Do not introduce a database unless explicitly requested.
- Do not introduce authentication unless explicitly requested.
- Do not introduce server-side infrastructure unless clearly necessary.
- All calculators in version 1 should run fully client-side unless there is a strong reason otherwise.
- Python logic may be used as a source of truth for tests or code generation, but the published site should stay static if possible.

## File and code style

- Use clear file names.
- Use small modules.
- Add comments where domain assumptions matter.
- Prefer typed interfaces where possible.
- Validate units and numerical assumptions explicitly.
- Do not hide engineering constants in random files.
- Keep metadata close to the content it describes.

## Decision guidance

When making tradeoffs, prefer:
1. Simplicity
2. Ease of local editing
3. Predictable deployment
4. Long-term maintainability
5. Good content structure
6. Nice appearance

## Output expectations for coding tasks

When implementing a task:
- explain the plan briefly
- make concrete file changes
- keep the changes narrow and relevant
- do not refactor unrelated areas unless necessary
- include any follow-up tasks or tradeoffs
- preserve existing content whenever possible

## Things to avoid

- Fancy CMS solutions for version 1
- Runtime server dependencies
- Complex plugin architectures before they are needed
- Hidden magic in the build pipeline
- Tight coupling between calculators
- UI-heavy SPA architecture unless clearly justified
