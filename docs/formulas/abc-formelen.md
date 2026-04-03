---
title: ABC formelen
summary: Løser andregrads polynom
tags:
  - Matematikk
type: formel
aliases:
search_words: abc, andregrads, andre ordens, quadratic
updated: 2026-04-03
---

# ABC formelen
The quadratic equation

Løser ligniger på formen:

$\large ax^2 + bx + c = 0$

---

## Formel:

$$
\huge x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$

$\,$

$\,$

$\,$

$\,$



---

## For copy/paste



**Markdown / Latex:**
```Markdown
$$
x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}
$$
```

**Python:**
```python
import math

def solve_quadratic(a, b, c):
    """
    Solves ax^2 + bx + c = 0.
    Handles division-by-zero cases when a == 0.
    Returns the roots as a tuple or a message.
    """

    # Handle the case where a = 0 (not quadratic)
    if a == 0:
        if b == 0:
            if c == 0:
                return "Infinite solutions (0 = 0)"
            else:
                return "No solution"
        else:
            # Linear equation bx + c = 0
            return (-c / b,)

    # Compute discriminant
    discriminant = b**2 - 4*a*c

    if discriminant > 0:
        root1 = (-b + math.sqrt(discriminant)) / (2*a)
        root2 = (-b - math.sqrt(discriminant)) / (2*a)
        return (root1, root2)

    elif discriminant == 0:
        root = -b / (2*a)
        return (root,)

    else:
        # Complex roots
        real = -b / (2*a)
        imag = math.sqrt(-discriminant) / (2*a)
        return (complex(real, imag), complex(real, -imag))
```

**Eksempel på bruk**

```python
print(solve_quadratic(1, -3, 2))   # (2.0, 1.0)
print(solve_quadratic(1, 2, 1))    # (-1.0,)
print(solve_quadratic(0, 2, -4))   # (2.0,)
print(solve_quadratic(0, 0, 5))    # No solution
```