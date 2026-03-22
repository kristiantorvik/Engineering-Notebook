# Prompt: Architecture Guidance

Help design or implement this project using the following architecture constraints.

## High-level architecture

- Static site
- GitHub repo as source of truth
- Cloudflare Pages for deployment
- Markdown-based content
- Search and tags for discovery
- No required backend in version 1

## Repository intent

```text
/app/
/data/notes/
/data/formulas/
/data/reference_data/
/data/calculators/
```

## Rules

- Keep content separate from app logic.
- Keep calculators isolated.
- Prefer explicit metadata over implicit conventions.
- Avoid coupling content to fragile custom code.
- Preserve the ability to edit content directly in text files.

## Desired outcome

When proposing architecture or code, optimize for:
1. simple local development
2. simple deployment
3. maintainable content model
4. low cognitive load
5. easy future additions
