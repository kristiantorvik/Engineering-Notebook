---
title: Derivasjon – regler og strategier
summary: Vanlige derivasjonsregler, strategier for å gjenkjenne hvilken regel som passer, og oversikt over deriverte av kjente funksjoner.
tags:
  - Matematikk
  - Regneregler
type: notat
search_words: derivere, derivert, dy/dx, f', kjerneregel, produktregel, kvotientregel, chain rule, stigningstall, rate of change
updated: 2026-05-22
---

# Derivasjon

Den deriverte forteller **hvor raskt en størrelse endrer seg** når noe annet endrer seg. Geometrisk er det stigningstallet til tangenten i et punkt på grafen.

**Mekanisk intuisjon — alt vi gjør med tid og bevegelse er deriverte:**

- $v(t) = \dfrac{ds}{dt}$ &nbsp;&nbsp; hastighet = endring i posisjon per endring av tid
- $a(t) = \dfrac{dv}{dt} = \dfrac{d^2 s}{dt^2}$ &nbsp;&nbsp; akselerasjon = endring i hastighet per endring av tid
- $P = \dfrac{dW}{dt}$ &nbsp;&nbsp; effekt = endring i mengde arbeid per endring i tid
- $\dot{m} = \dfrac{dm}{dt}$ &nbsp;&nbsp; massestrøm = endring i masse per endring i tid
- $\sigma = E \cdot \varepsilon$, der $\varepsilon = \dfrac{dL}{L}$ &nbsp;&nbsp; tøyning = endring i lengde per lengde

## Notasjon

| Form | Eksempel | Brukes når |
| --- | --- | --- |
| Leibniz | $\dfrac{df}{dx}$ | Du vil framheve hva du deriverer mot. Lett å "regne med" som brøk (kjerneregel, separable ligninger). Lett å lese som endring i $f$ per endring i $x$|
| Lagrange | $f'(x)$ | Kort og enkelt, vanlig i ren matematikk. |
| Newton | $\dot{x}, \ddot{x}$ | Tidsderiverte i fysikk/mekanikk. |

---

## Grunnregler

### 1. Konstantregelen

$$\Large \dfrac{d}{dx}(c) = 0$$

En konstant endrer seg ikke — stigningstallet er null.

**Eksempel:** $\dfrac{d}{dx}(7) = 0$

---

### 2. Potensregelen

$$\Large \dfrac{d}{dx}(x^n) = n \cdot x^{n-1}$$

Hovedverktøyet for polynomer. "Ta eksponenten ned, trekk én fra."

**Eksempel:** $\dfrac{d}{dx}(x^3) = 3x^2$

---

### 3. Konstantfaktor

$$\Large \dfrac{d}{dx}(c \cdot f(x)) = c \cdot f'(x)$$

Konstanter står utenfor og blir igjen.

**Eksempel:** $\dfrac{d}{dx}(5x^2) = 5 \left ( \cdot \dfrac{d}{dx}(x^2) \right ) = 10x$

---

### 4. Sum- og differanseregelen

$$\Large (f \pm g)' = f' \pm g'$$

Deriver hvert ledd for seg.

**Eksempel:** $\dfrac{d}{dx}(x^3 + 2x - 4) \, \, \, = \, \, \, \dfrac{d}{dx}(x^3) + \dfrac{d}{dx}(2x) - \dfrac{d}{dx}(4) \, \, \, = \, \, \, 3x^2 + 2$

---

### 5. Produktregelen

$$\Large (f \cdot g)' = f' \cdot g + f \cdot g'$$

Brukes når to funksjoner ganges sammen og ingen er en ren konstant.

**Eksempel:** $\dfrac{d}{dx}(x^2 \cdot \sin x) \, \, \, = \, \, \, \sin x \cdot \left ( \dfrac{d}{dx}(x^2) \right )   +   x^2 \cdot \left ( \dfrac{d}{dx}(\sin x) \right ) \, \, \, = \, \, \, 2x \sin x + x^2 \cos x$

---

### 6. Kvotientregelen

$$\Large \left( \dfrac{f}{g} \right)' = \dfrac{f' \cdot g - f \cdot g'}{g^2}$$

$\,$

**Eksempel:** $\dfrac{d}{dx}\left(\dfrac{x^2}{\cos x}\right) = \dfrac{2x \cos x + x^2 \sin x}{\cos^2 x}$

> **Tips:** Ofte enklere å skrive om til produkt: $\dfrac{f}{g} = f \cdot g^{-1}$, og bruke produkt- + kjerneregel. Færre fortegnsfeil.

---

### 7. Kjerneregelen (chain rule)

$$\Large \dfrac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x)$$

Den viktigste regelen i praksis. Brukes når **funksjon ligger inni funksjon**.

"Deriver det ytre med det indre som argument, gang med deriverte av det indre."

**Eksempel:** $\dfrac{d}{dx} \sin(3x^2) = \cos(3x^2) \cdot 6x$

---

## Vanlige deriverte — oppslagstabell

### Algebraiske

| $f(x)$ | $f'(x)$ |
| --- | --- |
| $c$ | $0$ |
| $x$ | $1$ |
| $x^n$ | $n \cdot x^{n-1}$ |
| $\sqrt{x}$ | $\dfrac{1}{2\sqrt{x}}$ |
| $\dfrac{1}{x}$ | $-\dfrac{1}{x^2}$ |
| $\dfrac{1}{x^n}$ | $-\dfrac{n}{x^{n+1}}$ |

### Eksponential og logaritme

| $f(x)$ | $f'(x)$ |
| --- | --- |
| $e^x$ | $e^x$ |
| $e^{kx}$ | $k \cdot e^{kx}$ |
| $a^x$ | $a^x \cdot \ln a$ |
| $\ln x$ | $\dfrac{1}{x}$ |
| $\ln \lvert x \rvert$ | $\dfrac{1}{x}$ |
| $\log_a x$ | $\dfrac{1}{x \cdot \ln a}$ |

### Trigonometriske

| $f(x)$ | $f'(x)$ |
| --- | --- |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x = 1 + \tan^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x \cdot \tan x$ |
| $\csc x$ | $-\csc x \cdot \cot x$ |

### Inverse trigonometriske

| $f(x)$ | $f'(x)$ |
| --- | --- |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$ |
| $\text{arccot}\, x$ | $-\dfrac{1}{1+x^2}$ |

### Hyperbolske

| $f(x)$ | $f'(x)$ |
| --- | --- |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\text{sech}^2 x = 1 - \tanh^2 x$ |

---

## For copy/paste

**Markdown / LaTeX:**

```Markdown
$$
\dfrac{d}{dx}(c) = 0
$$

$$
\dfrac{d}{dx}(x^n) = n \cdot x^{n-1}
$$

$$
\dfrac{d}{dx}(c \cdot f(x)) = c \cdot f'(x)
$$

$$
(f \pm g)' = f' \pm g'
$$

$$
(f \cdot g)' = f' \cdot g + f \cdot g'
$$

$$
\left( \dfrac{f}{g} \right)' = \dfrac{f' \cdot g - f \cdot g'}{g^2}
$$

$$
\dfrac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x)
$$

$$
\dfrac{dy}{dx} = \dfrac{dy}{du} \cdot \dfrac{du}{dx}
$$
```

**Vanlige deriverte:**

```Markdown
$\dfrac{d}{dx}(x^n) = n x^{n-1}$
$\dfrac{d}{dx}\sqrt{x} = \dfrac{1}{2\sqrt{x}}$
$\dfrac{d}{dx}\dfrac{1}{x} = -\dfrac{1}{x^2}$

$\dfrac{d}{dx}e^x = e^x$
$\dfrac{d}{dx}e^{kx} = k e^{kx}$
$\dfrac{d}{dx}a^x = a^x \ln a$
$\dfrac{d}{dx}\ln x = \dfrac{1}{x}$
$\dfrac{d}{dx}\log_a x = \dfrac{1}{x \ln a}$

$\dfrac{d}{dx}\sin x = \cos x$
$\dfrac{d}{dx}\cos x = -\sin x$
$\dfrac{d}{dx}\tan x = \sec^2 x = 1 + \tan^2 x$
$\dfrac{d}{dx}\cot x = -\csc^2 x$
$\dfrac{d}{dx}\sec x = \sec x \tan x$
$\dfrac{d}{dx}\csc x = -\csc x \cot x$

$\dfrac{d}{dx}\arcsin x = \dfrac{1}{\sqrt{1-x^2}}$
$\dfrac{d}{dx}\arccos x = -\dfrac{1}{\sqrt{1-x^2}}$
$\dfrac{d}{dx}\arctan x = \dfrac{1}{1+x^2}$

$\dfrac{d}{dx}\sinh x = \cosh x$
$\dfrac{d}{dx}\cosh x = \sinh x$
$\dfrac{d}{dx}\tanh x = 1 - \tanh^2 x$
```
