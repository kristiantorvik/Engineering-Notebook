---
title: Integrasjon – regler og strategier
summary: Vanlige integrasjonsregler, strategier (substitusjon, delvis integrasjon, delbrøk), og oversikt over integraler av kjente funksjoner.
tags:
  - Matematikk
  - Integrasjon
  - Regneregler
type: notat
search_words: integrere, integral, antiderivert, substitusjon, delvis integrasjon, delbrøk, integration by parts, u-substitution, antiderivative, areal under graf
updated: 2026-05-22
---

# Integrasjon

Integrasjon er **det motsatte av derivasjon** og kan tolkes på to måter — begge er nyttige:

1. **Antiderivert:** Finn en funksjon $F(x)$ slik at $F'(x) = f(x)$.
2. **Akkumulasjon / areal:** Summer opp uendelig mange uendelig små bidrag $f(x) \cdot dx$ — det blir arealet under grafen.

**Mekanisk intuisjon — integrasjon er akkumulasjon over tid eller rom:**

- $s(t) = \displaystyle\int v(t)\, dt$ &nbsp;&nbsp; posisjon = akkumulert hastighet
- $W = \displaystyle\int F\, dx$ &nbsp;&nbsp; arbeid = kraft akkumulert over strekning
- $J = \displaystyle\int F\, dt$ &nbsp;&nbsp; impuls = kraft akkumulert over tid
- $Q = \displaystyle\int \dot{m}\, dt$ &nbsp;&nbsp; volum/masse = strøm akkumulert
- $I = \displaystyle\int r^2\, dm$ &nbsp;&nbsp; treghetsmoment = avstand² akkumulert med masse

## Notasjon — ubestemt vs. bestemt integral

**Ubestemt integral** (gir en familie av funksjoner):

$$\Large \int f(x)\, dx = F(x) + C$$

Pluss-konstanten $C$ er fordi alle funksjoner som skiller seg fra $F$ med en konstant har samme deriverte.

**Bestemt integral** (gir et tall — netto akkumulasjon mellom $a$ og $b$):

$$\Large \int_a^b f(x)\, dx = F(b) - F(a)$$

Dette er **fundamentalsetningen i kalkulus** — bro mellom derivasjon og integrasjon.

> Tegn til høyre for $f$ teller positivt areal (over $x$-aksen), under aksen teller negativt.

---

## Grunnregler

### 1. Konstantregelen

$$\Large \int c\, dx = c \cdot x + C$$

**Eksempel:** $\int 7\, dx = 7x + C$

---

### 2. Potensregelen

$$\Large \int x^n\, dx = \dfrac{x^{n+1}}{n+1} + C, \quad n \neq -1$$

"Legg én til eksponenten, del på den nye eksponenten."

**Eksempel:** $\int x^3\, dx = \dfrac{x^4}{4} + C$

**Mekanisk:** Konstant hastighet $v$ gir posisjon $s = v \cdot t$ — det er $\int v\, dt$. Konstant akselerasjon $a$ gir hastighet $v = a \cdot t$, og posisjon $s = \tfrac{1}{2} a t^2$ — det er potensregelen brukt to ganger.

---

### 3. Spesialtilfellet $n = -1$

$$\Large \int \dfrac{1}{x}\, dx = \ln|x| + C$$

Potensregelen virker ikke her (du ville fått divisjon på null). Logaritmen dukker opp av naturen.

---

### 4. Konstantfaktorregelen

$$\Large \int c \cdot f(x)\, dx = c \cdot \int f(x)\, dx$$

**Eksempel:** $\int 5x^2\, dx = 5 \cdot \dfrac{x^3}{3} = \dfrac{5x^3}{3} + C$

---

### 5. Sum- og differanseregelen

$$\Large \int (f \pm g)\, dx = \int f\, dx \pm \int g\, dx$$

**Eksempel:** $\int (3x^2 + 2x - 1)\, dx = x^3 + x^2 - x + C$

> Det finnes **ingen** produktregel eller kvotientregel for integraler — det er grunnen til at integrasjon er vanskeligere enn derivasjon. Istedenfor bruker vi strategiene under.

---

## Strategier

### Strategi 1 — Substitusjon (omvendt kjerneregel)

Brukes når integranden inneholder en funksjon **og dens deriverte** (gjerne forkledd som en konstantfaktor).

$$\Large \int f(g(x)) \cdot g'(x)\, dx = \int f(u)\, du, \quad u = g(x)$$

**Framgangsmåte:**

1. Sett $u =$ den "innerste" funksjonen.
2. Regn ut $du = g'(x)\, dx$.
3. Bytt alt med $u$ og $du$.
4. Integrer i $u$, bytt tilbake til $x$.

**Eksempel:** $\int 2x \cdot \cos(x^2)\, dx$

La $u = x^2 \Rightarrow du = 2x\, dx$.

$$\int \cos(u)\, du = \sin(u) + C = \sin(x^2) + C$$

**Mekanisk parallell:** Substitusjon er som å bytte koordinatsystem til ett der problemet er trivielt. Helt analogt med å regne et trykkfall i $\Delta P$ istedenfor å holde styr på $P_1$ og $P_2$ separat.

---

### Strategi 2 — Delvis integrasjon (omvendt produktregel)

$$\Large \int u\, dv = u \cdot v - \int v\, du$$

Brukes når integranden er et **produkt av to ulike funksjonstyper** (typisk polynom × eksponential, polynom × trig, polynom × logaritme).

**Valg av $u$ — LIATE-regel** (velg $u$ etter denne rangeringen, øverst først):

| L | **L**ogaritme |
| I | **I**nverse trig (arcsin, arctan ...) |
| A | **A**lgebraisk (polynom) |
| T | **T**rig (sin, cos) |
| E | **E**ksponential ($e^x$) |

**Eksempel:** $\int x \cdot e^x\, dx$

LIATE: polynom > eksponential ⇒ $u = x$, $dv = e^x dx$. Da blir $du = dx$ og $v = e^x$.

$$\int x e^x\, dx = x \cdot e^x - \int e^x\, dx = x e^x - e^x + C = (x-1)e^x + C$$

**Tommelfinger:** Velg $u$ slik at $du$ blir **enklere** enn $u$, og $dv$ slik at du **kan integrere** det.

---

### Strategi 3 — Delbrøkoppspaltning

Når integranden er en **rasjonal funksjon** $\dfrac{P(x)}{Q(x)}$ der nevneren kan faktoriseres. Del opp i enklere brøker du kan integrere hver for seg.

**Eksempel:** $\displaystyle\int \dfrac{1}{x^2 - 1}\, dx$

Faktoriser nevneren: $x^2 - 1 = (x-1)(x+1)$. Sett

$$\dfrac{1}{(x-1)(x+1)} = \dfrac{A}{x-1} + \dfrac{B}{x+1}$$

Multipliser opp og løs: $A = \tfrac{1}{2}, B = -\tfrac{1}{2}$.

$$\int \dfrac{1}{x^2-1}\, dx = \tfrac{1}{2}\ln|x-1| - \tfrac{1}{2}\ln|x+1| + C$$

---

### Strategi 4 — Trigonometriske identiteter

Når integranden inneholder $\sin^2, \cos^2, \sin \cdot \cos$ osv. — skriv om med identitetene først.

**Nyttige omskrivinger:**

$$\sin^2 x = \dfrac{1 - \cos(2x)}{2}, \quad \cos^2 x = \dfrac{1 + \cos(2x)}{2}$$

$$\sin x \cos x = \dfrac{\sin(2x)}{2}$$

**Eksempel:** $\int \sin^2 x\, dx = \int \dfrac{1 - \cos(2x)}{2}\, dx = \dfrac{x}{2} - \dfrac{\sin(2x)}{4} + C$

---

### Strategi 5 — Symmetri

Sjekk om integranden er **odd** eller **even** rundt symmetripunktet i intervallet — kan ofte spare hele jobben.

- $f(x)$ odd ($f(-x) = -f(x)$) og symmetrisk intervall $[-a, a]$ ⇒ $\displaystyle\int_{-a}^{a} f(x)\, dx = 0$
- $f(x)$ even ($f(-x) = f(x)$) og symmetrisk intervall ⇒ $\displaystyle\int_{-a}^{a} f(x)\, dx = 2\displaystyle\int_{0}^{a} f(x)\, dx$

**Eksempel:** $\displaystyle\int_{-\pi}^{\pi} \sin x \cdot x^2\, dx = 0$ (odd × even = odd)

---

### Strategi 6 — Tabelloppslag

Mange "standard" integraler finner du i tabellen lengst nede. Sjekk der før du investerer i delvis integrasjon.

---

## Strategi — hvilken framgang når?

1. **Kan du skrive integranden om så den blir et standardform-oppslag?** Gjør det først.
2. **Sum av enkle ledd?** Bryt opp, integrer hvert for seg.
3. **Konstant foran?** Sett utenfor.
4. **Ser du en funksjon og dens deriverte (på faktor-form)?** Substitusjon.
5. **Produkt av ulike funksjonstyper?** Delvis integrasjon (LIATE for valg av $u$).
6. **Rasjonal funksjon?** Delbrøkoppspaltning.
7. **Trigonometrisk uttrykk med kvadrater eller produkt?** Identitetsomskriving.
8. **Symmetrisk intervall?** Sjekk odd/even — kan gi 0 eller halverer jobben.

---

## Vanlige integraler — oppslagstabell

Alle ubestemte integraler har implisitt $+ C$.

### Algebraiske

| $f(x)$ | $\int f(x)\, dx$ |
| --- | --- |
| $c$ | $c \cdot x$ |
| $x^n$ &nbsp; $(n \neq -1)$ | $\dfrac{x^{n+1}}{n+1}$ |
| $\dfrac{1}{x}$ | $\ln\lvert x \rvert$ |
| $\sqrt{x}$ | $\dfrac{2}{3} x^{3/2}$ |
| $\dfrac{1}{\sqrt{x}}$ | $2\sqrt{x}$ |

### Eksponential og logaritme

| $f(x)$ | $\int f(x)\, dx$ |
| --- | --- |
| $e^x$ | $e^x$ |
| $e^{kx}$ | $\dfrac{1}{k} e^{kx}$ |
| $a^x$ | $\dfrac{a^x}{\ln a}$ |
| $\ln x$ | $x \ln x - x$ |

### Trigonometriske

| $f(x)$ | $\int f(x)\, dx$ |
| --- | --- |
| $\sin x$ | $-\cos x$ |
| $\cos x$ | $\sin x$ |
| $\tan x$ | $-\ln\lvert \cos x \rvert = \ln\lvert \sec x \rvert$ |
| $\cot x$ | $\ln\lvert \sin x \rvert$ |
| $\sec x$ | $\ln\lvert \sec x + \tan x \rvert$ |
| $\csc x$ | $-\ln\lvert \csc x + \cot x \rvert$ |
| $\sec^2 x$ | $\tan x$ |
| $\csc^2 x$ | $-\cot x$ |
| $\sec x \tan x$ | $\sec x$ |
| $\csc x \cot x$ | $-\csc x$ |
| $\sin^2 x$ | $\dfrac{x}{2} - \dfrac{\sin(2x)}{4}$ |
| $\cos^2 x$ | $\dfrac{x}{2} + \dfrac{\sin(2x)}{4}$ |

### Som gir invers-trig

| $f(x)$ | $\int f(x)\, dx$ |
| --- | --- |
| $\dfrac{1}{\sqrt{1-x^2}}$ | $\arcsin x$ |
| $\dfrac{1}{1+x^2}$ | $\arctan x$ |
| $\dfrac{1}{\sqrt{a^2-x^2}}$ | $\arcsin\!\left(\dfrac{x}{a}\right)$ |
| $\dfrac{1}{a^2+x^2}$ | $\dfrac{1}{a} \arctan\!\left(\dfrac{x}{a}\right)$ |
| $\dfrac{1}{x \sqrt{x^2-1}}$ | $\text{arcsec}\,\lvert x \rvert$ |

### Hyperbolske

| $f(x)$ | $\int f(x)\, dx$ |
| --- | --- |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |
| $\tanh x$ | $\ln \cosh x$ |

---

## For copy/paste

**Markdown / LaTeX:**

```Markdown
$$
\int f(x)\, dx = F(x) + C
$$

$$
\int_a^b f(x)\, dx = F(b) - F(a)
$$

$$
\int c\, dx = c x + C
$$

$$
\int x^n\, dx = \dfrac{x^{n+1}}{n+1} + C, \quad n \neq -1
$$

$$
\int \dfrac{1}{x}\, dx = \ln|x| + C
$$

$$
\int c \cdot f(x)\, dx = c \int f(x)\, dx
$$

$$
\int (f \pm g)\, dx = \int f\, dx \pm \int g\, dx
$$

$$
\int f(g(x)) \cdot g'(x)\, dx = \int f(u)\, du, \quad u = g(x)
$$

$$
\int u\, dv = u v - \int v\, du
$$
```

**Vanlige integraler (alle med $+ C$):**

```Markdown
$\int x^n dx = \dfrac{x^{n+1}}{n+1}, \quad n \neq -1$
$\int \dfrac{1}{x} dx = \ln|x|$
$\int \sqrt{x} dx = \dfrac{2}{3} x^{3/2}$
$\int \dfrac{1}{\sqrt{x}} dx = 2\sqrt{x}$

$\int e^x dx = e^x$
$\int e^{kx} dx = \dfrac{1}{k} e^{kx}$
$\int a^x dx = \dfrac{a^x}{\ln a}$
$\int \ln x \, dx = x \ln x - x$

$\int \sin x \, dx = -\cos x$
$\int \cos x \, dx = \sin x$
$\int \tan x \, dx = -\ln|\cos x|$
$\int \cot x \, dx = \ln|\sin x|$
$\int \sec x \, dx = \ln|\sec x + \tan x|$
$\int \csc x \, dx = -\ln|\csc x + \cot x|$
$\int \sec^2 x \, dx = \tan x$
$\int \csc^2 x \, dx = -\cot x$
$\int \sec x \tan x \, dx = \sec x$
$\int \csc x \cot x \, dx = -\csc x$
$\int \sin^2 x \, dx = \dfrac{x}{2} - \dfrac{\sin(2x)}{4}$
$\int \cos^2 x \, dx = \dfrac{x}{2} + \dfrac{\sin(2x)}{4}$

$\int \dfrac{1}{\sqrt{1-x^2}} dx = \arcsin x$
$\int \dfrac{1}{1+x^2} dx = \arctan x$
$\int \dfrac{1}{\sqrt{a^2-x^2}} dx = \arcsin\left(\dfrac{x}{a}\right)$
$\int \dfrac{1}{a^2+x^2} dx = \dfrac{1}{a}\arctan\left(\dfrac{x}{a}\right)$

$\int \sinh x \, dx = \cosh x$
$\int \cosh x \, dx = \sinh x$
$\int \tanh x \, dx = \ln \cosh x$
```
