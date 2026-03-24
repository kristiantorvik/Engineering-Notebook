#!/usr/bin/env python3
"""
validate.py — Frontmatter validation for Engineering Notebook content.

Usage:
    python app/validate.py          # validate all docs/
    python app/validate.py --path docs/formulas

Exit code 0 if all files pass, 1 if any fail.
"""

import sys
import argparse
from pathlib import Path

# PyYAML is included with mkdocs-material dependencies.
# If running standalone: pip install pyyaml
try:
    import yaml
except ImportError:
    print("ERROR: PyYAML not found. Run: pip install pyyaml")
    sys.exit(1)


# ── Required fields per content type ──────────────────────────────────────────

REQUIRED_FIELDS_BY_TYPE: dict[str, list[str]] = {
    "notat": ["title", "summary", "tags", "type"],
    "formel": ["title", "summary", "tags", "type"],
    "kalkulator": ["title", "summary", "tags", "type"],
    "referanse": ["title", "summary", "tags", "type"],
}

# Fields required on every content file regardless of type
ALWAYS_REQUIRED = ["title"]

VALID_TYPES = set(REQUIRED_FIELDS_BY_TYPE.keys())


# ── Frontmatter parser ─────────────────────────────────────────────────────────

def parse_frontmatter(path: Path) -> dict | None:
    """
    Extract YAML frontmatter from a Markdown file.
    Returns None if no frontmatter block is found.
    """
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    if end == -1:
        return None
    raw_yaml = text[3:end].strip()
    return yaml.safe_load(raw_yaml) or {}


# ── Validation logic ───────────────────────────────────────────────────────────

def validate_file(path: Path) -> list[str]:
    """
    Validate a single Markdown file's frontmatter.
    Returns a list of error strings (empty = pass).
    """
    errors: list[str] = []

    fm = parse_frontmatter(path)
    if fm is None:
        errors.append("No YAML frontmatter found (must begin with ---)")
        return errors

    # Check always-required fields
    for field in ALWAYS_REQUIRED:
        if not fm.get(field):
            errors.append(f"Missing required field: '{field}'")

    # Check type is valid
    content_type = fm.get("type", "")
    if content_type and content_type not in VALID_TYPES:
        errors.append(
            f"Unknown type '{content_type}'. Valid types: {sorted(VALID_TYPES)}"
        )
        return errors

    # Check type-specific required fields
    if content_type in REQUIRED_FIELDS_BY_TYPE:
        for field in REQUIRED_FIELDS_BY_TYPE[content_type]:
            if not fm.get(field):
                errors.append(f"Missing required field for type '{content_type}': '{field}'")

    # Check tags is a list
    tags = fm.get("tags")
    if tags is not None and not isinstance(tags, list):
        errors.append("'tags' must be a YAML list")

    return errors


# ── Runner ─────────────────────────────────────────────────────────────────────

def run(docs_path: Path) -> bool:
    """
    Walk docs_path, validate every .md file, print results.
    Returns True if all pass.
    """
    md_files = sorted(docs_path.rglob("*.md"))
    if not md_files:
        print(f"No Markdown files found in {docs_path}")
        return True

    passed = 0
    failed = 0

    for path in md_files:
        rel = path.relative_to(docs_path.parent)
        errors = validate_file(path)
        if errors:
            failed += 1
            print(f"  FAIL  {rel}")
            for err in errors:
                print(f"        x {err}")
        else:
            passed += 1
            print(f"  OK    {rel}")

    print()
    print(f"Results: {passed} passed, {failed} failed ({passed + failed} total)")
    return failed == 0


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate Engineering Notebook frontmatter")
    parser.add_argument(
        "--path",
        default="docs",
        help="Directory to validate (default: docs)",
    )
    args = parser.parse_args()

    docs_path = Path(args.path)
    if not docs_path.exists():
        print(f"ERROR: Path not found: {docs_path}")
        sys.exit(1)

    print(f"Validating: {docs_path}\n")
    ok = run(docs_path)
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
