---
title: Kinetisk energi
summary: Energi knyttet til bevegelse — for translasjon, ren rotasjon og generell plan bevegelse
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Energi
type: formel
aliases:
search_words: kinetisk energi, bevegelsesenergi, rotasjon, translasjon, plan bevegelse, treghetsmoment, energibevaring
updated: 2026-05-26
---

# Kinetisk energi

Energien et legeme har på grunn av bevegelse. Tre vanlige former — translasjon, ren rotasjon om fast akse, og generell plan bevegelse — har samme grunnstruktur: $\tfrac{1}{2} \cdot \text{"treghet"} \cdot \text{"hastighet"}^2$.

---

## Formel

### Translasjon (punktmasse eller legeme uten rotasjon)

$$
T = \tfrac{1}{2} m v^2
$$

### Ren rotasjon om fast akse

$$
T = \tfrac{1}{2} I_O \omega^2
$$

### Generell plan bevegelse (translasjon + rotasjon)

$$
T = \tfrac{1}{2} m \bar v^2 + \tfrac{1}{2} \bar I \omega^2
$$

---

## Variabler

$T =$ Kinetisk energi [$J$]
$m =$ Masse [$kg$]
$v =$ Fart (for punktmasse / ren translasjon) [$m/s$]
$\bar v =$ Fart til massesenteret $G$ [$m/s$]
$\omega =$ Vinkelhastighet [$rad/s$]
$I_O =$ Massetreghetsmoment om den faste rotasjonsaksen $O$ [$kg \cdot m^2$]
$\bar I =$ Massetreghetsmoment om akse gjennom massesenteret $G$ [$kg \cdot m^2$]

---

## Enheter og antagelser

- SI: $J = N \cdot m = kg \cdot m^2 / s^2$.
- Vinkelhastighet må være i $rad/s$ (ikke grader eller rpm). Konvertering: $\omega = \pi N / 30$, der $N$ er rpm.
- Steiners sats kobler $I_O$ og $\bar I$: $I_O = \bar I + m \bar r^2$, der $\bar r$ er avstanden mellom rotasjonsaksen og massesenteret. Se [Treghetsmoment](../notes/treghetsmoment-motstandsmoment.md).
- Generell plan bevegelse: massesenteret beveger seg med $\bar v$, samtidig som kroppen roterer med $\omega$. Eksempler: hjul som ruller, kasse som tipper.
- For **ren rulling uten glidning** gjelder $\bar v = r \omega$, slik at de to leddene kan samles til $T = \tfrac{1}{2}(m + \bar I/r^2) \bar v^2$.

---

## Sammenheng — arbeid og energi

Arbeidet utført av netto kraft og moment på legemet er lik endring i kinetisk energi:

$$
U_{1\to 2} = T_2 - T_1
$$

Når kun konservative krefter virker (tyngd, fjær, gravitasjon), er total mekanisk energi bevart:

$$
T_1 + V_1 = T_2 + V_2
$$

Se [Potensiell energi](potensiell-energi.md).

---

## Eksempel — rullende hjul

Et solid hjul ($m = 10 \ kg$, $r = 0{,}3 \ m$) ruller uten å gli med $\bar v = 4 \ m/s$. Hva er total kinetisk energi?

Massetreghetsmoment for solid sylinder om symmetriaksen:
$\bar I = \tfrac{1}{2} m r^2 = \tfrac{1}{2} \cdot 10 \cdot 0{,}3^2 = 0{,}45 \ kg \cdot m^2$

Ren rulling gir $\omega = \bar v / r = 4 / 0{,}3 \approx 13{,}33 \ rad/s$.

$T = \tfrac{1}{2} m \bar v^2 + \tfrac{1}{2} \bar I \omega^2$
$T = \tfrac{1}{2} \cdot 10 \cdot 4^2 + \tfrac{1}{2} \cdot 0{,}45 \cdot 13{,}33^2$
$T = 80 \ J + 40 \ J = 120 \ J$

Av den totale energien ligger 80 J i translasjon og 40 J i rotasjon — for en solid sylinder utgjør rotasjonsleddet altså $1/3$ av totalen.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
T = \tfrac{1}{2} m v^2
$$

$$
T = \tfrac{1}{2} I_O \omega^2
$$

$$
T = \tfrac{1}{2} m \bar v^2 + \tfrac{1}{2} \bar I \omega^2
$$
```

---

## Relatert
- [Potensiell energi](potensiell-energi.md)
- [Treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md)
- [Newtons andre lov](newtons-andre-lov.md)
- [Bevegelseslikninger ved konstant akselerasjon](konstant-akselerasjon.md)
