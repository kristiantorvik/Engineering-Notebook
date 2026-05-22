---
title: Partiell derivasjon – regler og strategier
summary: Partielle deriverte, regler, multivariabel kjerneregel, total differensial, gradient, og hvordan håndtere koblede variabler i dynamikk.
tags:
  - Matematikk
  - Derivasjon
  - Partielle deriverte
  - Regneregler
type: notat
search_words: partiell derivert, partial derivative, gradient, nabla, total differensial, multivariabel, multivariate, kjerneregel, koblede variabler, separabel, dynamikk
updated: 2026-05-22
---

# Partiell derivasjon

En **partiell derivert** er den deriverte av en funksjon av flere variabler **med hensyn på én av dem** — alle andre variabler behandles som konstanter.

Skrivemåten bruker det "krøllete" d-tegnet $\partial$ for å skille fra vanlig derivasjon.

$$\Large \dfrac{\partial f}{\partial x} \quad \text{eller} \quad f_x$$

**Mekanisk intuisjon — typisk når noe avhenger av flere størrelser samtidig:**

- Kinetisk energi: $E_k = \tfrac{1}{2} m v^2$ — avhenger av masse og hastighet
- Effekt: $P = F \cdot v$ — endring per kraft og per hastighet
- Spenning: $\sigma = \dfrac{F}{A}$ — endrer seg ulikt med kraft og tverrsnitt
- Gravitasjon: $F = G \dfrac{m_1 m_2}{r^2}$ — endrer seg på ulik måte med $r$ enn med massene
- Tilstandsfunksjoner i termodynamikk: $U = U(T, V) \Rightarrow \left(\dfrac{\partial U}{\partial T}\right)_V$ er endring i indre energi per grad ved konstant volum

## Notasjon

| Form | Eksempel |
| --- | --- |
| Leibniz | $\dfrac{\partial f}{\partial x}, \quad \dfrac{\partial^2 f}{\partial x \partial y}$ |
| Subskript | $f_x, \quad f_{xy}$ |
| Med fastholdte | $\left(\dfrac{\partial U}{\partial T}\right)_{V, N}$ — typisk i termodynamikk |

> Notasjonen $\left( \cdot \right)_V$ presiserer **hva som holdes konstant**. Det er ikke alltid åpenbart fra en formel alene, så det er god praksis å skrive det opp.

---

## Grunnprinsipp

Partiell derivasjon **bruker akkurat samme regler som vanlig derivasjon** — du later bare som om de andre variablene er rene tall.

**Eksempel:** Kinetisk energi $E_k(m, v) = \tfrac{1}{2} m v^2$

- $\dfrac{\partial E_k}{\partial m} = \tfrac{1}{2} v^2$ &nbsp;&nbsp; endring i energi per økning i masse (hastighet konstant)
- $\dfrac{\partial E_k}{\partial v} = m v$ &nbsp;&nbsp; endring i energi per økning i hastighet (masse konstant) — dette er nettopp momentum

---

## Regler — alle de samme som vanlig derivasjon

Erstatt $\dfrac{d}{dx}$ med $\dfrac{\partial}{\partial x}$. Alle reglene fra [derivasjonsnotatet](derivasjon.md) gjelder.

### Konstantregel, potensregel, sum, faktor

$$\dfrac{\partial}{\partial x}(c) = 0, \quad \dfrac{\partial}{\partial x}(x^n) = n x^{n-1}, \quad \dfrac{\partial}{\partial x}(c \cdot f) = c \cdot \dfrac{\partial f}{\partial x}$$

### Produktregelen

$$\Large \dfrac{\partial}{\partial x}(f \cdot g) = \dfrac{\partial f}{\partial x} \cdot g + f \cdot \dfrac{\partial g}{\partial x}$$

**Eksempel — effekt $P(F, v) = F \cdot v$** der både kraft og hastighet kan variere:

- $\dfrac{\partial P}{\partial F} = v$ &nbsp;&nbsp; (hastighet er konstant her)
- $\dfrac{\partial P}{\partial v} = F$ &nbsp;&nbsp; (kraft er konstant her)

Total endring i effekt: $dP = v\, dF + F\, dv$ — effekten øker enten ved å øke kraft (med hastigheten som "vekt") eller hastighet (med kraften som "vekt").

### Kvotientregelen

$$\dfrac{\partial}{\partial x}\left( \dfrac{f}{g} \right) = \dfrac{f_x \cdot g - f \cdot g_x}{g^2}$$

**Eksempel — spenning $\sigma = \dfrac{F}{A}$:**

- $\dfrac{\partial \sigma}{\partial F} = \dfrac{1}{A}$ &nbsp;&nbsp; spenningen vokser lineært med kraften
- $\dfrac{\partial \sigma}{\partial A} = -\dfrac{F}{A^2}$ &nbsp;&nbsp; spenningen synker når tverrsnittet øker, men ikke lineært

### Kjerneregelen (multivariabel)

Når $f$ avhenger av variabler som **selv er funksjoner** av en eller flere parametere, må du **summere bidraget** fra hver "kjede".

**Tilfelle 1 — én parameter:** $f(x, y)$ der $x = x(t), \, y = y(t)$

$$\Large \dfrac{df}{dt} = \dfrac{\partial f}{\partial x} \cdot \dfrac{dx}{dt} + \dfrac{\partial f}{\partial y} \cdot \dfrac{dy}{dt}$$

**Mekanisk eksempel — energibevaring faller direkte ut:**

Total mekanisk energi for en partikkel i et konservativt kraftfelt:

$$E(x, v) = \tfrac{1}{2} m v^2 + U(x)$$

Begge variablene avhenger av tid. Tidsendring:

$$\dfrac{dE}{dt} = \dfrac{\partial E}{\partial x} \cdot \dfrac{dx}{dt} + \dfrac{\partial E}{\partial v} \cdot \dfrac{dv}{dt} = U'(x) \cdot v + m v \cdot \dot{v}$$

Newtons andre lov sier $m \dot{v} = F = -U'(x)$. Sett det inn:

$$\dfrac{dE}{dt} = U'(x) v + v \cdot (-U'(x)) = 0$$

Energien er konstant — bevaring av mekanisk energi dukker rett ut av multivariabel kjerneregel.

**Tilfelle 2 — flere parametere:** $f(x, y)$ der $x = x(s, t), \, y = y(s, t)$

$$\dfrac{\partial f}{\partial s} = \dfrac{\partial f}{\partial x} \cdot \dfrac{\partial x}{\partial s} + \dfrac{\partial f}{\partial y} \cdot \dfrac{\partial y}{\partial s}$$

Brukes typisk ved koordinatbytte (kartesisk ↔ polar, sylindrisk osv.).

---

## Høyere ordens partielle deriverte

Du kan derivere flere ganger. Rekkefølgen vises i notasjonen:

$$f_{xx} = \dfrac{\partial^2 f}{\partial x^2}, \quad f_{yy} = \dfrac{\partial^2 f}{\partial y^2}, \quad f_{xy} = \dfrac{\partial^2 f}{\partial y \partial x}$$

**OBS — Leibniz-rekkefølge er omvendt subskript-rekkefølge:** $f_{xy} = \dfrac{\partial}{\partial y}\left( \dfrac{\partial f}{\partial x} \right)$. Først deriver mht. $x$, så mht. $y$.

**Eksempel — kinetisk energi $E_k = \tfrac{1}{2} m v^2$:**

- $E_{k, v} = m v$ — momentum
- $E_{k, vv} = m$ — masse (treghet — motstanden mot å endre hastighet)
- $E_{k, m} = \tfrac{1}{2} v^2$
- $E_{k, mv} = v$

---

## Total differensial

Beskriver hvordan $f$ endrer seg når **alle** variablene endrer seg samtidig.

$$\Large df = \dfrac{\partial f}{\partial x}\, dx + \dfrac{\partial f}{\partial y}\, dy + \dfrac{\partial f}{\partial z}\, dz + \cdots$$

**Mekanisk eksempel — feilforplantning for kinetisk energi:**

$E_k = \tfrac{1}{2} m v^2$ med usikkerhet i både $m$ og $v$:

$$dE_k = \tfrac{1}{2} v^2\, dm + m v\, dv$$

Relativ feil:

$$\dfrac{dE_k}{E_k} = \dfrac{dm}{m} + 2 \dfrac{dv}{v}$$

Hastighetsfeilen teller **dobbelt** — fordi $v$ er kvadrert. Det er typen innsikt du får gratis av total differensial.

**Andre bruksområder:**

- **Termodynamikk:** $dU = T\, dS - p\, dV$ — total endring i indre energi
- **Tilstandsfunksjoner:** Hvis $df$ kan skrives som over, er $f$ en tilstandsfunksjon — endringen avhenger bare av start og slutt, ikke veien

---

## Gradient og retningsderivert

Gradienten samler alle de partielle deriverte til en **vektor**:

$$\Large \nabla f = \left( \dfrac{\partial f}{\partial x}, \, \dfrac{\partial f}{\partial y}, \, \dfrac{\partial f}{\partial z} \right)$$

Gradienten peker i retningen $f$ **vokser raskest**, og lengden er den raskeste stigningen.

**Mekanisk eksempel — konservativ kraft fra potensial:**

$$\Large \vec{F} = -\nabla U$$

Krefter fra et potensial peker i retningen energien **synker** raskest (negativ gradient). En partikkel "ruller nedover" i potensialfeltet.

- Tyngdefelt: $U = m g h \Rightarrow \vec{F} = -m g \hat{h}$ (peker ned)
- Fjær: $U = \tfrac{1}{2} k x^2 \Rightarrow F = -k x$ (peker mot likevektet)
- Sentralfelt: $U(r) \Rightarrow \vec{F} = -\dfrac{dU}{dr} \hat{r}$

**Retningsderivert** — stigning langs en enhetsvektor $\hat{u}$:

$$D_{\hat{u}} f = \nabla f \cdot \hat{u}$$

---

## Koblede variabler — når akselerasjon avhenger av posisjon eller hastighet

I dynamikkproblemer er det vanlig at akselerasjonen avhenger av posisjon (fjær), hastighet (luftmotstand), eller begge. Du kan **ikke bare integrere** $a$ med hensyn på $t$, fordi $x$ og $v$ også er funksjoner av tid.

Triksen er å bruke kjerneregelen til å **bytte uavhengig variabel** slik at problemet blir separabelt.

### Definisjonene som utgangspunkt

$$v = \dfrac{dx}{dt}, \qquad a = \dfrac{dv}{dt}$$

Med kjerneregelen kan $a$ skrives om slik at det blir derivert mht. **posisjon** istedenfor tid:

$$\Large a = \dfrac{dv}{dt} = \dfrac{dv}{dx} \cdot \dfrac{dx}{dt} = v \cdot \dfrac{dv}{dx}$$

**Dimensjonscheck:** $\dfrac{dv}{dx}$ har enhet $\dfrac{\text{m/s}}{\text{m}} = \dfrac{1}{\text{s}}$ — endring i hastighet per meter. Ganger du med $v$ ($\text{m/s}$) får du $\text{m/s}^2$ — akselerasjon. Stemmer.

**Tolkning:** "Jeg endrer hastighet med så-og-så mye per meter, og jeg tilbakelegger så-og-så mange meter per sekund — produktet er hvor mye hastigheten endrer seg per sekund."

### Velg form etter hva som henger sammen

| Hva er $a$ avhengig av? | Bruk formen | Separer som |
| --- | --- | --- |
| Tid: $a = a(t)$ | $a = \dfrac{dv}{dt}$ | $dv = a(t)\, dt$ |
| Hastighet: $a = a(v)$ | $a = \dfrac{dv}{dt}$ | $\dfrac{dv}{a(v)} = dt$ |
| Posisjon: $a = a(x)$ | $a = v \dfrac{dv}{dx}$ | $v\, dv = a(x)\, dx$ |

### Eksempel — partikkel i fjær med tyngde

Akselerasjon (gitt): $a = g + 2x$, positiv $x$ nedover.

$a$ avhenger av $x$ ⇒ bruk $a = v \dfrac{dv}{dx}$:

$$v \dfrac{dv}{dx} = g + 2x$$

Multipliser begge sider med $dx$ slik at hver differensial havner på samme side som sin variabel:

$$v\, dv = (g + 2x)\, dx$$

Nå er venstre side bare en funksjon av $v$, høyre bare en funksjon av $x$. Integrer hver side med hensyn på sin variabel:

$$\int_{v_0}^{v} v\, dv = \int_{x_0}^{x} (g + 2x)\, dx$$

$$\dfrac{v^2 - v_0^2}{2} = g(x - x_0) + (x^2 - x_0^2)$$

Du har nå **hastighet som funksjon av posisjon**, $v(x)$. For å gå videre til $x(t)$ kan du bruke $v = \dfrac{dx}{dt}$ og en ny separasjon: $\dfrac{dx}{v(x)} = dt$.

### Eksempel — fritt fall med luftmotstand

Akselerasjon: $a = g - kv$ (luftmotstand proporsjonal med hastighet).

$a$ avhenger av $v$ ⇒ bruk $a = \dfrac{dv}{dt}$ direkte:

$$\dfrac{dv}{dt} = g - kv \quad \Rightarrow \quad \dfrac{dv}{g - kv} = dt$$

Integrer (med $v_0 = 0$):

$$v(t) = \dfrac{g}{k}\left(1 - e^{-kt}\right)$$

Hastigheten nærmer seg terminalverdien $\tfrac{g}{k}$ asymptotisk — det dukker direkte ut av separasjonen.

> **Hovedidé:** Når variablene er koblet, bytt uavhengig variabel slik at differensialene separeres. Velg form etter **hva $a$ faktisk avhenger av**, ikke etter vane.

---

## Strategi — hvilken regel når?

1. **Ren partiell?** Behandle alle andre variabler som konstanter, bruk vanlige derivasjonsregler.
2. **Variabler som selv avhenger av en parameter?** Multivariabel kjerneregel — summer over alle "veier".
3. **Trenger total endring av $f$?** Bruk total differensial.
4. **"Vekstretning" eller fluks?** Tenk gradient + retningsderivert. Kraft fra potensial: $\vec{F} = -\nabla U$.
5. **Akselerasjon koblet til posisjon eller hastighet?** Bruk $a = v \tfrac{dv}{dx}$ for å bytte uavhengig variabel og få et separabelt problem.

---

## Vanlige partielle deriverte — eksempler

| $f(x, y)$ | $f_x$ | $f_y$ |
| --- | --- | --- |
| $x + y$ | $1$ | $1$ |
| $x \cdot y$ | $y$ | $x$ |
| $x^2 + y^2$ | $2x$ | $2y$ |
| $x^n y^m$ | $n x^{n-1} y^m$ | $m x^n y^{m-1}$ |
| $\sin(xy)$ | $y \cos(xy)$ | $x \cos(xy)$ |
| $e^{xy}$ | $y \, e^{xy}$ | $x \, e^{xy}$ |
| $\ln(x^2 + y^2)$ | $\dfrac{2x}{x^2+y^2}$ | $\dfrac{2y}{x^2+y^2}$ |
| $\sqrt{x^2 + y^2}$ | $\dfrac{x}{\sqrt{x^2+y^2}}$ | $\dfrac{y}{\sqrt{x^2+y^2}}$ |
| $\arctan\!\left(\dfrac{y}{x}\right)$ | $-\dfrac{y}{x^2+y^2}$ | $\dfrac{x}{x^2+y^2}$ |

---

## For copy/paste

**Markdown / LaTeX:**

```Markdown
$$
\dfrac{\partial f}{\partial x}
$$

$$
\dfrac{\partial}{\partial x}(f \cdot g) = \dfrac{\partial f}{\partial x} \cdot g + f \cdot \dfrac{\partial g}{\partial x}
$$

$$
\dfrac{\partial}{\partial x}\left( \dfrac{f}{g} \right) = \dfrac{f_x \cdot g - f \cdot g_x}{g^2}
$$

$$
\dfrac{df}{dt} = \dfrac{\partial f}{\partial x} \cdot \dfrac{dx}{dt} + \dfrac{\partial f}{\partial y} \cdot \dfrac{dy}{dt}
$$

$$
\dfrac{\partial f}{\partial s} = \dfrac{\partial f}{\partial x} \cdot \dfrac{\partial x}{\partial s} + \dfrac{\partial f}{\partial y} \cdot \dfrac{\partial y}{\partial s}
$$

$$
df = \dfrac{\partial f}{\partial x}\, dx + \dfrac{\partial f}{\partial y}\, dy + \dfrac{\partial f}{\partial z}\, dz
$$

$$
\nabla f = \left( \dfrac{\partial f}{\partial x}, \, \dfrac{\partial f}{\partial y}, \, \dfrac{\partial f}{\partial z} \right)
$$

$$
D_{\hat{u}} f = \nabla f \cdot \hat{u}
$$

$$
\vec{F} = -\nabla U
$$
```

**Koblede variabler (kjerneregel-triks for dynamikk):**

```Markdown
$$
a = \dfrac{dv}{dt} = \dfrac{dv}{dx} \cdot \dfrac{dx}{dt} = v \cdot \dfrac{dv}{dx}
$$

$a = a(t) \quad \Rightarrow \quad dv = a(t)\, dt$

$a = a(v) \quad \Rightarrow \quad \dfrac{dv}{a(v)} = dt$

$a = a(x) \quad \Rightarrow \quad v\, dv = a(x)\, dx$
```

**Vanlige partielle (eksempler):**

```Markdown
$\dfrac{\partial}{\partial x}(x + y) = 1$
$\dfrac{\partial}{\partial x}(xy) = y$
$\dfrac{\partial}{\partial x}(x^n y^m) = n x^{n-1} y^m$
$\dfrac{\partial}{\partial x}\sin(xy) = y \cos(xy)$
$\dfrac{\partial}{\partial x}e^{xy} = y \, e^{xy}$
$\dfrac{\partial}{\partial x}\ln(x^2+y^2) = \dfrac{2x}{x^2+y^2}$
$\dfrac{\partial}{\partial x}\sqrt{x^2+y^2} = \dfrac{x}{\sqrt{x^2+y^2}}$
$\dfrac{\partial}{\partial x}\arctan\!\left(\dfrac{y}{x}\right) = -\dfrac{y}{x^2+y^2}$
```
