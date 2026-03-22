# Copilot Instructions

You are helping build a static engineering knowledge base website.

## Project intent

The project is a personal/public technical reference site that gathers useful engineering notes, formulas, tables, charts, and calculators in one place.

The site should be:
- simple
- fast
- searchable
- content-first
- easy to update several times per week
- easy to host on GitHub + Cloudflare Pages

## Preferred stack

- MkDocs
- Material for MkDocs
- Markdown with YAML frontmatter
- Math rendering for formulas
- Python for tooling and validation
- JavaScript/TypeScript for browser-side calculators when needed

## Content types

There are three first-class content types:

1. Notes
2. Formulas
3. Calculators
4. Reference data

Reference tables/charts may exist as supporting content.

## Information architecture

Use tags as the primary discovery mechanism.
Do not build a deep folder-based browsing experience for end users.
Internal folders are allowed for maintainability.

## UI expectations

- clean technical UI
- no marketing language
- no unnecessary visual effects
- searchable home page
- prominent tag discovery
- clear typography
- strong readability for equations, tables, and examples

## Calculator rules

- calculators must be isolated
- each calculator should be easy to add or remove
- keep schemas and metadata explicit
- handle units clearly
- prefer client-side execution for deployment simplicity
- avoid introducing backend infrastructure for trivial calculations

## Formula page expectations

Each formula page should support:
- title
- summary
- tags
- aliases if useful
- rendered LaTeX/math
- variable definitions
- units
- assumptions
- examples
- optional copy/export-friendly representations

## General coding rules

- prefer maintainable solutions over clever ones
- avoid unnecessary dependencies
- write code that a single technical maintainer can understand
- keep build and deployment simple
- preserve a static-site deployment model unless a task explicitly requires otherwise
- do not add databases, auth, or server runtimes without a strong reason

## Implementation style

When asked to build features:
- propose the smallest viable implementation first
- keep file structure tidy
- document assumptions
- include tests when logic is important
- avoid unrelated refactors

## Priority order

1. simplicity
2. local editing workflow
3. stable deployment
4. content quality
5. extensibility
6. appearance
