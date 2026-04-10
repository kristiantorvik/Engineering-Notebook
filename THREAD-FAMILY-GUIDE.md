# Thread Family Implementation Guide

This document defines the conventions, rules, and requirements for implementing a thread family
in the thread calculator. It is intended for engineers and coding agents adding new families.

The calculator is used by professionals across industries — CNC machining, inspection, structural
engineering, oil and gas, aerospace — where incorrect thread data can cause assembly failures,
seal leaks, or structural incidents. **Every value produced by this calculator must be traceable
to a cited standard.** There is no tolerance for guesswork or approximation.

---

## 1. Non-negotiable requirements

### 1.1 Every number must come from a standard

- Each computed or tabulated value must cite its source: standard designation, edition/year,
  clause or table number.
- If a value is calculated from a formula given in a standard, that formula must be reproduced
  verbatim in a comment immediately above the code that implements it.
- If a value is taken from a table in a standard, the table must be cited in a comment. If the
  table is small enough to embed directly, embed it as a constant array or object; do not
  interpolate between table entries unless the standard explicitly permits interpolation.

### 1.2 When formulas and tables disagree, tables win

ISO 965-1 §10.1 is explicit: *"When the tolerance values calculated from the formulae are
different from the values specified by the tolerance tables, the values in the tolerance tables
shall be used."* Treat this rule as binding for all standards unless the standard itself states
otherwise.

### 1.3 No silent fallbacks

If an input combination is outside the scope of the standard (e.g. pitch or diameter outside
the tabulated range), the calculator must surface an error to the user. It must never silently
substitute a closest-match or interpolated value without informing the user that the result is
outside the standard's coverage.

### 1.4 Significant figures and rounding

Follow the rounding rules of the standard exactly. Many standards (e.g. ISO 965-1 §10.1) round
to preferred number series (R20, R40) rather than to a fixed number of decimal places. Do not
apply your own rounding — store and propagate full floating-point precision; format for display
only at the point of output using the shared `TC.fmt.*` formatters.

---

## 2. File structure

Each thread family lives in its own subdirectory under:

```
docs/assets/js/thread-calculator/families/{family-id}/
  data.js     — raw tabulated data from the standard
  config.js   — field schema, section definitions, family meta
  compute.js  — resolve() function, getDefaultState(), all calculations
```

All three files use the shared `window.TC` namespace pattern (IIFE, `"use strict"`):

```js
(function () {
  "use strict";
  window.TC = window.TC || {};
  TC.families = TC.families || {};
  TC.families["{family-id}"] = TC.families["{family-id}"] || {};
  // ...
})();
```

Load order in the `.md` page: `data.js` → `config.js` → `compute.js`, before `registry.js`.

---

## 3. data.js

Contains only raw data — no calculations. Each entry must exactly reproduce the values in the
referenced standard table. Do not convert units silently; store in the unit the standard uses
and document which unit that is.

Required exports on `TC.families["{id}"].data`:

| Property | Description |
|---|---|
| `coarse[]` | Array of size entries for the primary series |
| `fine[]`   | Array of size entries for the fine series (if applicable) |
| `lookup(key, isFine)` | Returns an entry by key, or `null` |

Each entry object must include at minimum:

```js
{ key: "M10x1.5", label: "M10 × 1,5", d: 10.0, p: 1.5 }
```

For non-metric families (e.g. NPT) store source values in the standard's native unit and note
the unit in a comment. Conversion to SI happens in `compute.js`, not here.

Cite the standard and table at the top of the file:

```js
// Source: ISO 261:1998 Table 1 (coarse series) and Table 2 (fine series)
```

---

## 4. config.js

Defines the field schema. Contains no numeric calculations — only structure.

### 4.1 meta object

```js
TC.families["{id}"].meta = {
  id:          "{id}",
  label:       "Full Norwegian label",
  labelShort:  "Short label",
  modes:       ["standard"],          // or ["standard", "by-input"]
  defaultMode: "standard",
  image:       "../../assets/images/{id}-thread.png",  // optional
};
```

### 4.2 Field types

| type | Purpose |
|---|---|
| `"output"` | Read-only computed result |
| `"select"` | Dropdown (tolerance class, size, series) |
| `"number"` | Floating-point user input |
| `"integer"` | Integer user input |

### 4.3 outputType for output fields

| outputType | When to use | Displayed columns |
|---|---|---|
| `"range"` | A value with a min/max tolerance band, OR a single limit in a specific column | Min / Midt / Maks |
| `"scalar"` | A single value with no directional meaning | Spans two columns, centred |

**Column placement rules for partial ranges:**

When a standard defines only one limit for a dimension (not a full tolerance band), use
`outputType: "range"` and set the unused columns to `null`. The renderer displays `—` for
`null`. This ensures the value appears in the correct column:

- Maximum material limit only → `{ min: null, mid: null, max: value }`
- Minimum material limit only → `{ min: value, mid: null, max: null }`
- Nominal/basic value only (no tolerance in standard) → `"scalar"` is appropriate

**Never place a directional limit value in the `mid` (Midt) column.** The mid column is
reserved for the midpoint of a tolerance band.

### 4.4 Visibility

Every field must have a `visible(state)` function. Fields not applicable to the current family
must have `visible: function() { return false; }` — they must never appear as `—` when they
are genuinely not defined for the thread form. Absence of an output entry in the `outputs` map
already causes `—` to appear, but the row itself should also be hidden.

### 4.5 Required min/max on input fields

All `number` and `integer` input fields must declare `min` (and `max` where applicable) from
the field schema. These are applied as HTML attributes for native browser validation styling.

---

## 5. compute.js

Contains all calculations. No DOM access. No state mutation except through the return value.

### 5.1 resolve() contract

```js
TC.families["{id}"].resolve = function (state, changedField) {
  return {
    state:      { ...updatedState },    // always a new object
    outputs:    { fieldId: outputEntry, ... },
    visibility: { "tc-section-{id}": bool, ... },
    warnings:   [{ fieldId: null|string, message: "..." }],
    errors:     [{ fieldId: null|string, message: "..." }],
  };
};
```

`resolve()` must always return a valid object. If inputs are erroneous, populate `errors[]`
and return safe fallback outputs — do not throw.

### 5.2 Output entry shapes

```js
// Full tolerance range
{ type: "range", unit: "mm", min: 9.974, mid: 9.987, max: 10.000 }

// Single standardised limit (max only example)
{ type: "range", unit: "mm", min: null, mid: null, max: 8.160 }

// Scalar (basic/nominal, geometry constant, etc.)
{ type: "scalar", unit: "mm", value: 0.9129 }
```

### 5.3 Formula documentation pattern

```js
// ISO 965-1:2013 §10.4.1 Formula (14):
//   Td2(6) = 90 × P^0.4 × d^0.1   [µm]
//   d = geometric mean of diameter range limits (Tables 4 / 5)
function Td2_grade6(d_nom, p) {
  return 90 * Math.pow(p, 0.4) * Math.pow(diamGeomMean(d_nom), 0.1);
}
```

### 5.4 Unit discipline

- All internal calculations in SI (mm, µm as appropriate). Convert to mm at the point of
  output.
- Non-SI source data (inches, TPI) is converted to SI inside `compute.js` using
  `TC.units.inToMm()` and `TC.units.tpiToPitch()`. The raw source values remain in `data.js`
  in their original unit.
- Comment the unit at every step that is not self-evidently millimetres.

### 5.5 Scope enforcement

If a combination of diameter, pitch, tolerance class, or number of starts is outside the
coverage of the cited standard:

1. Add an entry to `errors[]` or `warnings[]` with a specific message identifying what is
   out of scope and which standard/table defines the boundary.
2. Either omit the affected output (it will display as `—`) or return a clearly marked
   fallback, but never return a silently wrong value.

---

## 6. Tolerance system conventions (ISO metric reference)

The ISO metric 60° family is the reference implementation. Key conventions established there:

| Dimension | Standard | What is provided |
|---|---|---|
| d (ext major) | ISO 965-1 Tables 3/10 | min and max (full tolerance band) |
| d₂ (ext pitch) | ISO 965-1 Tables 5/12 | min and max (full tolerance band) |
| d₃ (ext root) | ISO 965-1 §11 | max only (d₃_max = d₃_basic + es) |
| D (int major) | ISO 965-1 | min only (= d_basic; no upper limit standardised) |
| D₂ (int pitch) | ISO 965-1 Tables 4/13 | min and max (full tolerance band) |
| D₁ (int minor) | ISO 965-1 Tables 2/11 | min and max (full tolerance band) |
| H (profile height) | ISO 68-1 | scalar (basic profile geometry, not a tolerance) |

Root contour geometry (ISO 68-1 / ISO 965-1 §11):

| Feature | Value |
|---|---|
| External crest flat | P/8 |
| External root radius R_min | 0.125P |
| External root radius R_recommended | H/6 ≈ 0.14434P |
| Internal root flat at D | P/8 |
| Internal crest flat at D₁ | P/4 |

---

## 7. Registering the family

In `registry.js`, add one line:

```js
TC.registry.register("{id}", TC.families["{id}"]);
```

In the `.md` calculator page, add the three `<script>` tags **before** the `registry.js` tag,
in load order: `data.js`, `config.js`, `compute.js`.

---

## 8. Norwegian language requirement

All user-visible strings (field labels, section headers, warning and error messages, dropdown
options) must be in Norwegian (Nynorsk/Bokmål as consistent with the rest of the calculator).
Symbol names and unit abbreviations follow the standard (mm, µm, °, %, etc.).

Internal code identifiers (variable names, function names, field IDs) are in English.

---

## 9. Checklist for a new family

Before marking a family implementation complete, verify each item:

- [ ] Every tabulated value cites standard, edition, and table number in a comment
- [ ] Every formula reproduces the standard's equation verbatim in a comment above it
- [ ] All values cross-checked against at least two entries in the standard's tables
- [ ] No output value appears in the wrong Min/Midt/Maks column
- [ ] Fields not applicable to this family have `visible: function() { return false; }`
- [ ] Out-of-range inputs produce an error message, not a silent fallback value
- [ ] All user-visible strings are in Norwegian
- [ ] Family is registered in `registry.js` and all three script tags are in the `.md` file
- [ ] The family image (if provided) is placed at `docs/assets/images/{id}-thread.png`
