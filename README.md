# Engineering Notebook

Personal static reference site for machining, fabrication, and engineering calculations.

Built with [MkDocs](https://www.mkdocs.org/) + [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

---

## Local setup

**Prerequisites:** Python 3.11+

```bash
pip install -r requirements.txt
mkdocs serve
```

The site runs at `http://localhost:8000`.

---

## Build

```bash
mkdocs build
```

Output is written to `site/`. This directory is git-ignored.

---

## Validate content

Checks that all Markdown files have valid frontmatter:

```bash
python app/validate.py
```

---

## Deployment

Hosted on **Cloudflare Pages**, auto-deployed on push to `main`.

Cloudflare Pages settings:
- **Build command:** `pip install -r requirements.txt && mkdocs build`
- **Output directory:** `site`
- **Python version:** 3.11

---

## Content structure

```
docs/
  notes/          General technical notes
  formulas/       Equations with variable definitions and examples
  calculators/    Browser-side calculation tools
  reference/      Tables and charts

data/
  calculators/    Calculator schemas, Python solvers, test cases

app/
  validate.py     Frontmatter validation script
```

---

## Adding content

### New note
Create `docs/notes/<slug>.md` with this frontmatter:

```yaml
---
title: "My Note Title"
summary: "One-line description."
tags: [machining, cnc]
type: note
updated: YYYY-MM-DD
---
```

### New formula
Create `docs/formulas/<slug>.md`:

```yaml
---
title: "Formula Name"
summary: "What it calculates."
tags: [machining]
type: formula
aliases: [alternative name]
---
```

Include: rendered LaTeX, variable table, units, assumptions, examples.

### New calculator
Create `docs/calculators/<slug>.md`:

```yaml
---
title: "Calculator Name"
summary: "What it computes."
tags: [machining, calculator]
type: calculator
---
```

Add HTML/JS inline in the Markdown body. Also create `data/calculators/<slug>/` with `meta.yml` and `schema.json`.

### New reference page
Create `docs/reference/<slug>.md`:

```yaml
---
title: "Reference Title"
summary: "What data it contains."
tags: [reference, fasteners]
type: reference
---
```

### Register in nav
Add the new page to the `nav:` section in `mkdocs.yml`.

---

## Stack

- [MkDocs](https://www.mkdocs.org/) — static site generator
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) — theme
- [MathJax](https://www.mathjax.org/) — formula rendering
- GitHub — source control
- Cloudflare Pages — hosting