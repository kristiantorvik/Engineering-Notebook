---
title: Plan rørsle av stive legemer — krefter og akselerasjon
summary: Tre ligninger for plan rørsle av stive legemer — ΣF = mā for massesenteret pluss momentligning om G (eller fast akse O)
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Mekanikk
type: formel
aliases:
search_words: stive legemer, plan rørsle, plane motion, rigid body, Newton, moment, massesenter, treghetsmoment, rotasjon, rulling, Steiner, noncentroidal
updated: 2026-05-26
---

# Plan rørsle av stive legemer — krefter og akselerasjon

Newtons andre lov for stive legemer i plan rørsle. Forskjellen frå punktmasse-versjonen er at man trenger **tre** ligninger — to for translasjon av massesenteret og en for rotasjon om massesenteret.

---

## Formel

### Standardform (om massesenter G)

$$
\sum F_x = m \bar a_x
$$

$$
\sum F_y = m \bar a_y
$$

$$
\sum M_G = \bar I \alpha
$$

### Snarvei for rotasjon om fast akse O

Når kroppen roterer om en fast akse $O$ (lager, hengsel) kan momentligningen tas direkte om $O$:

$$
\sum M_O = I_O \alpha, \qquad I_O = \bar I + m \bar r^2 \ \text{(Steiner)}
$$

Da slipper man å rekne ut $\bar a$ for å bruke momentligningen.

---

## Variabler

$\sum F_x, \sum F_y =$ Summen av krefter i $x$- og $y$-retning [$N$]
$\sum M_G =$ Sum av momenter om massesenteret $G$ [$N \cdot m$]
$\sum M_O =$ Sum av momenter om en fast rotasjonsakse $O$ [$N \cdot m$]
$m =$ Total masse [$kg$]
$\bar a_x, \bar a_y =$ Akselerasjon til massesenteret [$m/s^2$]
$\bar I =$ Massetreghetsmoment om akse gjennom $G$ [$kg \cdot m^2$]
$I_O =$ Massetreghetsmoment om den faste aksen $O$ [$kg \cdot m^2$]
$\alpha =$ Vinkelakselerasjon [$rad/s^2$]
$\bar r =$ Avstand fra $G$ til den faste aksen $O$ [$m$]

---

## Enheter og antagelser

- SI-enheter: $N$, $kg$, $m$, $s$, $rad$.
- Gjelder i et **inertialsystem**.
- Plan rørsle betyr at all bevegelse skjer i ett plan, og rotasjonsaksen står vinkelrett på dette planet.
- Vinkelakselerasjon må være i $rad/s^2$.
- $\bar I$ er massetreghetsmomentet om en akse gjennom $G$, **vinkelrett på rørsleplanet**. Tabellverdier finnes i [Treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md).
- Positiv $\alpha$ og positiv $M$ defineres oftest mot urviser (matematisk positiv retning).

---

## Spesielle tilfelle

### Ren translasjon

Kroppen flytter seg uten å rotere ($\alpha = 0, \ \omega = 0$). Alle punkt har samme $\bar a$.

$$
\sum F_x = m \bar a_x, \quad \sum F_y = m \bar a_y, \quad \sum M_G = 0
$$

### Ren rotasjon om fast akse gjennom G

Massesenteret står stille ($\bar a = 0$). Bare momentligningen er aktiv:

$$
\sum M_G = \bar I \alpha
$$

### Ren rotasjon om fast akse O ≠ G (noncentroidal rotation)

Massesenteret går i sirkel rundt $O$. Akselerasjonen til $G$ har to komponenter:

$$
\bar a_t = \bar r \alpha, \qquad \bar a_n = \bar r \omega^2
$$

$\bar a_t$ peker tangentielt (i rotasjonsretningen), $\bar a_n$ peker frå $G$ mot $O$. Bruk gjerne snarveien $\sum M_O = I_O \alpha$.

### Rulling uten glidning

Når et hjul med radius $r$ ruller på et fast underlag uten å gli:

$$
\bar a = r \alpha
$$

(akselerasjonen til senteret henger sammen med vinkelakselerasjonen). Friksjon i kontaktpunktet er en **statisk** kraft — den utfører ikke arbeid på kroppen.

Hvis det glir (slipper): bruk $f = \mu_k N$ i stedet, og $\bar a$ og $\alpha$ er uavhengige.

---

## Framgangsmåte

1. **Frittlegemediagram** — tegn kroppen med alle ytre krefter (tyngd, normal, friksjon, fjær, kontakt) påført der de virker.
2. **Velg koordinatsystem** — som regel kartesisk, men kan rotere aksene etter problemets geometri.
3. **Identifiser bindinger** — fast akse? rulling? kontakt med annet legeme? Disse gir relasjoner mellom $\bar a$, $\alpha$, eventuelt andre legemers akselerasjon.
4. **Skriv de tre ligningene** — $\sum F_x$, $\sum F_y$, $\sum M_G$ (eller $\sum M_O$ ved fast akse).
5. **Løs systemet** — tre ligninger, tre ukjente (typisk $\bar a_x$, $\bar a_y$, $\alpha$, eller en ukjent reaksjonskraft og to akselerasjoner).

---

## Eksempel — rullende sylinder ned skråplan

En solid sylinder ($m, r$) ruller uten å gli ned et skråplan med helning $\theta$. Finn lineær akselerasjon $\bar a$.

**Frittlegemediagram:** Tyngd $mg$ rett ned, normalkraft $N$ vinkelrett på planet, friksjonskraft $f$ langs planet (oppover, mot rullretningen).

**Velg akser** langs planet ($x$, ned) og vinkelrett ($y$).

Massetreghetsmoment for solid sylinder: $\bar I = \tfrac{1}{2} m r^2$.

**Ligninger:**

$\sum F_x: \ mg \sin\theta - f = m \bar a$

$\sum M_G: \ f \cdot r = \bar I \alpha = \tfrac{1}{2} m r^2 \alpha$

**Rullingsbinding:** $\bar a = r \alpha \ \Rightarrow \ \alpha = \bar a / r$

Setter inn:
$f \cdot r = \tfrac{1}{2} m r^2 \cdot \bar a / r = \tfrac{1}{2} m r \bar a \ \Rightarrow \ f = \tfrac{1}{2} m \bar a$

Tilbake i kraftligningen:
$mg \sin\theta - \tfrac{1}{2} m \bar a = m \bar a$

$$
\bar a = \tfrac{2}{3} g \sin\theta
$$

Sylinderen akselererer med **2/3 av en kasse som glir friksjonsfritt** — rotasjonen "stjeler" 1/3 av energien.

---

## Eksempel — pendel om fast akse

En tynn stang med masse $m$ og lengde $L$ er hengslet i den øverste enden og slippes fra horisontal posisjon. Finn vinkelakselerasjonen i det øyeblikket den slippes.

**Fast akse** $O$ i øverste ende. Bruk snarveien:

$I_O = \tfrac{1}{3} m L^2$ (tynn stang om enden)

Tyngden virker i $G$, midt på stanga, $\bar r = L/2$ fra $O$. Når stanga er horisontal:

$\sum M_O = m g \cdot L/2 = I_O \alpha = \tfrac{1}{3} m L^2 \alpha$

$$
\alpha = \dfrac{3 g}{2 L}
$$

For en 1 m stang: $\alpha = 3 \cdot 9{,}81 / 2 \approx 14{,}7 \ rad/s^2$.

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$
\sum F_x = m \bar a_x, \quad \sum F_y = m \bar a_y, \quad \sum M_G = \bar I \alpha
$$

$$
\sum M_O = I_O \alpha, \qquad I_O = \bar I + m \bar r^2
$$
```

---

## Relatert
- [Newtons andre lov](newtons-andre-lov.md) — partikkelversjonen
- [Kinetisk energi](kinetisk-energi.md)
- [Treghetsmoment og motstandsmoment](../notes/treghetsmoment-motstandsmoment.md) — tabellverdier for $\bar I$ og Steiners sats
- [Bevegelseslikninger ved konstant akselerasjon](konstant-akselerasjon.md) — rotasjonsanalogene gjelder også her
- [Støt](../notes/støt.md)
