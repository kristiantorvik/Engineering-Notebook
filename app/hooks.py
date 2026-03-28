"""
hooks.py — MkDocs event hooks for Engineering Notebook.

Registered in mkdocs.yml under `hooks:`.
"""

import json
import os
import re
from pathlib import Path

# ── Obsidian wikilink image resolution ────────────────────────────────────────

# Matches: ![[image.png]]  ![[image.png|alt text]]  ![[subfolder/image.png]]
WIKILINK_IMAGE_RE = re.compile(r'!\[\[([^\]|#\n]+?)(?:\|([^\]\n]*))?\]\]')

# Built once at config load; maps lowercase filename → path relative to docs_dir
_image_index: dict[str, Path] = {}

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp", ".ico"}

# ── Content index (for home page search/filter) ────────────────────────────────

# Collected during on_page_context; written to site/ in on_post_build
_content_pages: list[dict] = []

# Content types that have a `type` frontmatter field — everything else is skipped
CONTENT_TYPES = {"notat", "formel", "kalkulator", "referanse"}


def on_config(config):
    """Scan docs/ and build a filename → relative-path index for all images."""
    global _image_index, _content_pages
    docs_dir = Path(config["docs_dir"])
    _image_index = {}
    _content_pages = []
    for f in docs_dir.rglob("*"):
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS:
            _image_index[f.name.lower()] = f.relative_to(docs_dir)
    return config


def on_page_context(context, page, config, nav, **kwargs):
    """Collect typed pages into the content index."""
    meta = page.meta or {}
    content_type = meta.get("type", "")
    if content_type not in CONTENT_TYPES:
        return context

    # dest_uri is e.g. "notes/speeds-and-feeds/index.html" — make it a clean URL
    url = page.file.dest_uri.replace("index.html", "").rstrip("/")
    if not url:
        url = "."

    _content_pages.append({
        "title":        meta.get("title", page.title or ""),
        "type":         content_type,
        "tags":         meta.get("tags") or [],
        "summary":      meta.get("summary", ""),
        "search_words": meta.get("search_words", ""),
        "url":          url,
    })
    return context


def on_post_build(config):
    """Write the collected content index to site/content_index.json."""
    out_path = Path(config["site_dir"]) / "content_index.json"
    out_path.write_text(
        json.dumps(_content_pages, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def on_page_markdown(markdown, page, config, files, **kwargs):
    """Replace ![[image.png]] wikilinks with standard markdown image syntax."""
    if not _image_index:
        return markdown

    page_dir = Path(page.file.src_path).parent

    def replace(match: re.Match) -> str:
        raw = match.group(1).strip()
        alt = match.group(2)
        filename = Path(raw).name
        key = filename.lower()

        if key not in _image_index:
            return match.group(0)

        img_rel_to_docs = _image_index[key]
        rel_path = os.path.relpath(img_rel_to_docs, page_dir).replace("\\", "/")
        alt_text = alt.strip() if alt else Path(filename).stem
        return f"![{alt_text}]({rel_path})"

    return WIKILINK_IMAGE_RE.sub(replace, markdown)
