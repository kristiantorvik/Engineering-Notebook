---
title: Bernoullis likning
summary: Berekner akselerasjonen et objekt må ha for å kurve med en spesifikk radius
tags:
  - Fysikk
  - Engineering
  - Dynamikk
  - Fluidynamikk
  - Trykk
  - Volum
type: formel
aliases:
updated: 2026-03-28
---

# Bernoullis likning
Bereknar flow, hastighet og trykk for system med vesker. (ikkje gass uten videre)

Du kan og bruka kalkulatoren: [Rørstrøm og pumpekalkulator](../calculators/pipe-flow-calculator.md)

---


# Formel:

Med tapsledd:
$\large \dfrac{p_1}{\rho g} + \dfrac{1}{2}\dfrac{v_{1}^{2}}{g} + y_1 = \dfrac{p_2}{\rho g} + \frac{1}{2} \frac{v_{2}^{2}}{g} + y_2 + h_f + h_e + h_t$

Uten tapsledd:
$\large p_1 + \dfrac{1}{2} v_{1}^{2} \cdot \rho + y_1\rho g = p_2 + \frac{1}{2} v_{2}^{2} \cdot \rho + y_2 \cdot \rho g$
___

## Variabler
$p_1 =$ Trykket ved posisjon 1 ($Pa$)
$p_2 =$ Trykket ved posisjon 2 ($Pa$)
$\rho =$ Tetthet til veska ($kg/m^3$)
$v_1 =$ Hastigheten til veska ved posisjon 1 ($m/s$)
$v_2 =$ Hastigheten til veska ved posisjon 2 ($m/s$)
$g =$ Tyngdeakselerasjonen ($9.81 m/s^2$)
$y_1 =$ Høgda ved posisjon 1 ($m$)
$y_2 =$ Høgda ved posisjon 2 ($m$) 

Tapsledd, som alle er oppgit som høgdemeter tapt
$h_f =$ Darcy-Weisbach er tapsledd for rørmotstand
$h_e =$ Tapsledd for enkeltmotstander, som bend osv
$h_t =$ Tapsledd for turbiner

høgda $y_1 \, \, y_2$ er kun relevant for høydeforskjellen så du setter ofte den laveste som 0 og den andre som hødgeforskjellen.

Om du kun rekner frå eit reservoar til eit annar kan en ofta annta at hastigheta = 0 siden du reknar då egentlig reservoarene som et slags rør og de faktiske rørene meir som en struping i midten. (Ja detta e korrekt og du får heilt korrekt svar.)

___
___

## Tapsledd formler

### Tapsledd enkeltmotstander

Enkelmotstander kan finnes ved:
$\large h_e = \sigma \cdot \dfrac{1}{2} \dfrac{v^2}{g}$

| Komponent  | Utforming      | Tapskoeffisient  $\sigma$ |
| ---------- | -------------- | ------------------------- |
| Utløp      | Skarpkantet    | 1                         |
| Utløp      | avrundet       | 1                         |
| Innløp     | Skarpkantet    | 0.5                       |
| Innløp     | Avrundet       | 0.04                      |
| Bend 90°   | Skarpkantet    | 1                         |
| Bend 90°   | liten krumning | 0.2                       |
| Kuleventil | Åpen           | 0.05                      |
| Kuleventil | 1/3 lukket     | 5.5                       |
| Kuleventil | 2/3 lukket     | 200                       |

___
### Darcy-Weisbach rør og kanalmotstand
Finner tapshøyden i rette rør

$\large h_f = f \dfrac{L}{d} \dfrac{v^2}{2g}$

$f =$ friksjonsfaktor avhenging av rørets diameter, reynoldstall og overflateruhet (avlest fra diagram)
$L =$ Lengda på røret ($m$)
$d =$ Diameter på  røret ($m$)
$v =$ Hastighet på vesko ($m/s$)
$g =$ tyngdekraftskonstant ($9.81m/s^2$)

$f$  finner du ved hjelp av diagrammet under.
(Dersom du driv med gestimering, annta turbulent flow, hopp over reynolds tall og bruk $f$ mellom 0.03 - 0.07)
Reknar du med vann kan du og bruka kalkulatoren [Flow-hastighetskalkulator](../calculators/flow-speed-calculator.md)

Du rekner ut reynolds nummeret med: $Re = \dfrac{v\cdot d}{\nu}$
der V er hastigheten, som du kanskje ikkje veit no. Då e da ofta lettast å gjetta, og so rekna vidare, so sammenligne du hastigheten du får med den du brukte til å tippa. Viss du bomma veldigt so bruk hastigheta du fann som ditt nye gjett og rekn ut på nytt.
$\nu$ er den kinematiske viskositeten, her er ca verdier på litt div.

| Medie           | $\nu$   ($m^2 / s$) |
| --------------- | ------------------- |
| Vann            | $1 \cdot 10^{-6}$   |
| Luft            | $1.5 \cdot 10^{-5}$ |
| 10W-40 ved 0°   | $8.4 \cdot 10^{-4}$ |
| 10W-40 ved 40°  | $9.3 \cdot 10^{-5}$ |
| 10W-40 ved 100° | $1.4 \cdot 10^{-5}$ |

Du leser av ca ruhet $\large \epsilon$ fra tabellen under og regner ut relativ ruhet som $\dfrac{\epsilon}{d}$ 
følg den blå linja fra høgre med relativ ruhet du fant til du kjem til reynolds tallet ditt.
Punktet der den blål linja krysser reynoldstallet dit kan du følge direkte til venstre og lese av friksjonsfaktoren din.

![[Darcy-Weisbach-Moody.png]]

Av Original diagram: S Beck and R Collins, University of Sheffield (Donebythesecondlaw at engelsk Wikipedia)Conversion to SVG: Marc.derumaux – File:Moody_diagram.jpg, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=52681200



---

# Eksempel – finne vannføring i rør

![[vann-høydebasseng.png]]

To reservoar har høgdeforskjell og me ønkser å finne **flowen**.
- rør lengde $L = 3000\,m$
- høgdeforskjell $H = 12.5\,m$
- rørdiameter $d = 200 \, mm$
- rørtypen er støypejern.
---

#### Start med å gjette friksjonsfaktor

Siden me ikkje veit flowen kan me ikkje berekna friksjonsfaktoren i røret. Me gjetter då basert på kor stor hastighet me forventer i røret osv ved å sjå i Moody diagrammet

Vi gjetter: $f = 0.03$

---

#### Finn hastigheten
Derreter berekna en hastigheto og då reynoldstallet for å sjå om me traff godt på gjettinga vår.

Siden tapshøgda er avhengig av hastigheta  og hastigheta er avhengig av resten må vi putte sammen Darcy-Weisbach og Bernoulli.

Begynner med å stryke det vi ikkje treng fra bernoulli

$$\large \cancel{\dfrac{p_1}{\rho g}} + \cancel{\dfrac{1}{2}\dfrac{v_{1}^{2}}{g}} + y_1 = \cancel{\dfrac{p_2}{\rho g}} + \frac{1}{2} \frac{v_{2}^{2}}{g} + \cancel{y_2} + h_f + \cancel{h_e} + \cancel{h_t}$$


$$\large y_1 = \dfrac{v^2}{2g} + h_f$$

Vi kan stryke $p_1 , p_2$ utrykkene siden trykket er likt i reservoaret på toppen og ved utløpet på bunnen. (viss innløpet på røret var i bunnen på et reservoar det en ville fått trykk av vannsøylen  kunne en ikkje fjerna desse)
Me fjerner utrykkene med $v_1$ siden hastigheten i reservoaret er 0.
Me fjerner og turbintap og enkeltap fra bend osv.

Putter inn Darcy-Weisbach:

$$\large y_1 = \dfrac{v^2}{2g} + f \dfrac{L}{d} \dfrac{v^2}{2g}$$
Løser med hensyn på $v$

$$\large v = \sqrt{\dfrac{2g \cdot y_1}{1 + f \dfrac{L}{d}}} \, \, = 0.74\,m/s$$


---

### Sjekk Reynolds tall

$$
Re = \dfrac{v\cdot d}{\nu} = 1.48 \cdot 10^5
$$

#### Leser av moody diagram og får $f = 0.022$
![[Darcy-Weisbach-Moody-eksempel.png]]

Dette var ikkje veldig langt frå gjettet mitt så eg anntar det er godt nok no.
Viss en bomma masse kan en rekan ut hastigheten og reynolds tall på nytt og finna f på nytt.

Vi setter dette inn igjen og finner: $v = 0.86\,m/s$

---
#### Volumstrøm

$Q = A v$

$Q = \pi\left(\dfrac{d}{2}\right)^2v$

$Q \approx 0.027\,m^3/s$

$\large \underline{\underline{Q = 27\,L/s}}$

---
---


# Eksempel – dimensjonering av pumpe


Vi skal regne ut dataen vi trenger for å velge rett pumpe. Me treng då trykk/løftehøgde på sugeside og trykk/løftehøgde på trykkside samt effekten på pumpa eller flowraten.

![[pumpe-eksempel.png]]

Pumpa skal pumpe vann frå ein brønn med luftrykk $p_1 = 1.0 \cdot 10^5 \, Pa$ til eit reservoar med trykk $p_2 = 4.0 \cdot 10^5 \, Pa$ 

Pumpa suger frå brønnen som ligger 5 meter under pumpa, $H_s = 5.0 \, m$ 
Reservoaret ligger $H_t = 15.0 \, m$ over pumpa.

Rørene har en diameter på $d = 50 \, mm$ 
Rørlengden på sugesida er $L_s = 10 \, m$
Rørlengden på trykksida er $L_t = 25 \, m$
Vi skal levere $4 \, L/s$ 

Vi har fine glatte PE rør og fåt lav hastighet i rørene på $v = 2 \, m/s$ og bruker da friksonsfaktor 0.02
Vi har noen stygge bends og skarpe innganger og anntar då en samla tapskoeffisient på $\sigma = 6.0$ på sugesiden og $\sigma = 4.0$ på trykksiden.

Vi anntar at karene er såpass store at vi får ingen veskehastighet i karene.
(dersom ett av karene var en buffertank som hadde betydelig flow kunne vi ikkje gjort denne antagelsen) Me kunne og ha strøke veskehastigheta dersom det var samme hastighet i karene.

I de aller fleste tilfeller begynner en med heile formelen og så stryker en berre ut de en ikkje trenger eller kan annta er ubetydelig.
$$\large \dfrac{p_1}{\rho g} + \dfrac{1}{2}\dfrac{v_{1}^{2}}{g} + y_1 = \dfrac{p_2}{\rho g} + \frac{1}{2} \frac{v_{2}^{2}}{g} + y_2 + h_f + h_e + h_t$$


Me stryk ut det som forsvinn med veskehastighet 0 og turbinledd.

$$\large \dfrac{p_1}{\rho g} + \cancel{\dfrac{1}{2}\dfrac{v_{1}^{2}}{g}} + y_1 = \dfrac{p_2}{\rho g} + \cancel{\frac{1}{2} \frac{v_{2}^{2}}{g}} + y_2 + h_f + h_e + \cancel{h_t}$$

$$\large \dfrac{p_1}{\rho g} + y_1 = \dfrac{p_2}{\rho g} + y_2 + h_f + h_e$$

Dette er då balanselikninga for øvre og nedre kar.


![[pumpe-illustrasjon.png]]

Pumpa tilfører vesken energi slik at energien i vesken på trykksiden er større enn energien på sugesiden. Vi må derfor korrigere Bernoullis likning omtrent på samme måten som vi korrigerer for tap. Når vi korrigerer for tap må vi legge til et ledd (motstandshøyden)
på høyre side av likningen for å kompensere for den tapte energien. Når vi har ei pumpe i veskestrømmen må vi legge til et ledd (pumpas løftehøyde $H_p$) for å kompensere
for tilleggsenergien pumpa gir vesken.

Pumpa leverer energi energi til vesken i form av økt trykk $\Delta p = \rho g H_p$ i det den passerer pumpen. Pumpas effekt på vesken er dermed avhengig av volumstrømmen og vi kan
skrive 

$\large P_v = \rho g H_p Q$  (Effekt levert)

Bernoulli med pumpehøyde

$$\large \dfrac{p_1}{\rho g} + y_1 + H_p= \dfrac{p_2}{\rho g} + y_2 + h_f + h_e$$


### Berekna tapshøgda frå rørfriksjonen:

$\large h_f (Sugeside) = f \dfrac{L}{d} \dfrac{v^2}{2g} \, \, = \, \, 0.02 \cdot \dfrac{10 \cdot 2^2}{0.05 \cdot 2g} \, \, = \, \, 0.815$

$\large h_f (Trykkside) = f \dfrac{L}{d} \dfrac{v^2}{2g} \, \, = \, \, 0.02 \cdot \dfrac{25 \cdot 2^2}{0.05 \cdot 2g} \, \, = \, \, 2.04$

#### So berekna med enkelttap

$\large h_e (Sugeside) = \sigma \cdot \dfrac{1}{2} \dfrac{v^2}{g} \, \, = \, \, 6 \cdot \dfrac{1}{2} \dfrac{2^2}{g} \, \, = \, 1.22$

$\large h_e (Trykkside) = \sigma \cdot \dfrac{1}{2} \dfrac{v^2}{g} \, \, = \, \, 4 \cdot \dfrac{1}{2} \dfrac{2^2}{g} \, \, = \, 0.815$


Me kan då legga sammen tapshøgda på kver side

$\large h_{\text{sug}} = 0.815 + 1.22 = 2.035 \, m$
$\large h_{\text{Trykk}} = 2.04 + 0.815 = 2.855 \, m$

---

### So set me alt inn i Bernoulli-ligninga

$$
\dfrac{p_1}{\rho g} + y_1 + H_p
=
\dfrac{p_2}{\rho g} + y_2 + h_{\text{sug}} + h_{\text{trykk}}
$$

Vi ønsker å finne **pumpas løftehøgde $H_p$**  og snur da formelen 


$$
H_p
=
\dfrac{p_2 - p_1}{\rho g} + y_2 - y_1 + h_{\text{sug}} + h_{\text{trykk}}
$$

Setter inn verdiene våre

$$
H_p
=
\dfrac{4 \cdot 10^5 \, Pa - 1 \cdot 10^5 \, Pa}{1000 \, kg/m^3 \cdot 9.81m/s^2} + 15 \, m - (-5 \, m) + 2.035 \, m + 2.855 \, m \, \, = \, \, \underline{\underline{55.5 \, m}}
$$

$55.5 \, m$ er då den totale løftehøgda pumpa må greie.

___

I praksis så er det få pumper som er gode på sugehøyde så en må og berekne trykket før pumpa for å sjå kor god sugeevne me treng.

For å finne trykket i røret rett før pumpa setter en opp bernuillis ligning på  nytt der plassering 2 er no rett før pumpa.

$$\large \dfrac{p_1}{\rho g} + \dfrac{1}{2}\dfrac{v_{1}^{2}}{g} + y_1 = \dfrac{p_2}{\rho g} + \frac{1}{2} \frac{v_{2}^{2}}{g} + y_2 + h_f + h_e + h_t$$

$$\large \dfrac{p_1}{\rho g} + \cancel{\dfrac{1}{2}\dfrac{v_{1}^{2}}{g}} + y_1 = \dfrac{p_2}{\rho g} + \frac{1}{2} \frac{v_{2}^{2}}{g} + \cancel{y_2} + h_f + h_e + \cancel {h_t}$$
Då har me fjerna farten i karet då den er 0
fjerna høyden $\large y_2$ siden den no er 0
Og fjerna turbinleddet.

Me snur no for $\large p_2$
$$\large p_2 = p_1 - \frac{1}{2} v_{2}^{2} \cdot \rho - \rho g (h_f + h_e - y_1)$$

Og setter inn

$$\large p_2 = 1 \cdot 10^5 \, Pa - \frac{1}{2} (2 \, m/s) ^{2} \cdot 1000 \, kg/m^3 - 1000 \, kg/m^3 \cdot 9.81 \, m/s^2 (0.815 \, m + 1.22\, m - (-5 \, m))$$

$$\large = 28987 Pa \approx 29000 Pa \approx \text{0.7 bar undertrykk i forhald til atmosfære}$$

Ikkje mange pumper som klarer :(

---

### Effekt levert til vannet

$P = \rho g H_p Q$

$P = 1000 \cdot 9.81 \cdot 55.5 \cdot 0.004$

$P \approx 2.2 \, kW$

Dette er **effekten pumpa faktisk overfører til vannet**.

Dersom pumpa har virkningsgrad $70\%$:

$P_{brukt} = \dfrac{P}{\eta}$

$P_{brukt} = \dfrac{2.2}{0.7}$

$P_{brukt} \approx 3.15 \, kW$

Dette er **effekten motoren må levere**.


## For copy/paste

**Python:**
```python
```

**Markdown / Latex:**
Med tapsledd
```Markdown
$$
\dfrac{p_1}{\rho g} + \dfrac{1}{2}\dfrac{v_{1}^{2}}{g} + y_1 = \dfrac{p_2}{\rho g} + \frac{1}{2} \frac{v_{2}^{2}}{g} + y_2 + h_f + h_e + h_t
$$
```

Uten tapsledd
```Markdown
$$
p_1 + \dfrac{1}{2} v_{1}^{2} \cdot \rho + y_1\rho g = p_2 + \frac{1}{2} v_{2}^{2} \cdot \rho + y_2 \cdot \rho g
$$
```

Tapsledd enkeltmotstand
```Markdown
$$
h_e = \sigma \cdot \dfrac{1}{2} \dfrac{v^2}{g}
$$
```

Darcy-Weisbach rørmotstand
```Markdown
$$
h_f = f \dfrac{L}{d} \dfrac{v^2}{2g}
$$
```

---
