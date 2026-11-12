---
title: Volumformler
summary: Generelle formlar for volum av vanlege geometriske lekamar — sylinder, rør, kjegle, kule, torus, tankar m.m.
tags:
  - Matematikk
  - Volum
  - Geometri
  - Engineering
type: referanse
search_words: volum, volume, liter, sylinder, rør, kjegle, kule, pyramide, prisme, torus, o-ring, tank, kalott, ellipsoide, kapasitet, sylindrisk tank, tank
updated: 2026-11-12
---

# Volumformler

---

## Enheter

| Frå            | Til                       |
| -------------- | ------------------------- |
| $1 \, L$       | $= 1 \, dm^3 = 10^6 \, mm^3$ |
| $1 \, m^3$     | $= 1000 \, L$             |
| $1 \, cm^3$    | $= 1 \, ml$               |


---

## Kube og boks

$\Large V = a^3$

$\Large V = l \cdot b \cdot h$

$a =$ Sidelengde
$l, b, h =$ Lengde, breidde, høgde

---

## Sylinder

$\Large V = \pi r^2 h = \dfrac{\pi d^2}{4} \cdot h$

$r =$ Radius, $d =$ Diameter
$h =$ Høgde / lengde


---

## Rør / hol sylinder

$\Large V = \dfrac{\pi}{4} \left( D^2 - d^2 \right) \cdot h$

$D =$ Ytre diameter
$d =$ Indre diameter
$h =$ Lengde

---

## Kjegle

$\Large V = \dfrac{\pi r^2 h}{3}$

$r =$ Radius i grunnflata
$h =$ Høgde

---

## Avkorta kjegle (kjeglestubb)

Typisk trakt, bøtte, konisk overgang.

$\Large V = \dfrac{\pi h}{3} \left( R^2 + R r + r^2 \right)$

$R =$ Stor radius
$r =$ Liten radius
$h =$ Høgde mellom dei to endeflatene

---

## Pyramide

$\Large V = \dfrac{A \cdot h}{3}$ — for kvadratisk grunnflate: $\Large V = \dfrac{a^2 h}{3}$

$A =$ Grunnflate
$h =$ Høgde

---

## Avkorta pyramide

$\Large V = \dfrac{h}{3} \left( A_1 + A_2 + \sqrt{A_1 A_2} \right)$

$A_1, A_2 =$ Areal av dei to parallelle endeflatene
$h =$ Høgde mellom dei

---

## Kule

$\Large V = \dfrac{4}{3} \pi r^3 = \dfrac{\pi d^3}{6}$

$r =$ Radius, $d =$ Diameter

**Hol kule (kuleskal):**

$\Large V = \dfrac{4}{3} \pi \left( R^3 - r^3 \right)$

$R =$ Ytre radius, $r =$ Indre radius

---

## Kulekalott (kulesegment)

Delen av ei kule som blir skoren av med eit plan. Brukt for t.d. kupla tankendar og væske i botnen av ei kule.

$\Large V = \dfrac{\pi h^2}{3} \left( 3r - h \right)$

$r =$ Radius til kula
$h =$ Høgda til kalotten

---

## Ellipsoide

$\Large V = \dfrac{4}{3} \pi a b c$

$a, b, c =$ Dei tre halvaksane

---

## Torus (O-ring)

$\Large V = 2 \pi^2 R r^2$

$R =$ Radius frå senter til midten av tverrsnittet
$r =$ Radius i tverrsnittet

**Praktisk form for O-ring:**

$\Large V = \dfrac{\pi^2}{4} \cdot D_m \cdot d^2$

$D_m =$ Middeldiameter $= ID + d$
$d =$ Snortjukkleik

Sjå også [O-ring Design](../notes/O-ring-design.md).

---

## Liggande sylindrisk tank, delvis fylt

$\Large V = L \left[ R^2 \arccos\!\left( \dfrac{R-h}{R} \right) - (R-h)\sqrt{2Rh - h^2} \right]$

$R =$ Indre radius i tanken
$h =$ Væskehøgde (målt frå botnen), $0 \le h \le 2R$
$L =$ Lengde på tanken (sylinderdelen)

$\arccos$ må gi svar i **radianar**. Formelen gjeld den sylindriske delen — kupla endar kjem i tillegg.

---

## Eksempel

**1) Liggande dieseltank:** Ø1,2 m, 2 m lang, peilestokken viser 0,4 m.

$R = 0{,}6 \, m$, $h = 0{,}4 \, m$, $L = 2 \, m$

$\arccos\left(\dfrac{0{,}2}{0{,}6}\right) = 1{,}231 \, rad$

$V = 2 \left[ 0{,}36 \cdot 1{,}231 - 0{,}2 \cdot \sqrt{0{,}48 - 0{,}16} \right] = 2 \left[ 0{,}443 - 0{,}113 \right] \approx 0{,}660 \, m^3 = 660 \, L$

Full tank: $\pi \cdot 0{,}6^2 \cdot 2 = 2{,}26 \, m^3 = 2262 \, L$ → tanken er ca. 29 % full sjølv om peilinga er 33 % av høgda.

**2) O-ring:** ID 50 mm, snor 3 mm.

$D_m = 50 + 3 = 53 \, mm$

$V = \dfrac{\pi^2}{4} \cdot 53 \cdot 3^2 \approx 1177 \, mm^3 \approx 1{,}18 \, ml$

---

## For copy/paste

**Markdown / Latex:**
```Markdown
$$ V = \dfrac{\pi d^2}{4} \cdot h $$
$$ V = \dfrac{\pi}{4} \left( D^2 - d^2 \right) \cdot h $$
$$ V = \dfrac{\pi h}{3} \left( R^2 + R r + r^2 \right) $$
$$ V = \dfrac{4}{3} \pi r^3 $$
$$ V = \dfrac{\pi h^2}{3} \left( 3r - h \right) $$
$$ V = 2 \pi^2 R r^2 $$
$$ V = L \left[ R^2 \arccos\left( \dfrac{R-h}{R} \right) - (R-h)\sqrt{2Rh - h^2} \right] $$
```

**Excel / kalkulator:**
```
Sylinder:          =PI()*d^2/4*h
Rør:               =PI()/4*(D^2-d^2)*h
Kjeglestubb:       =PI()*h/3*(R^2+R*r+r^2)
Kule:              =PI()*d^3/6
Liggande tank:     =L*(R^2*ACOS((R-h)/R)-(R-h)*SQRT(2*R*h-h^2))
```
