#!/usr/bin/env python3
"""
beam_diagrams.py — draws the SVG illustrations for docs/notes/bjelkeformlar.md
and checks the formulas in that note numerically.

Usage:
    python app/beam_diagrams.py

Each load case is defined once in CASES with unit values (L = F = q = M0 = EI = 1).
For every case the script:
  1. builds the bending moment M(x) from the loads and the reaction formulas,
  2. integrates EI*y'' = M twice (Euler-Bernoulli) and applies the support conditions,
  3. checks that the extra support conditions and the note's formulas hold,
  4. draws the beam with the real (exaggerated) deflection curve.

Pure standard library — no dependencies. Not part of the site build.
"""

import math
import sys
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parent.parent / "docs" / "assets" / "images" / "bjelker"

# ── Drawing constants (same palette as the other SVG illustrations) ───────────
GRAY, LOAD, DEFL = "#9e9e9e", "#ff8a65", "#4fc3f7"
WIDTH, X0, X1, YB = 320, 50, 270, 64     # canvas width, beam start/end, beam centreline
DEFL_PX = 16                             # drawn size of the largest deflection

N = 14000                                # grid intervals (load positions land on nodes)
R3, R5 = math.sqrt(3), math.sqrt(5)

# Positions used for the "arbitrary" cases (fractions of L)
A, B = 0.65, 0.35      # point load at a from A, b from B
A2 = 0.30              # two symmetric point loads, a from each support
AC = 0.60              # cantilever, point load at a from the wall
AO = 0.40              # overhang length a (span L = 1)


# ── Beam solver ───────────────────────────────────────────────────────────────

class Solution:
    def __init__(self, case):
        length = case.get("length", 1.0)
        h = length / N
        self.h = h
        self.xs = [i * h for i in range(N + 1)]
        forces = case["forces"]              # (x, value) — upward positive
        couples = case.get("couples", [])    # (x, value) — adds to M right of x
        dist = case.get("dist")              # (x1, x2, q1, q2) — downward, linear

        def moment(x):
            m = sum(f * (x - xf) for xf, f in forces if x > xf)
            m += sum(c for xc, c in couples if x >= xc)
            if dist and x > dist[0]:
                x1, x2, q1, q2 = dist[:4]
                k = (q2 - q1) / (x2 - x1)
                d, u = x - x1, min(x, x2) - x1
                m -= q1 * (d * u - u * u / 2) + k * (d * u * u / 2 - u ** 3 / 3)
            return m

        self.M = [moment(x) for x in self.xs]
        slope = self._cumtrapz(self.M)
        defl = self._cumtrapz(slope)

        # y = defl + c1*x + c2 ; y' = slope + c1.  Two conditions fix c1, c2.
        def row(kind, x):
            i = round(x / h)
            return (x, 1.0, -defl[i]) if kind == "y" else (1.0, 0.0, -slope[i])

        bcs = case["bcs"]
        (a1, b1, r1), (a2, b2, r2) = row(*bcs[0]), row(*bcs[1])
        det = a1 * b2 - a2 * b1
        c1, c2 = (r1 * b2 - r2 * b1) / det, (a1 * r2 - a2 * r1) / det
        self.y = [d + c1 * x + c2 for d, x in zip(defl, self.xs)]
        self.slope = [s + c1 for s in slope]

        # Remaining conditions must come out as zero if the reactions are right
        self.residuals = [
            (self.y if kind == "y" else self.slope)[round(x / h)] for kind, x in bcs[2:]
        ]
        self.residuals.append(self.M[-1] - case.get("m_end", 0.0))

    def _cumtrapz(self, v):
        out, acc = [0.0], 0.0
        for i in range(1, len(v)):
            acc += (v[i - 1] + v[i]) * self.h / 2
            out.append(acc)
        return out

    # Helpers for the checks. Deflection is reported positive downward.
    def m_max(self):      return max(abs(m) for m in self.M)
    def m_at(self, x):    return self.M[round(x / self.h)]
    def d_max(self):      return -min(self.y)
    def d_at(self, x):    return -self.y[round(x / self.h)]
    def x_dmax(self):     return self.xs[self.y.index(min(self.y))]
    def up_max(self):     return max(self.y)


# ── Load cases ────────────────────────────────────────────────────────────────
# checks: (text, value from the formula in the note, function of the solution[, rel. tol])

SS = [("pin", 0.0), ("roller", 1.0)]
SS_BC = [("y", 0.0), ("y", 1.0)]
CANT = [("fixed", 0.0)]
CANT_BC = [("y", 0.0), ("th", 0.0)]
FF = [("fixed", 0.0), ("fixed", 1.0)]
FF_BC = [("y", 0.0), ("th", 0.0), ("y", 1.0), ("th", 1.0)]
FP = [("fixed", 0.0), ("roller", 1.0)]
FP_BC = [("y", 0.0), ("th", 0.0), ("y", 1.0)]
DIM_L = [(0.0, 1.0, "L")]

CASES = [
    # ── Fritt opplagt ──
    dict(name="fritt-opplagt-punktlast-midt", title="Fritt opplagt bjelke, punktlast i midten",
         supports=SS, bcs=SS_BC, point_loads=[0.5],
         forces=[(0.5, -1), (0, 1 / 2), (1, 1 / 2)],
         dims=[[(0, 0.5, "L/2"), (0.5, 1, "L/2")]],
         checks=[("M_max = FL/4", 1 / 4, Solution.m_max),
                 ("d_max = FL^3/48EI", 1 / 48, Solution.d_max)]),
    dict(name="fritt-opplagt-punktlast-vilkarleg", title="Fritt opplagt bjelke, punktlast på vilkårleg plass",
         supports=SS, bcs=SS_BC, point_loads=[A],
         forces=[(A, -1), (0, B), (1, A)],
         dims=[[(0, A, "a"), (A, 1, "b")], DIM_L],
         checks=[("M_max = Fab/L", A * B, Solution.m_max),
                 ("d_F = Fa^2b^2/3EIL", A ** 2 * B ** 2 / 3, lambda s: s.d_at(A)),
                 ("d_max = Fb(L^2-b^2)^1.5/(9*sqrt3*EIL)", B * (1 - B * B) ** 1.5 / (9 * R3), Solution.d_max),
                 ("x(d_max) = sqrt((L^2-b^2)/3)", math.sqrt((1 - B * B) / 3), Solution.x_dmax)]),
    dict(name="fritt-opplagt-to-punktlaster", title="Fritt opplagt bjelke, to symmetriske punktlaster",
         supports=SS, bcs=SS_BC, point_loads=[A2, 1 - A2],
         forces=[(A2, -1), (1 - A2, -1), (0, 1), (1, 1)],
         dims=[[(0, A2, "a"), (1 - A2, 1, "a")], DIM_L],
         checks=[("M_max = Fa", A2, Solution.m_max),
                 ("d_max = Fa(3L^2-4a^2)/24EI", A2 * (3 - 4 * A2 * A2) / 24, Solution.d_max)]),
    dict(name="fritt-opplagt-jamt-fordelt", title="Fritt opplagt bjelke, jamt fordelt last",
         supports=SS, bcs=SS_BC, dist=(0, 1, 1, 1, "q"),
         forces=[(0, 1 / 2), (1, 1 / 2)], dims=[DIM_L],
         checks=[("M_max = qL^2/8", 1 / 8, Solution.m_max),
                 ("d_max = 5qL^4/384EI", 5 / 384, Solution.d_max)]),
    dict(name="fritt-opplagt-trekantlast", title="Fritt opplagt bjelke, trekantlast (0 ved A, q0 ved B)",
         supports=SS, bcs=SS_BC, dist=(0, 1, 0, 1, "q_0"),
         forces=[(0, 1 / 6), (1, 1 / 3)], dims=[DIM_L],
         checks=[("M_max = q0L^2/(9*sqrt3)", 1 / (9 * R3), Solution.m_max),
                 ("x(M_max) = 0.577L", 1 / R3, lambda s: s.xs[s.M.index(max(s.M))]),
                 ("d_max = 0.00652 q0L^4/EI", 0.00652, Solution.d_max, 2e-3),
                 ("x(d_max) = 0.519L", 0.519, Solution.x_dmax, 2e-3)]),
    dict(name="fritt-opplagt-moment", title="Fritt opplagt bjelke, moment i enden (ved B)",
         supports=SS, bcs=SS_BC, moment=(1.0, "ccw"),
         forces=[(0, 1), (1, -1)], m_end=1.0, dims=[DIM_L],
         checks=[("M_max = M0", 1, Solution.m_max),
                 ("d_max = M0L^2/(9*sqrt3*EI)", 1 / (9 * R3), Solution.d_max),
                 ("x(d_max) = 0.577L", 1 / R3, Solution.x_dmax)]),

    # ── Utkragar ──
    dict(name="utkragar-punktlast-ende", title="Utkragar, punktlast i enden",
         supports=CANT, bcs=CANT_BC, point_loads=[1.0],
         forces=[(1, -1), (0, 1)], couples=[(0, -1)], dims=[DIM_L],
         checks=[("M_max = FL", 1, Solution.m_max),
                 ("d_max = FL^3/3EI", 1 / 3, Solution.d_max)]),
    dict(name="utkragar-punktlast-vilkarleg", title="Utkragar, punktlast på vilkårleg plass",
         supports=CANT, bcs=CANT_BC, point_loads=[AC],
         forces=[(AC, -1), (0, 1)], couples=[(0, -AC)],
         dims=[[(0, AC, "a")], DIM_L],
         checks=[("M_max = Fa", AC, Solution.m_max),
                 ("d_max = Fa^2(3L-a)/6EI", AC ** 2 * (3 - AC) / 6, Solution.d_max),
                 ("d_F = Fa^3/3EI", AC ** 3 / 3, lambda s: s.d_at(AC))]),
    dict(name="utkragar-jamt-fordelt", title="Utkragar, jamt fordelt last",
         supports=CANT, bcs=CANT_BC, dist=(0, 1, 1, 1, "q"),
         forces=[(0, 1)], couples=[(0, -1 / 2)], dims=[DIM_L],
         checks=[("M_max = qL^2/2", 1 / 2, Solution.m_max),
                 ("d_max = qL^4/8EI", 1 / 8, Solution.d_max)]),
    dict(name="utkragar-trekantlast", title="Utkragar, trekantlast (q0 ved innspenning, 0 i enden)",
         supports=CANT, bcs=CANT_BC, dist=(0, 1, 1, 0, "q_0"),
         forces=[(0, 1 / 2)], couples=[(0, -1 / 6)], dims=[DIM_L],
         checks=[("M_max = q0L^2/6", 1 / 6, Solution.m_max),
                 ("d_max = q0L^4/30EI", 1 / 30, Solution.d_max)]),
    dict(name="utkragar-moment", title="Utkragar, moment i enden",
         supports=CANT, bcs=CANT_BC, moment=(1.0, "cw"),
         forces=[], couples=[(0, -1)], m_end=-1.0, dims=[DIM_L],
         checks=[("M_max = M0", 1, Solution.m_max),
                 ("d_max = M0L^2/2EI", 1 / 2, Solution.d_max)]),

    # ── Fast innspent i begge endar ──
    dict(name="innspent-punktlast-midt", title="Fast innspent bjelke, punktlast i midten",
         supports=FF, bcs=FF_BC, point_loads=[0.5],
         forces=[(0.5, -1), (0, 1 / 2), (1, 1 / 2)], couples=[(0, -1 / 8)], m_end=-1 / 8,
         dims=[[(0, 0.5, "L/2"), (0.5, 1, "L/2")]],
         checks=[("M_max = FL/8", 1 / 8, Solution.m_max),
                 ("M_midt = FL/8", 1 / 8, lambda s: s.m_at(0.5)),
                 ("d_max = FL^3/192EI", 1 / 192, Solution.d_max)]),
    dict(name="innspent-punktlast-vilkarleg", title="Fast innspent bjelke, punktlast på vilkårleg plass",
         supports=FF, bcs=FF_BC, point_loads=[A],
         forces=[(A, -1), (0, B * B * (3 * A + B)), (1, A * A * (A + 3 * B))],
         couples=[(0, -A * B * B)], m_end=-A * A * B,
         dims=[[(0, A, "a"), (A, 1, "b")], DIM_L],
         checks=[("M_A = Fab^2/L^2", A * B * B, lambda s: -s.m_at(0)),
                 ("M_B = Fa^2b/L^2", A * A * B, lambda s: -s.m_at(1)),
                 ("M_F = 2Fa^2b^2/L^3", 2 * A * A * B * B, lambda s: s.m_at(A)),
                 ("d_F = Fa^3b^3/3EIL^3", A ** 3 * B ** 3 / 3, lambda s: s.d_at(A)),
                 ("d_max = 2Fa^3b^2/(3EI(3a+b)^2)", 2 * A ** 3 * B ** 2 / (3 * (3 * A + B) ** 2), Solution.d_max),
                 ("x(d_max) = 2aL/(3a+b)", 2 * A / (3 * A + B), Solution.x_dmax)]),
    dict(name="innspent-jamt-fordelt", title="Fast innspent bjelke, jamt fordelt last",
         supports=FF, bcs=FF_BC, dist=(0, 1, 1, 1, "q"),
         forces=[(0, 1 / 2), (1, 1 / 2)], couples=[(0, -1 / 12)], m_end=-1 / 12, dims=[DIM_L],
         checks=[("M_max = qL^2/12", 1 / 12, Solution.m_max),
                 ("M_midt = qL^2/24", 1 / 24, lambda s: s.m_at(0.5)),
                 ("d_max = qL^4/384EI", 1 / 384, Solution.d_max)]),

    # ── Innspent i A, fritt opplagt i B ──
    dict(name="innspent-opplagt-punktlast-midt", title="Innspent i A og fritt opplagt i B, punktlast i midten",
         supports=FP, bcs=FP_BC, point_loads=[0.5],
         forces=[(0.5, -1), (0, 11 / 16), (1, 5 / 16)], couples=[(0, -3 / 16)],
         dims=[[(0, 0.5, "L/2"), (0.5, 1, "L/2")]],
         checks=[("M_A = 3FL/16", 3 / 16, Solution.m_max),
                 ("M_F = 5FL/32", 5 / 32, lambda s: s.m_at(0.5)),
                 ("d_max = FL^3/(48*sqrt5*EI)", 1 / (48 * R5), Solution.d_max),
                 ("x(d_max) = 0.447L frå B", 1 - 1 / R5, Solution.x_dmax)]),
    dict(name="innspent-opplagt-jamt-fordelt", title="Innspent i A og fritt opplagt i B, jamt fordelt last",
         supports=FP, bcs=FP_BC, dist=(0, 1, 1, 1, "q"),
         forces=[(0, 5 / 8), (1, 3 / 8)], couples=[(0, -1 / 8)], dims=[DIM_L],
         checks=[("M_A = qL^2/8", 1 / 8, Solution.m_max),
                 ("M_felt = 9qL^2/128", 9 / 128, lambda s: max(s.M)),
                 ("x(M_felt) = 3L/8 frå B", 1 - 3 / 8, lambda s: s.xs[s.M.index(max(s.M))]),
                 ("d_max = qL^4/185EI", 1 / 185, Solution.d_max, 3e-3),
                 ("x(d_max) = 0.422L frå B", 1 - 0.422, Solution.x_dmax, 2e-3)]),

    # ── Overheng ──
    dict(name="overheng-punktlast-ende", title="Fritt opplagt bjelke med overheng, punktlast i enden",
         length=1 + AO, supports=SS, bcs=SS_BC, point_loads=[1 + AO],
         forces=[(1 + AO, -1), (0, -AO), (1, 1 + AO)],
         dims=[[(0, 1, "L"), (1, 1 + AO, "a")]],
         checks=[("M_max = Fa", AO, Solution.m_max),
                 ("d_ende = Fa^2(L+a)/3EI", AO ** 2 * (1 + AO) / 3, Solution.d_max),
                 ("d_opp = FaL^2/(9*sqrt3*EI)", AO / (9 * R3), Solution.up_max),
                 ("x(d_opp) = 0.577L", 1 / R3, lambda s: s.xs[s.y.index(max(s.y))])]),
]


# ── SVG drawing ───────────────────────────────────────────────────────────────

def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def line(x1, y1, x2, y2, color=GRAY, width=1.5, extra=""):
    return (f'<line x1="{f(x1)}" y1="{f(y1)}" x2="{f(x2)}" y2="{f(y2)}" '
            f'stroke="{color}" stroke-width="{width}"{extra}/>')


def head(x, y, dx, dy, size, color):
    """Filled arrowhead with its tip at (x, y), pointing along (dx, dy)."""
    n = math.hypot(dx, dy)
    dx, dy = dx / n, dy / n
    bx, by, w = x - dx * size, y - dy * size, size * 0.38
    pts = f"{f(x)},{f(y)} {f(bx - dy * w)},{f(by + dx * w)} {f(bx + dy * w)},{f(by - dx * w)}"
    return f'<polygon points="{pts}" fill="{color}"/>'


def arrow(x1, y1, x2, y2, color, width, size):
    n = math.hypot(x2 - x1, y2 - y1)
    dx, dy = (x2 - x1) / n, (y2 - y1) / n
    return line(x1, y1, x2 - dx * size, y2 - dy * size, color, width) + head(x2, y2, dx, dy, size, color)


def text(x, y, label, color=GRAY, anchor="start"):
    """Label with optional subscript: 'q_0' → q with a lowered 0."""
    main, _, sub = label.partition("_")
    if sub:
        main += f'<tspan dy="4" font-size="10">{sub}</tspan>'
    return f'<text x="{f(x)}" y="{f(y)}" fill="{color}" text-anchor="{anchor}">{main}</text>'


def draw(case, sol):
    length = case.get("length", 1.0)
    px = lambda x: X0 + x / length * (X1 - X0)
    rows = case["dims"]
    height = YB + 46 + 24 * (len(rows) - 1) + 10
    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {height}" '
        f'font-family="Roboto Mono, monospace" font-size="14">',
        f'  <!-- {case["title"]}. Stipla blå linje = nedbøyingsform (overdriven). -->',
        '  <!-- Generert av app/beam_diagrams.py — ikkje rediger for hand. -->',
    ]
    add = lambda s: out.append("  " + s)
    top = YB - 3                                   # top surface of the beam

    # Distributed load
    dist = case.get("dist")
    if dist:
        x1, x2, q1, q2, label = dist
        qmax = max(q1, q2)
        ya, yb = top - 30 * q1 / qmax, top - 30 * q2 / qmax
        add(f'<polygon points="{f(px(x1))},{top} {f(px(x1))},{f(ya)} {f(px(x2))},{f(yb)} {f(px(x2))},{top}" '
            f'fill="{LOAD}" fill-opacity="0.12"/>')
        add(line(px(x1), ya, px(x2), yb, LOAD, 1.5))
        steps = 10
        for i in range(steps + 1):
            x = px(x1) + (px(x2) - px(x1)) * i / steps
            y = ya + (yb - ya) * i / steps
            if top - y >= 9:
                add(arrow(x, y, x, top - 1, LOAD, 1.2, 5))
        if q1 == q2:
            add(text((px(x1) + px(x2)) / 2, top - 36, label, LOAD, "middle"))
        elif q2 > q1:
            add(text(px(x2) - 2, top - 43, label, LOAD, "end"))
        else:
            add(text(px(x1) + 4, top - 43, label, LOAD, "start"))

    # Deflection curve (true shape from the solver, scaled)
    ymax = max(abs(v) for v in sol.y)
    pts = " ".join(f"{f(px(sol.xs[i]))},{f(YB - sol.y[i] / ymax * DEFL_PX)}" for i in range(0, N + 1, 100))
    add(f'<polyline points="{pts}" fill="none" stroke="{DEFL}" stroke-width="1.5" stroke-dasharray="5 3"/>')

    # Supports
    for idx, (kind, xs) in enumerate(case["supports"]):
        x, name = px(xs), "AB"[idx]
        at_right_end = idx > 0 and abs(xs - length) < 1e-9
        side = 1 if at_right_end else -1           # which side the letter goes on
        anchor = "start" if side > 0 else "end"
        if kind == "fixed":
            add(line(x, YB - 24, x, YB + 24, GRAY, 2.5))
            for k in range(6):
                y = YB - 22 + 8 * k
                add(line(x, y, x + side * 8, y + 8, GRAY, 1))
            add(text(x + side * 14, YB + 5, name, GRAY, anchor))
        else:
            base = YB + (19 if kind == "pin" else 17)
            add(f'<polygon points="{f(x)},{YB + 3} {f(x - 9)},{base} {f(x + 9)},{base}" '
                f'fill="{GRAY}" fill-opacity="0.15" stroke="{GRAY}" stroke-width="1.5"/>')
            if kind == "pin":                      # hatched ground = held sideways
                add(line(x - 14, base, x + 14, base))
                for k in range(4):
                    add(line(x - 9 + 8 * k, base, x - 13 + 8 * k, base + 6, GRAY, 1))
            else:                                  # rollers = free to move sideways
                for dx in (-5, 5):
                    add(f'<circle cx="{f(x + dx)}" cy="{YB + 20}" r="2.5" fill="none" stroke="{GRAY}" stroke-width="1.2"/>')
                add(line(x - 14, YB + 23.5, x + 14, YB + 23.5))
            add(text(x + side * 18, YB + 16, name, GRAY, anchor))

    # Beam
    add(line(X0, YB, X1, YB, GRAY, 6))

    # Point loads
    for xs in case.get("point_loads", []):
        add(arrow(px(xs), YB - 50, px(xs), top - 1, LOAD, 2, 9))
        add(text(px(xs) + 8, YB - 38, "F", LOAD))

    # End moment
    if case.get("moment"):
        xs, sense = case["moment"]
        cx, r = px(xs), 17
        pt = lambda deg: (cx + r * math.cos(math.radians(deg)), YB - r * math.sin(math.radians(deg)))
        start, end = (-25, 150) if sense == "ccw" else (150, -25)
        (sx, sy), (ex, ey) = pt(start), pt(end)
        add(f'<path d="M{f(sx)},{f(sy)} A{r},{r} 0 0 {0 if sense == "ccw" else 1} {f(ex)},{f(ey)}" '
            f'fill="none" stroke="{LOAD}" stroke-width="2"/>')
        rad, sgn = math.radians(end), (1 if sense == "ccw" else -1)
        tx, ty = -math.sin(rad) * sgn, -math.cos(rad) * sgn     # tangent at the arc end
        add(head(ex + tx * 6, ey + ty * 6, tx, ty, 9, LOAD))
        add(text(cx + 14, YB - 22, "M_0", LOAD))

    # Dimension lines
    for r, row in enumerate(rows):
        y = YB + 46 + 24 * r
        for xa, xb, label in row:
            a, b = px(xa), px(xb)
            add(line(a + 6, y, b - 6, y, GRAY, 1.2))
            add(head(a, y, -1, 0, 7, GRAY) + head(b, y, 1, 0, 7, GRAY))
            add(line(a, y - 6, a, y + 6, GRAY, 1) + line(b, y - 6, b, y + 6, GRAY, 1))
            add(text((a + b) / 2, y - 6, label, GRAY, "middle"))

    out.append("</svg>")
    return "\n".join(out) + "\n"


# ── Runner ────────────────────────────────────────────────────────────────────

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    failed = 0
    for case in CASES:
        sol = Solution(case)
        print(case["name"])
        worst = max(abs(r) for r in sol.residuals)
        if worst > 1e-6:
            failed += 1
            print(f"  FAIL  support conditions / equilibrium, residual {worst:.2e}")
        for check in case["checks"]:
            label, expected, fn = check[:3]
            tol = check[3] if len(check) > 3 else 1e-3
            got = fn(sol)
            ok = abs(got - expected) <= tol * abs(expected)
            failed += not ok
            print(f"  {'OK  ' if ok else 'FAIL'}  {label}: formula {expected:.6g}, numeric {got:.6g}")
        path = OUT_DIR / f"bjelke-{case['name']}.svg"
        path.write_text(draw(case, sol), encoding="utf-8", newline="\n")
    print(f"\n{len(CASES)} diagrams written to {OUT_DIR}")
    if failed:
        print(f"{failed} check(s) FAILED")
        sys.exit(1)
    print("All formula checks passed")


if __name__ == "__main__":
    main()
