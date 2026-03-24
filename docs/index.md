---
title: Engineering Notebook
---

# Tekniske notat og oppslag

Ei personlig samling av nyttige notat, formler, kalkulatorer og oppslag.

<div id="nb-search-ui">

  <div class="nb-controls">
    <input
      type="search"
      id="nb-search"
      class="nb-search-input"
      placeholder="Søk på titler eller fra sammendrag"
      autocomplete="off"
    >
    <div class="nb-type-filters" id="nb-type-filters">
      <button class="nb-type-btn active" data-type="">All</button>
      <button class="nb-type-btn" data-type="notat">Notat</button>
      <button class="nb-type-btn" data-type="formel">Formler</button>
      <button class="nb-type-btn" data-type="kalkulator">Kalkulatorer</button>
      <button class="nb-type-btn" data-type="referanse">Referanse og oppslag</button>
    </div>
  </div>

  <div class="nb-tag-search-row">
    <input
      type="search"
      id="nb-tag-search"
      class="nb-tag-search-input"
      placeholder="Filtrer tags…"
      autocomplete="off"
    >
  </div>

  <div class="nb-tags" id="nb-tags"></div>

  <div class="nb-count" id="nb-count"></div>

  <div class="nb-grid" id="nb-grid">
    <p class="nb-loading">Loading…</p>
  </div>

</div>

<script>
(function () {
  const TYPE_LABELS = {
    note: "Note",
    formula: "Formula",
    calculator: "Calculator",
    reference: "Reference",
  };

  const TYPE_COLORS = {
    notat:       "var(--nb-type-notat)",
    formel:    "var(--nb-type-formel)",
    kalkulator: "var(--nb-type-kalkulator)",
    referanse:  "var(--nb-type-referanse)",
  };

  let allPages = [];
  let activeTags = new Set();
  let activeType = "";
  let searchText = "";

  // ── Fetch index ──────────────────────────────────────────────────────────

  // Resolve path to content_index.json from the site root
  const base = document.querySelector('base') ? document.querySelector('base').href : '/';
  const indexUrl = new URL('content_index.json', window.location.origin + '/').href;

  fetch(indexUrl)
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(data => {
      allPages = data;
      buildTagList();
      render();
    })
    .catch(() => {
      document.getElementById('nb-grid').innerHTML =
        '<p class="nb-loading">Content index not found — run <code>mkdocs build</code> first.</p>';
    });

  // ── Build tag chips ──────────────────────────────────────────────────────

  function buildTagList() {
    const counts = {};
    allPages.forEach(p => (p.tags || []).forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
    }));
    const sorted = Object.keys(counts).sort((a, b) => a.localeCompare(b));
    const container = document.getElementById('nb-tags');
    container.innerHTML = '';
    sorted.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'nb-tag-chip';
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => toggleTag(tag));
      container.appendChild(btn);
    });
    filterTagChips(document.getElementById('nb-tag-search').value.trim().toLowerCase());
  }

  function toggleTag(tag) {
    if (activeTags.has(tag)) {
      activeTags.delete(tag);
    } else {
      activeTags.add(tag);
    }
    document.querySelectorAll('.nb-tag-chip').forEach(btn => {
      btn.classList.toggle('active', activeTags.has(btn.dataset.tag));
    });
    render();
  }

  // ── Type filter buttons ──────────────────────────────────────────────────

  document.getElementById('nb-type-filters').addEventListener('click', e => {
    const btn = e.target.closest('.nb-type-btn');
    if (!btn) return;
    activeType = btn.dataset.type;
    document.querySelectorAll('.nb-type-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.type === activeType)
    );
    render();
  });

  // ── Search input ─────────────────────────────────────────────────────────

  document.getElementById('nb-search').addEventListener('input', e => {
    searchText = e.target.value.trim().toLowerCase();
    render();
  });

  document.getElementById('nb-tag-search').addEventListener('input', e => {
    filterTagChips(e.target.value.trim().toLowerCase());
  });

  function filterTagChips(q) {
    document.querySelectorAll('.nb-tag-chip').forEach(btn => {
      const match = !q || btn.dataset.tag.toLowerCase().includes(q);
      btn.style.display = (match || btn.classList.contains('active')) ? '' : 'none';
    });
  }

  // ── Render ───────────────────────────────────────────────────────────────

  function render() {
    const q = searchText;
    const filtered = allPages.filter(p => {
      if (activeType && p.type !== activeType) return false;
      if (activeTags.size > 0) {
        const pageTags = (p.tags || []).map(t => t.toLowerCase());
        for (const t of activeTags) {
          if (!pageTags.includes(t.toLowerCase())) return false;
        }
      }
      if (q) {
        const hay = (p.title + ' ' + p.summary).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const count = document.getElementById('nb-count');
    count.textContent = filtered.length === allPages.length
      ? `${allPages.length} items`
      : `${filtered.length} of ${allPages.length} items`;

    const grid = document.getElementById('nb-grid');
    if (filtered.length === 0) {
      grid.innerHTML = '<p class="nb-loading">No results.</p>';
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const color = TYPE_COLORS[p.type] || 'var(--md-default-fg-color)';
      const label = TYPE_LABELS[p.type] || p.type;
      const tags = (p.tags || []).map(t =>
        `<span class="nb-card-tag">${t}</span>`
      ).join('');
      // Highlight matching text
      const title = q ? highlight(p.title, q) : p.title;
      const summary = q ? highlight(p.summary, q) : p.summary;
      return `
        <a class="nb-card" href="${p.url}">
          <div class="nb-card-header">
            <span class="nb-badge" style="background:${color}">${label}</span>
            <span class="nb-card-title">${title}</span>
          </div>
          <p class="nb-card-summary">${summary}</p>
          <div class="nb-card-tags">${tags}</div>
        </a>`;
    }).join('');
  }

  function highlight(text, q) {
    if (!q || !text) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'),
      '<mark class="nb-hl">$1</mark>');
  }
})();
</script>
