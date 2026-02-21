# 🚨 ULTIMATIVER GRAFIK-QUALITÄTS-ENFORCEMENT-PROMPT
## POLYGON-PRÄZISE ANWEISUNGEN FÜR AAA-GRAFIK-IMPLEMENTIERUNG
### KEINE PRIMITIVEN - NUR ANATOMISCH KORREKTE GEOMETRIE

---

> **⚡ KRITISCHE AGENT-MISSION ⚡**
>
> Die aktuellen Screenshots zeigen INAKZEPTABLE Grafik-Qualität:
> - NPCs sind primitive Zylinder (32 Polygone statt 8.000+)
> - Gebäude sind einfarbige Boxen (200 Polygone statt 60.000+)
> - Keine Texturen, keine Details, keine Atmosphäre
> - Performance 16 FPS (Ziel: 60 FPS)
>
> **DEINE MISSION:** Ersetze ALLES durch AAA-Qualität gemäß exakter Polygon-Vorgaben.

---

# 📋 TEIL 1: POLYGON-BUDGETS (NON-NEGOTIABLE)

## 1.1 Gesamt-Szenen-Budget

```
PLATTFORM-SPEZIFISCHE LIMITS (STRIKT EINHALTEN):

Desktop High-End:
  └─ Gesamt-Budget: 5.000.000 Polygone
  └─ FPS-Target: 120 bei allen Settings
  └─ Draw-Calls: < 500

Desktop Medium (BASELINE):
  └─ Gesamt-Budget: 3.000.000 Polygone
  └─ FPS-Target: 60 bei 500 NPCs
  └─ Draw-Calls: < 400

Desktop Low:
  └─ Gesamt-Budget: 1.500.000 Polygone
  └─ FPS-Target: 60 bei 300 NPCs
  └─ Draw-Calls: < 300

Mobile High:
  └─ Gesamt-Budget: 500.000 Polygone
  └─ FPS-Target: 60 bei 50 NPCs
  └─ Draw-Calls: < 150

Mobile Medium:
  └─ Gesamt-Budget: 300.000 Polygone
  └─ FPS-Target: 30 bei 50 NPCs
  └─ Draw-Calls: < 100
```

## 1.2 Komponenten-Budget-Breakdown (Desktop Medium Basis)

### NPCs (KRITISCHSTE KATEGORIE)

**EINZELNER NPC - LOD-STUFEN:**

```
LOD-0 (Distanz < 10 Meter):
  ├─ Polygon-Budget: 8.000 Polygone
  ├─ Verwendung: Spieler-nahe NPCs
  ├─ Details: Vollständige Anatomie sichtbar
  └─ Breakdown:
      ├─ Kopf: 1.800 Polygone
      │   ├─ Schädel mit Gesichtsform: 600
      │   ├─ Augen (2x komplett): 400
      │   ├─ Nase mit Nasenflügeln: 200
      │   ├─ Mund mit Lippen: 150
      │   ├─ Ohren (2x): 300
      │   └─ Haare/Helm: 150
      ├─ Torso: 1.500 Polygone
      │   ├─ Oberkörper anatomisch: 600
      │   ├─ Schultern (2x): 300
      │   ├─ Brustbereich: 400
      │   └─ Hüftbereich: 200
      ├─ Arme (2x): 1.600 Polygone
      │   ├─ Oberarm pro Seite: 300
      │   ├─ Ellbogen: 100
      │   ├─ Unterarm: 250
      │   └─ Hand mit Fingern: 150
      ├─ Beine (2x): 2.000 Polygone
      │   ├─ Oberschenkel: 400
      │   ├─ Knie: 150
      │   ├─ Unterschenkel: 350
      │   └─ Fuß mit Zehen: 100
      └─ Kleidung: 1.100 Polygone
          ├─ Shirt/Jacke: 450
          ├─ Hose: 400
          ├─ Schuhe: 150
          └─ Accessoires: 100

LOD-1 (Distanz 10-30 Meter):
  ├─ Polygon-Budget: 2.000 Polygone
  ├─ Vereinfachung: 75% Reduktion
  ├─ Details: Gesicht erkennbar aber vereinfacht
  └─ Breakdown:
      ├─ Kopf: 450 Polygone
      ├─ Torso: 400 Polygone
      ├─ Arme: 400 Polygone
      ├─ Beine: 500 Polygone
      └─ Kleidung: 250 Polygone

LOD-2 (Distanz 30-70 Meter):
  ├─ Polygon-Budget: 500 Polygone
  ├─ Vereinfachung: 94% Reduktion
  ├─ Details: Körperform erkennbar, keine Details
  └─ Breakdown:
      ├─ Kopf: 100 Polygone (Ellipsoid)
      ├─ Torso: 150 Polygone
      ├─ Arme: 100 Polygone
      ├─ Beine: 100 Polygone
      └─ Kleidung: 50 Polygone

LOD-3 (Distanz > 70 Meter):
  ├─ Polygon-Budget: 4 Polygone (Billboard)
  ├─ Technik: Plane mit Alpha-Textur
  ├─ Rotation: Immer zur Kamera
  └─ Textur-Auflösung: 128x256 Pixel
```

**CROWD-GESAMT bei 500 NPCs (Desktop Medium):**
```
Verteilung:
  ├─ 50 NPCs in LOD-0: 50 × 8.000 = 400.000 Polygone
  ├─ 150 NPCs in LOD-1: 150 × 2.000 = 300.000 Polygone
  ├─ 200 NPCs in LOD-2: 200 × 500 = 100.000 Polygone
  └─ 100 NPCs in LOD-3: 100 × 4 = 400 Polygone
  TOTAL: 800.400 Polygone ✅ (unter 1M Limit für NPCs)
```

### Polizei-Ausrüstung (Zusätzlich zu Basis-NPC)

```
Helm mit Visier:
  ├─ Gesamt: 1.200 Polygone
  ├─ Helm-Schale: 600 (keine Halbkugel, taktische Form)
  ├─ Visier transparent: 300 (gebogen, beweglich)
  ├─ Kinnriemen: 100
  ├─ Polsterung: 100
  └─ Nackenschutz: 100

Schutzweste:
  ├─ Gesamt: 1.800 Polygone
  ├─ Hauptkörper: 800 (Vorder + Rückseite)
  ├─ MOLLE-System: 300 (Schlaufen-Reihen)
  ├─ Taschen (4x): 400 (je 100)
  ├─ Schulterklappen: 200
  └─ Seitenschutz: 100

Schild:
  ├─ Gesamt: 800 Polygone
  ├─ Schild-Körper: 400 (leicht gebogen)
  ├─ Sichtfenster: 150 (transparent)
  ├─ Griffe: 150
  └─ Verstärkungen: 100

Schlagstock:
  ├─ Gesamt: 300 Polygone
  ├─ Griff: 100 (geriffelt)
  ├─ Schaft: 150
  └─ Handschlaufe: 50

Sonstige Ausrüstung:
  ├─ Funkgerät: 150 Polygone
  ├─ Pfefferspray: 80 Polygone
  ├─ Handschellen: 120 Polygone
  ├─ Taschenlampe: 100 Polygone
  └─ Bodycam: 150 Polygone

TOTAL Polizei-NPC: 8.000 (Basis) + 4.500 (Ausrüstung) = 12.500 Polygone
```

### Demonstranten-Accessoires

```
Rucksack:
  ├─ Gesamt: 800 Polygone
  ├─ Haupttasche: 400
  ├─ Riemen (2x): 200
  ├─ Seitentaschen: 150
  └─ Reißverschlüsse: 50

Demo-Schild:
  ├─ Gesamt: 200 Polygone
  ├─ Schild-Fläche: 100 (plane)
  ├─ Stange: 80
  └─ Befestigung: 20

Cap/Mütze:
  ├─ Gesamt: 300 Polygone
  ├─ Schirm: 100
  ├─ Kappe: 150
  └─ Verschluss: 50

TOTAL Demonstrant-NPC: 8.000 (Basis) + 1.300 (Accessoires) = 9.300 Polygone
```

### Stephansdom (Wahrzeichen - Höchste Priorität)

```
GESAMT-BUDGET: 600.000 Polygone

Südturm (Steffl):
  ├─ Budget: 150.000 Polygone
  ├─ Turmschaft: 80.000
  ├─ Maßwerk: 40.000 (gotische Durchbrüche)
  ├─ Fialen: 20.000 (kleine Türmchen)
  └─ Spitze mit Kreuz: 10.000

Kirchenschiff:
  ├─ Budget: 80.000 Polygone
  ├─ Hauptstruktur: 40.000
  ├─ Gewölbe innen: 25.000
  └─ Bögen: 15.000

Dach (KRITISCH - Wahrzeichen-Merkmal):
  ├─ Budget: 120.000 Polygone
  ├─ Dachziegel einzeln: 100.000
  ├─ Zickzack-Muster: MUSS sichtbar sein
  ├─ Farbvariationen: 3 Ziegel-Farben
  └─ Dachreiter: 20.000

Portale (3x Hauptportale):
  ├─ Budget pro Portal: 20.000 Polygone
  ├─ Riesentor (Haupteingang): 25.000
  ├─ Zwei Seitenportale: je 17.500
  └─ Gesamt: 60.000

Fenster (24x große Fenster):
  ├─ Budget pro Fenster: 4.000 Polygone
  ├─ Maßwerk pro Fenster: 2.500
  ├─ Glasflächen: 1.000
  ├─ Rahmen: 500
  └─ Gesamt: 96.000

Nordturm + Details:
  ├─ Budget: 94.000 Polygone
  ├─ Nordturm (niedriger): 45.000
  ├─ Strebepfeiler (8x): 32.000
  └─ Ornamente: 17.000

VALIDIERUNG: 150k + 80k + 120k + 60k + 96k + 94k = 600.000 ✅
```

### Gründerzeit-Gebäude (Standard-Wohnhaus)

```
GESAMT-BUDGET pro Gebäude: 60.000-80.000 Polygone

Erdgeschoss (Sockelzone):
  ├─ Budget: 15.000 Polygone
  ├─ Rustika-Fassade: 8.000
  ├─ Eingangsportal: 3.000
  ├─ Schaufenster (2x): 3.000
  └─ Türen: 1.000

Obergeschoss (pro Stockwerk, 3-5x):
  ├─ Budget pro Geschoss: 10.000 Polygone
  ├─ Wandfläche: 3.000
  ├─ Fenster (3x): 4.500 (je 1.500)
  ├─ Balkon: 1.500
  └─ Gesimse: 1.000

Pro Fenster Detail-Breakdown:
  ├─ Außenrahmen (Fasche): 400 Polygone
  ├─ Fensterbrett: 200
  ├─ Glasfläche: 300
  ├─ Fensterkreuz: 300
  ├─ Verdachung: 200
  └─ Innere Details: 100

Dachzone:
  ├─ Budget: 12.000 Polygone
  ├─ Kranzgesims: 3.000
  ├─ Attika: 2.000
  ├─ Dachfläche: 5.000
  └─ Gauben (2x): 2.000

Fassaden-Ornamente:
  ├─ Budget: 8.000 Polygone
  ├─ Stuck-Elemente: 4.000
  ├─ Medaillons: 2.000
  └─ Pilaster: 2.000

TOTAL für 4-Geschosser: 15k + 40k (4×10k) + 12k + 8k = 75.000 Polygone ✅
```

### Straßen und Infrastruktur

```
Straße (100 Meter Segment):
  ├─ Budget: 5.000 Polygone
  ├─ Fahrbahn: 2.000 (mit Wölbung)
  ├─ Gehsteig (beide Seiten): 1.500
  ├─ Bordsteine: 800
  ├─ Schachtdeckel (4x): 400
  └─ Markierungen: 300

Straßenlaterne (Wiener Stil):
  ├─ Budget: 800 Polygone
  ├─ Mast: 300 (konisch, nicht zylindrisch)
  ├─ Basis: 200
  ├─ Leuchte: 200
  └─ Arm: 100

Bank (Wiener Stil):
  ├─ Budget: 1.200 Polygone
  ├─ Holzlatten (6x): 600
  ├─ Metallgestell: 400
  └─ Rückenlehne: 200

Mülleimer:
  ├─ Budget: 600 Polygone
  ├─ Hauptkörper: 300
  ├─ Deckel: 150
  └─ Ständer: 150

Vegetation (Baum):
  ├─ Budget: 2.000 Polygone
  ├─ Stamm: 400
  ├─ Äste: 600
  └─ Laub (Billboard-Cluster): 1.000

TOTAL Straßen-Ausstattung (100m mit 4 Laternen, 2 Bänken, 3 Mülleimern):
  5.000 + 3.200 + 2.400 + 1.800 = 12.400 Polygone
```

---

# 📋 TEIL 2: ANATOMIE-DIREKTIVEN (WORT-ANWEISUNGEN)

## 2.1 NPC-Kopf-Konstruktion (1.800 Polygone)

### Schädel-Basis (600 Polygone)

Erstelle KEINE einfache Kugel. Vorgehen:

Starte mit SphereGeometry mit hohen Segment-Zahlen (32 horizontal, 24 vertikal).

Modifiziere die Sphere nach Erstellung:
- Skaliere Y-Achse um Faktor eins Komma eins fünf (Kopf höher als breit)
- Skaliere Z-Achse um Faktor null Komma neun (Kopf flacher von Seite)
- Positioniere so dass Augenhöhe auf Referenz-Y liegt

Füge Kiefer-Region hinzu als separate Geometrie:
- Verwende modifizierte Box oder zweite Sphere
- Breiter als hoch im Verhältnis zwei zu eins
- Position unterhalb Hauptschädel mit leichter Überlappung
- Verschmelze optisch durch Material-Kontinuität

### Augen (400 Polygone total, 200 pro Auge)

Jedes Auge besteht aus vier Komponenten:

Augenhöhle (Vertiefung):
- Erstelle als leichte Delle im Schädel
- Entweder durch Vertex-Manipulation oder separate Geometrie
- Dunkles Material für Schatten-Effekt

Augapfel (weiße Kugel):
- SphereGeometry mit Radius null Komma null eins fünf Einheiten
- Position leicht nach vorne aus Höhle ragend
- Material reinweiß mit leichtem Glanz (roughness null Komma drei)

Iris (farbige Scheibe):
- CircleGeometry oder flache CylinderGeometry
- Radius null Komma null null acht Einheiten
- Position direkt vor Augapfel mit minimalem Abstand
- Material in Augenfarbe (blau, braun, grün)

Pupille (schwarze Scheibe):
- CircleGeometry kleiner als Iris
- Radius null Komma null null vier Einheiten
- Position zentriert vor Iris
- Material tiefschw

arz

Positioniere beide Augen:
- X-Abstand null Komma null acht Einheiten von Zentrum
- Y-Position auf Augenhöhe
- Z-Position null Komma null neun nach vorne
- Leichte Neigung nach innen (zehn Grad)

### Nase (200 Polygone)

Konstruiere aus drei Teilen:

Nasenrücken:
- Verwende schmale BoxGeometry
- Dimensionen: null Komma null drei breit, null Komma null vier hoch, null Komma null fünf tief
- Position zentral zwischen Augen
- Rotation leicht nach vorne geneigt (fünf Grad)

Nasenspitze:
- SphereGeometry mit Radius null Komma null zwei
- Position am unteren Ende des Nasenrückens
- Leicht nach unten und vorne

Nasenflügel (zwei Stück):
- Kleine SphereGeometries (Radius null Komma null eins fünf)
- Position links und rechts der Nasenspitze
- X-Abstand null Komma null zwei fünf von Zentrum

### Mund (150 Polygone)

Oberlippe:
- Erstelle gewölbte Form aus modifizierter CylinderGeometry
- Länge null Komma null fünf, Höhe null Komma null eins
- Position unter Nase
- Leichte Wölbung nach außen

Unterlippe:
- Ähnlich Oberlippe aber dicker (Höhe null Komma null eins fünf)
- Position direkt unter Oberlippe mit minimalem Spalt
- Stärkere Wölbung

Mundwinkel:
- Zwei kleine Vertiefungen links und rechts
- Optional als separate kleine Geometrien

### Ohren (300 Polygone pro Ohr, 600 total)

Basis-Form:
- Verwende TorusGeometry als Ausgangspunkt
- Modifiziere zu Ellipsoid (abgeflacht)
- Dimensionen null Komma null sechs hoch, null Komma null vier breit

Position:
- Seitlich am Kopf
- Y-Position auf Augenhöhe
- Rotation zwanzig Grad nach hinten geneigt

Ohrdetails:
- Ohrmuschel als innere Vertiefung
- Ohrläppchen als separate kleine Sphere unten
- Helix (äußerer Rand) als erhabene Linie

### Haare (150 Polygone)

Vereinfachte Darstellung mit einer von drei Methoden:

Methode Haube:
- Erstelle größere Sphere über Schädel
- Skaliere um Faktor eins Komma null fünf
- Schneide unteren Teil ab
- Textur oder Material für Haar-Look

Methode Billboards:
- Verwende mehrere Planes mit Alpha-Textur
- Anordne um Kopf herum
- Jede Plane zeigt Haar-Strähne
- Rotation zur Kamera (immer sichtbar)

Methode Helm (für Polizei):
- Siehe Polizei-Ausrüstung Helm-Spezifikation
- Ersetzt Haare komplett

## 2.2 NPC-Torso-Konstruktion (1.500 Polygone)

### Haupt-Torso (600 Polygone)

NICHT verwenden: Einfache CylinderGeometry

STATTDESSEN verwenden: LatheGeometry mit Profil-Kurve

Profil-Definition (Array von Vector2-Punkten):
- Punkt eins bei null, null (Hals - schmalste Stelle)
- Punkt zwei bei null Komma eins fünf, null Komma null fünf (Schulterbreite)
- Punkt drei bei null Komma eins drei, null Komma zwei (Brustbereich)
- Punkt vier bei null Komma null neun, null Komma drei fünf (Taille - Verengung)
- Punkt fünf bei null Komma eins eins, null Komma fünf (Hüfte - leichte Verbreiterung)

LatheGeometry-Parameter:
- Segmente horizontal: zweiunddreißig (für Glätte)
- Rotation um Y-Achse (vertikale Hauptachse)

Alternative bei Performance-Problemen:
- Kombiniere drei gestapelte CylinderGeometries
- Oberkörper dicker, Taille dünner, Hüfte mittel
- Übergänge mit kleinen SphereGeometries glätten

### Schultern (300 Polygone, 150 pro Seite)

Erstelle als separate Komponenten:

Linke Schulter:
- SphereGeometry als Basis
- Skaliere in X-Richtung um Faktor eins Komma fünf (gestreckt)
- Position links oben am Torso (X minus null Komma acht, Y null Komma zwei fünf)
- Leichte Rotation nach außen

Rechte Schulter:
- Spiegele linke Schulter
- Position X plus null Komma acht

Deltoid-Andeutung:
- Füge leichte Erhebung auf Schulter-Geometrie
- Entweder durch Textur-Normal-Map oder zusätzliche Polygone

### Brustbereich (400 Polygone)

Männlich:
- Flachere Form
- Leichte Muskel-Definition durch Geometrie-Wölbung
- Rippenandeutung optional bei High-LOD

Weiblich:
- Füge zwei Erhebungen vorne
- Verwende modifizierte SphereGeometries
- Natürliche Positionierung und Skalierung
- Respektvolle anatomische Korrektheit

### Rücken (200 Polygone)

Schulterblätter-Andeutung:
- Zwei leichte Erhebungen oben
- Entweder durch Geometry oder Normal-Map

Wirbelsäule:
- Leichte vertikale Furche in der Mitte
- Kann auch nur texturiert sein

## 2.3 NPC-Arm-Konstruktion (800 Polygone pro Arm)

### Oberarm (300 Polygone)

Verwende CapsuleGeometry oder modifizierten Zylinder:
- Länge null Komma drei Einheiten
- Radius oben (Schulter): null Komma null fünf
- Radius unten (Ellbogen): null Komma null vier
- Segmente: sechzehn für Glätte

Muskel-Definition:
- Bizeps als leichte Wölbung vorne
- Trizeps als Erhebung hinten
- Durch subtile Geometrie-Modifikation

### Ellbogen (100 Polygone)

Gelenk-Übergang:
- Kleine SphereGeometry als Verbindung
- Radius null Komma null vier fünf
- Position am unteren Ende Oberarm

Knöchel-Andeutung:
- Zwei kleine Erhebungen seitlich
- Entweder zusätzliche Geometrie oder Textur

### Unterarm (250 Polygone)

Ähnlich Oberarm aber:
- Länge null Komma zwei fünf Einheiten
- Radius oben: null Komma null vier
- Radius unten (Handgelenk): null Komma null drei
- Verjüngung zum Handgelenk stärker

### Hand (150 Polygone)

Handfläche:
- Verwende abgeflachte BoxGeometry
- Dimensionen: null Komma null acht breit, null Komma eins lang, null Komma null zwei fünf dick
- Leichte Wölbung (nicht perfekt flach)

Finger (Vier Finger plus Daumen):
- Jeder Finger drei Segmente (Grundglied, Mittelglied, Endglied)
- Segment-Längen abnehmend (null Komma null drei, null Komma null zwei fünf, null Komma null zwei)
- Segment-Durchmesser abnehmend
- Gelenke als winzige Kugeln zwischen Segmenten

Daumen (speziell):
- Nur zwei Segmente
- Ausrichtung neunzig Grad zur Seite
- Dickere Segmente als andere Finger
- Position seitlich an Handfläche

## 2.4 NPC-Bein-Konstruktion (1.000 Polygone pro Bein)

### Oberschenkel (400 Polygone)

Verwende CapsuleGeometry oder Zylinder:
- Länge null Komma fünf Einheiten (etwa wie Torso-Höhe)
- Radius oben (Hüfte): null Komma eins
- Radius unten (Knie): null Komma null sieben
- Verjüngung deutlich sichtbar

Muskulatur:
- Quadrizeps vorne als Wölbung
- Oberschenkel-Rückseite (Hamstrings) angedeutet

### Knie (150 Polygone)

Kniescheibe:
- Kleine abgeflachte SphereGeometry
- Position vorne mittig
- Radius null Komma null fünf

Gelenk:
- SphereGeometry als Übergang
- Radius null Komma null sieben

### Unterschenkel (350 Polygone)

Wade (oberer Teil):
- Dickste Stelle oben-hinten
- CapsuleGeometry mit Radius null Komma null sechs oben
- Verjüngung zu null Komma null vier unten
- Länge null Komma vier Einheiten

Wadenmuskel-Form:
- Asymmetrisch (hinten dicker)
- Durch Skalierung oder Geometrie-Modifikation

### Knöchel und Fuß (100 Polygone)

Knöchel:
- Zwei kleine SphereGeometries seitlich
- Position am Ende Unterschenkel
- Radius null Komma null drei

Fuß-Hauptteil:
- BoxGeometry als Basis
- Dimensionen: null Komma eins breit, null Komma null fünf hoch, null Komma zwei fünf lang
- NICHT flach - leichte Wölbung (Fußgewölbe)

Ferse:
- Gerundete Form hinten
- Separate SphereGeometry oder Teil der Hauptbox

Zehen (vereinfacht):
- Fünf kleine zylindrische Segmente
- Oder ein gemeinsamer Zehenblock
- Position vorne am Fuß

Schuh (wenn vorhanden):
- Umhüllt Fuß-Geometrie
- Sohle als separate dickere Schicht unten
- Schnürung optional (Textur oder Geometrie)

---

# 📋 TEIL 3: GEBÄUDE-KONSTRUKTIONS-DIREKTIVEN

## 3.1 Fenster-Modul (1.500 Polygone pro Fenster)

### Außenrahmen (Fasche) (400 Polygone)

Erstelle vier BoxGeometries für Rahmen:
- Oben: Breite eins, Höhe null Komma eins, Tiefe null Komma zwei
- Unten: Identisch zu oben
- Links: Höhe eins Komma zwei, Breite null Komma eins, Tiefe null Komma zwei
- Rechts: Identisch zu links

Position so dass Innenbereich frei bleibt.

### Fensterbrett (Gesims) (200 Polygone)

Horizontale BoxGeometry unter Fenster:
- Breite eins Komma zwei (ragt über Rahmen)
- Höhe null Komma null acht
- Tiefe null Komma zwei (ragt nach vorne)
- Position unterhalb unterem Rahmen

Vorderseite leicht abgeschrägt (nicht perfekt rechtwinklig).

### Glasfläche (300 Polygone)

PlaneGeometry für Glas:
- Dimensionen passend zu Innenbereich des Rahmens
- Material: MeshPhysicalMaterial
- Transmission: null Komma neun fünf (fast durchsichtig)
- Roughness: null Komma null fünf (sehr glatt)
- IOR: eins Komma fünf (Brechungsindex Glas)
- Color: Leichter Grünstich (Hex E acht F fünf E neun)

### Fensterkreuz (Sprossen) (300 Polygone)

Vertikale und horizontale dünne BoxGeometries:
- Eine vertikale Sprosse in Mitte
- Eine horizontale Sprosse in Mitte
- Dimensionen: null Komma null drei breit, Länge variabel, null Komma null zwei dick
- Material identisch zu Rahmen

Kreuzung in Mitte:
- Kleine Box als Verbindung
- Sichtbar von vorne

### Verdachung (200 Polygone)

Optional über Fenster:

Dreieck-Form:
- Verwende BufferGeometry mit Custom-Vertices
- Dreieck-Spitze über Fenster-Mitte
- Basis-Breite eins Komma zwei

Oder Bogen-Form:
- Verwende CylinderGeometry (halber Zylinder)
- Radius null Komma zwei, Breite eins Komma zwei

### Innere Details (100 Polygone)

Optional bei Close-Up:
- Vorhang-Andeutung hinter Glas
- Fensterbrett-Innenseite
- Rahmen-Rückseite

## 3.2 Tür-Modul (3.000 Polygone)

### Türrahmen (Portal) (800 Polygone)

Drei BoxGeometries:
- Oben (Sturz): Breite eins, Höhe null Komma zwei, Tiefe null Komma drei
- Links (Gewände): Höhe zwei Komma zwei, Breite null Komma zwei, Tiefe null Komma drei
- Rechts: Identisch zu links

Bei Eingangsportal:
- Bogen statt flacher Sturz
- Verwende CylinderGeometry als Halbkreis
- Schlussstein (zentraler Keil) als separate Geometrie

### Türblatt (1.200 Polygone)

Haupt-Geometrie:
- BoxGeometry mit Dimensionen null Komma acht breit, zwei hoch, null Komma null fünf dick
- Material mit Holz-Textur oder einfarbig

Details auf Türblatt:
- Füllungen (Kassetten): Vier bis sechs rechteckige Vertiefungen
- Jede Füllung als separate flache Box oder durch Normal-Map
- Anordnung symmetrisch

### Türgriff (150 Polygone)

Besteht aus:
- Griff-Stange: CylinderGeometry horizontal
- Rosette (Basis): Flache CylinderGeometry als Scheibe
- Schild (optional): BoxGeometry mit Schlüsselloch

Position:
- Höhe eins Komma null fünf über Boden
- Seitlich am Türblatt (nicht mittig)

### Oberlicht (600 Polygone)

Wenn hasTransom true:
- Glasfläche über Tür
- Ähnlich Fenster-Glas-Material
- Rahmen um Glas
- Sprossen optional

### Schwelle (250 Polygone)

Erhöhte BoxGeometry am Boden:
- Breite eins Komma zwei
- Höhe null Komma null fünf
- Tiefe null Komma drei
- Material Stein oder Holz

## 3.3 Wand-Segment mit Aussparungen

### Basis-Wand

Große BoxGeometry:
- Dimensionen gemäß Props (width, height, depth)
- Standard-depth: null Komma drei für Außenwände
- Material mit Fassaden-Textur

### Fenster-Aussparungen

NICHT einfach Löcher stanzen.

STATTDESSEN:
- Erstelle Wand aus mehreren Teil-Geometrien
- Segmentiere Wand um Fenster herum
- Füge Fenster-Module in Öffnungen ein
- Fenster-Rahmen überdecken Schnittkanten

Alternative mit CSG (Constructive Solid Geometry):
- Nutze three-csg Bibliothek
- Subtrahiere Fenster-Öffnungen von Wand
- Füge Fenster-Module hinzu

### Gesimse (horizontale Bänder)

Zwischen Stockwerken:
- BoxGeometry horizontal über gesamte Wand-Breite
- Höhe null Komma zwei, Tiefe null Komma eins (ragt vor)
- Position zwischen Geschossen

## 3.4 Komplettes Gebäude-System

### Erdgeschoss-Modul (15.000 Polygone)

Höhe vier bis fünf Meter.

Komponenten:
- Rustika-Fassade: Quaderstein-Optik
  - Entweder echte Geometrie (teuer) oder Normal-Map
  - Jeder "Stein" leicht versetzt
- Eingangsportal: Siehe Tür-Modul mit Bogen
- Schaufenster (zwei bis drei): Große Glasflächen
  - Breite zwei bis drei Meter
  - Höhe zwei Komma fünf Meter
  - Rahmen um Glas

### Obergeschoss-Modul (10.000 Polygone pro Geschoss)

Standard-Geschoss wiederholt für Stockwerke zwei bis fünf.

Komponenten:
- Wand-Segment mit drei Fenstern
- Balkon (optional):
  - Plattform als BoxGeometry
  - Brüstung als schmiedeeisernes Gitter
  - Tür vom Innenraum zum Balkon
- Gesims als Abschluss oben

### Dach-Modul (12.000 Polygone)

Dachform (Mansarddach typisch für Wien):
- Unterer steilerer Teil
- Oberer flacherer Teil
- Gauben (Dachfenster) eingesetzt

Komponenten:
- Dachflächen: Große Planes mit Neigung
- Dachziegel: Entweder Textur oder echte Geometrie
- Gauben (zwei bis drei): Mini-Fenster im Dach
- Schornsteine (zwei bis drei): Vertical BoxGeometries
- Kranzgesims: Abschluss zwischen Wand und Dach

### Fassaden-Ornamente (8.000 Polygone)

Stuck-Elemente:
- Blumenmotive über Fenstern
- Verwende SphereGeometries und BoxGeometries kombiniert
- Anordnung symmetrisch

Medaillons:
- Runde Reliefs an Fassade
- CylinderGeometry als Basis, Relief darauf

Pilaster:
- Vertikale Gliederung zwischen Fenstern
- BoxGeometry mit Kapitell oben

---

# 📋 TEIL 4: TEXTUR-ERSTELLUNGS-DIREKTIVEN

## 4.1 Canvas-basierte Textur-Generierung

### Haut-Textur (1024×1024 Canvas)

Ablauf Wort-für-Wort:

Erstelle neues HTML Canvas Element.
Setze Größe auf eintausendvierundzwanzig mal eintausendvierundzwanzig Pixel.
Hole zwei D Rendering-Kontext vom Canvas.

Schritt eins - Basis-Farbe:
Fülle gesamtes Canvas mit RGB zweihundertfünfunddreißig, einhundertfünfundneunzig, einhundertsiebzig (heller Hautton).

Schritt zwei - Noise-Variation:
Iteriere über alle Pixel.
Für jeden Pixel addiere zufälligen Wert zwischen minus fünf und plus fünf zu jedem RGB-Kanal.
Dies erzeugt natürliche Farb-Variation.

Schritt drei - Rötliche Bereiche:
Male Kreise an Wangen-Positionen (dreihundertzwölf, dreihundertzwölf und siebenhundertzwölf, dreihundertzwölf).
Radius hundert Pixel.
Farbe rötlich: RGB plus zwanzig zum Rot-Kanal.
Weicher Übergang mit Gradient.

Ähnlich für Nase und Ohren.

Schritt vier - Dunkle Bereiche:
Male dunklere Bereiche unter Augen (Augenringe).
Position fünfhundertzwölf, vierhundertfünfzig.
Farbe RGB minus zwanzig alle Kanäle.

Bartschatten bei männlichen NPCs:
Male Bereich unter Nase und Kinn.
Grau-bläulicher Ton.

Schritt fünf - Detail-Punkte:
Male viele winzige Punkte (ein bis zwei Pixel) zufällig verteilt.
Dies simuliert Poren und Sommersprossen.
Farbe leicht dunkler als Basis.

Schritt sechs - Konvertierung:
Erstelle Three punkt js CanvasTexture aus Canvas.
Setze needsUpdate auf true.
Return Textur-Objekt.

### Stoff-Textur (512×512 Canvas)

Ablauf:

Erstelle Canvas fünfhundertzwölf mal fünfhundertzwölf.
Fülle mit Basis-Stoff-Farbe (Parameter).

Webart-Muster:
Zeichne horizontale Linien alle vier Pixel.
Farbe leicht heller als Basis.
Zeichne vertikale Linien alle vier Pixel.
Farbe leicht dunkler als Basis.
Dies erzeugt Gitter-Muster (Webart-Simulation).

Noise hinzufügen:
Für jeden Pixel füge leichte Farb-Variation hinzu.
Plus minus drei zu jedem Kanal.

Konvertiere zu CanvasTexture.

### Ziegel-Textur (1024×1024 Canvas)

Ablauf:

Fülle Canvas mit Mörtel-Farbe hellgrau.

Ziegel-Schleife:
Iteriere in Reihen (Höhe zweiunddreißig Pixel).
Jede zweite Reihe horizontal um halben Ziegel versetzt.
Pro Reihe zeichne Ziegel (Breite vierundsechzig Pixel).

Pro Ziegel:
Fülle Rechteck mit Ziegel-Farbe (Rot-Braun mit Variation).
Jeder Ziegel leicht andere Farbe (plus minus zwanzig zu jedem Kanal).
Lasse zwei Pixel Rand frei (Mörtelfuge).

Konvertiere zu CanvasTexture.

### Asphalt-Textur (1024×1024 Canvas)

Fülle mit Dunkelgrau RGB sechzig, sechzig, fünfundsechzig.

Noise-Intensiv:
Für jeden Pixel addiere starkes Noise.
Plus minus fünfzehn zu jedem Kanal.
Erzeugt körnige Asphalt-Textur.

Flecken:
Male zwanzig bis dreißig unregelmäßige Bereiche.
Manche heller (Flicken), manche dunkler (Ölflecken).
Verwende fill Style mit rgba und Alpha für weiche Kanten.

Risse:
Zeichne dünne schwarze Linien zufällig.
Linienbreite eins bis zwei Pixel.
Unregelmäßiger Verlauf.

Konvertiere zu CanvasTexture.

## 4.2 Normal-Map-Generierung (Advanced)

Für echte Tiefen-Simulation ohne Polygone.

Haut-Normal-Map:
Basierend auf Albedo-Textur.
Konvertiere Variations-Muster zu Höhen-Daten.
Berechne Normals aus Höhen.
Speichere als RGB (X, Y, Z Komponenten der Normal-Vektoren).

Stoff-Normal-Map:
Aus Webart-Muster.
Linien werden zu Erhebungen.
Normale zeigen orthogonal zu Fläche.

## 4.3 Material-Anwendung

### Haut-Material

Verwende MeshStandardMaterial ODER MeshPhysicalMaterial.

Properties:
- map: Generierte Haut-Textur
- roughness: null Komma sieben (Haut nicht glatt)
- metalness: null (nicht metallisch)
- normalMap: Falls vorhanden Haut-Normal-Map
- normalScale: Vector zwei mit Werten null Komma fünf, null Komma fünf

Optional bei MeshPhysicalMaterial:
- clearcoat: null Komma eins (Glanz bei Schweiß)
- transmission: null Komma null fünf (Subsurface-Andeutung)

### Stoff-Material

MeshStandardMaterial:
- map: Stoff-Textur
- roughness: null Komma acht fünf (rau)
- metalness: null

Bei verschiedenen Stoffen Roughness anpassen:
- Baumwolle: null Komma neun
- Seide: null Komma drei
- Leder: null Komma fünf fünf

### Glas-Material

MeshPhysicalMaterial ZWINGEND (nicht Standard):
- transmission: null Komma neun fünf (durchsichtig)
- roughness: null Komma null fünf (glatt)
- metalness: null
- ior: eins Komma fünf (Glas-Brechungsindex)
- thickness: null Komma null eins
- color: Grünstich Hex E acht F fünf E neun

### Metall-Material

MeshStandardMaterial:
- roughness: null Komma drei (leicht poliert)
- metalness: eins Komma null (voll metallisch)
- envMapIntensity: eins Komma fünf (starke Reflexionen)
- color: Basis-Metallfarbe

---

# 📋 TEIL 5: BELEUCHTUNGS-SYSTEM-DIREKTIVEN

## 5.1 Pflicht-Lichter (MUSS vorhanden sein)

### Direktionales Licht (Sonne)

Typ: DirectionalLight
Intensität: eins Komma acht
Position: Vektor dreiundfünfzig, hundert, dreiundfünfzig
Target: Szenen-Zentrum

Schatten-Konfiguration:
- castShadow: true
- shadow punkt mapSize: Vector zwei mit zweitausendachtundvierzig, zweitausendachtundvierzig
- shadow punkt camera:
  - left: minus fünfzig
  - right: plus fünfzig
  - top: plus fünfzig
  - bottom: minus fünfzig
  - near: null Komma fünf
  - far: zweihundert

### Hemisphäre-Licht

Typ: HemisphereLight
Sky-Color: Hex acht sieben C E E B (helles Himmelblau)
Ground-Color: Hex vier vier drei A zwei E (dunkles Braun für Boden)
Intensität: null Komma vier

### Füll-Licht

Typ: DirectionalLight
Intensität: null Komma drei
Position: Vektor minus dreißig, fünfzig, minus zwanzig
castShadow: false (wichtig!)

Zweck: Verhindert zu harte Schatten auf Gegenseite.

## 5.2 Dynamische Lichter (Straßenlaternen)

Pro Laterne:
Typ: PointLight
Intensität: eins Komma fünf
Distance: achtzehn (Reichweite)
Decay: zwei (physikalisch korrekt)
Color: Hex F F E vier B fünf (warmweiß für historische Laternen)

Aktivierung zeitabhängig:
NUR wenn gameTime größer als achtzehnhundert (achtzehn Uhr) UND kleiner als einundzwanzig tausend sechshundert (sechs Uhr).

Wichtig: Straßenlaternen dürfen NICHT Schatten werfen (zu teuer bei vielen Lichtern).

## 5.3 Fahrzeug-Lichter

Scheinwerfer (pro Fahrzeug zwei Stück):
Typ: SpotLight
Intensität: zwei Komma null
Angle: null Komma fünf zwei drei (dreißig Grad)
Penumbra: null Komma fünf (weicher Rand)
Distance: fünfzig
castShadow: true (nur diese!)
shadow punkt mapSize: Vector zwei eintausendvierundzwanzig, eintausendvierundzwanzig

Blaulicht (nur Polizei):
Typ: PointLight
Color wechselt zwischen Blau (Hex null null null null F F) und aus.
Wechsel-Frequenz: einmal pro Sekunde.
Intensität: drei Komma null.
Distance: dreißig.

---

# 📋 TEIL 6: PERFORMANCE-OPTIMIERUNGS-DIREKTIVEN

## 6.1 Instanced-Rendering (ZWINGEND für NPCs)

Statt individueller Meshes für jeden NPC:

Erstelle InstancedMesh für jeden NPC-Typ.
Parameter: Geometrie, Material, Anzahl Instanzen.

Beispiel für Demonstranten:
- Eine InstancedMesh für alle Demonstranten-NPCs.
- Count: Anzahl Demonstranten im Level.
- Geometrie: Basis-NPC-Geometrie aus Konstruktions-Direktiven.

Pro Frame Update:
- Iteriere über alle NPC-Positionen.
- Für jeden NPC setze Matrix (Position, Rotation, Scale).
- Verwende setMatrixAt Methode mit Index.
- Nach allen Updates: Setze instanceMatrix punkt needsUpdate auf true.

Vorteil: Fünfhundert NPCs = EINE Draw-Call statt fünfhundert.

Limitation: Alle Instanzen eines Meshes müssen gleiches Material haben.
Lösung: Gruppiere NPCs nach Typ (Demonstrator, Police, Civilian = drei InstancedMeshes).

## 6.2 LOD-Switching-Logik

Für jeden NPC berechne Distanz zur Kamera:
- Hole Kamera-Position: camera punkt position.
- Hole NPC-Position: npc punkt position.
- Berechne Distanz: camera punkt position punkt distanceTo npc punkt position.

Entscheidungsbaum:
- Wenn Distanz kleiner zehn: Rendere LOD-null (acht tausend Polygone).
- Sonst wenn Distanz kleiner dreißig: Rendere LOD-eins (zweitausend Polygone).
- Sonst wenn Distanz kleiner siebzig: Rendere LOD-zwei (fünfhundert Polygone).
- Sonst: Rendere LOD-drei (vier Polygone Billboard).

Hysteresis (Anti-Flacker-Mechanismus):
LOD-Wechsel erfolgt erst bei plus zehn Prozent der Distanz.
Beispiel: Wechsel von LOD-null zu LOD-eins bei elf Meter.
Zurück von LOD-eins zu LOD-null bei neun Meter.

## 6.3 Frustum-Culling

Stelle sicher dass Frustum-Culling aktiv ist:
- Für alle Meshes: mesh punkt frustumCulled gleich true (Standard).
- Three punkt js cullt automatisch Objekte außerhalb Kamera-Sichtfeld.

Für große Objekte (Stephansdom):
- Eventuell frustumCulled auf false setzen wenn Culling-Fehler auftreten.
- Oder passe Bounding-Sphere an.

## 6.4 Occlusion-Culling (für Gebäude)

Implementiere manuelles Occlusion-Culling:

Für jedes Gebäude checke:
- Ist Gebäude hinter anderem Gebäude von Kamera-Position?
- Wenn ja: Setze visible auf false.
- Wenn nein: Setze visible auf true.

Vereinfachter Ansatz:
- Raycasting von Kamera zu Gebäude.
- Wenn Ray ein anderes Gebäude trifft zuerst: Okklusion.

Wichtig: Nur bei statischen Objekten anwenden (bewegliche NPCs nicht).

## 6.5 Shadow-Map-Optimierung

Reduziere Schatten-Qualität bei Bedarf:
- shadow punkt mapSize von zweitausendachtundvierzig auf eintausendvierundzwanzig.
- Nur wichtige Objekte (Spieler, nahe NPCs) sollen Schatten werfen.
- Für LOD-zwei und LOD-drei NPCs: castShadow gleich false.

Shadow-Camera-Bounds anpassen:
- Eng um Hauptaktions-Bereich.
- Nicht gesamte Map abdecken (Verschwendung).

---

# 📋 TEIL 7: VALIDIERUNGS-DIREKTIVEN

## 7.1 Polygon-Count-Validierung

Schreibe Debug-Funktion countPolygons:

Funktion nimmt Szene als Parameter.
Initialisiere Variable totalPolygons auf null.

Traversiere Szene mit scene punkt traverse Methode.
Callback-Funktion pro Objekt:
- Checke ob object punkt geometry existiert.
- Wenn ja:
  - Hole Geometrie-Referenz.
  - Checke ob geometry punkt index existiert (indexed Geometrie).
  - Wenn indexed: polygonCount gleich geometry punkt index punkt count geteilt durch drei.
  - Wenn nicht indexed: polygonCount gleich geometry punkt attributes punkt position punkt count geteilt durch drei.
  - Addiere polygonCount zu totalPolygons.
  - Console punkt log: Objektname und polygonCount.

Nach Traversierung: Console punkt log gesamte totalPolygons.

Rufe Funktion auf nach Szene-Initialisierung.

Erwartetes Ergebnis:
- Desktop Medium: Zwischen zwei Millionen und drei Millionen Polygone.
- Einzelner LOD-null NPC: Zwischen siebentausend und achttausendfünfhundert Polygone.
- Stephansdom: Zwischen fünfhundertfünfzigtausend und sechshundertfünfzigtausend Polygone.

## 7.2 FPS-Monitoring

Füge Stats punkt js hinzu:
- Importiere Stats von Stats punkt js Library.
- Erstelle Stats-Instanz.
- Füge Stats punkt dom-Element zu document punkt body hinzu.
- Pro Frame: Rufe stats punkt update auf.

Ziel-FPS:
- Desktop Medium: Minimum sechzig FPS bei fünfhundert NPCs.
- Wenn unter fünfzig FPS: Aktiviere Performance-Optimierungen.
- Wenn unter dreißig FPS: Kritischer Fehler, überarbeite Geometrie.

## 7.3 Draw-Call-Zählung

Nach jedem Frame lese renderer punkt info:
- renderer punkt info punkt render punkt calls: Anzahl Draw-Calls.
- renderer punkt info punkt render punkt triangles: Gerenderte Triangles.

Target:
- Draw-Calls: Unter vierhundert (Desktop Medium).
- Wenn über sechshundert: Instanced-Rendering nicht korrekt implementiert.

## 7.4 Visuelle Inspektion

Für jeden NPC-Typ erstelle Test-Szene:
- Spawne einen NPC im LOD-null.
- Platziere Kamera zwei Meter vor NPC.
- Mache Screenshot (automatisch oder manuell).

Checkliste pro Screenshot:
- Ist Kopf erkennbar als Kopf? (Nicht nur Kugel)
- Sind Augen sichtbar?
- Ist Nase erkennbar?
- Sind Arme und Beine separate Geometrien?
- Sind Hände erkennbar? (Nicht Stümpfe)
- Ist Kleidung separate Layer über Körper?
- Ist Gesamt-Eindruck "menschlich"? (Nicht Strichmännchen)

Für Gebäude:
- Sind Fenster erkennbar mit Rahmen?
- Ist Dach vorhanden?
- Sind mehrere Stockwerke sichtbar?

## 7.5 Textur-Validierung

Checke für jedes Material ob map-Property gesetzt ist.
Wenn Textur vorhanden:
- Überprüfe Textur punkt image existiert.
- Checke Auflösung: Minimum fünfhundertzwölf mal fünfhundertzwölf.
- Checke needsUpdate Flag wurde gesetzt.

Wenn keine Textur:
- Ist einfarbiges Material akzeptabel für diesen Fall?
- Wenn nicht: Erstelle Textur wie in Textur-Direktiven beschrieben.

---

# 📋 TEIL 8: PRIORISIERTE IMPLEMENTATIONS-REIHENFOLGE

## Phase eins: NPC-Basis (Tag eins bis zwei)

Fokus: Einen einzelnen anatomisch korrekten NPC erstellen.

Schritte:
eins: Erstelle Kopf gemäß Anatomie-Direktiven (eintausendachthundert Polygone).
zwei: Erstelle Torso (eintausendfünfhundert Polygone).
drei: Erstelle beide Arme (eintausendsechshundert Polygone total).
vier: Erstelle beide Beine (zweitausend Polygone total).
fünf: Erstelle Kleidung (eintausendeinhundert Polygone).
sechs: Teste Polygon-Count (sollte etwa achttausend sein).
sieben: Mache Screenshot zur Validierung.

Akzeptanzkriterium:
- NPC sieht menschlich aus.
- Polygon-Count zwischen siebentausend und neuntausend.
- Screenshot zeigt erkennbare Anatomie.

## Phase zwei: NPC-Variation (Tag drei)

Erstelle drei NPC-Typen:
- Demonstrator mit Rucksack und Demo-Schild.
- Polizist mit Helm und Weste.
- Zivilist neutral.

Für jeden Typ:
- Basis-NPC kopieren.
- Spezifische Accessoires hinzufügen gemäß Direktiven.
- Teste Polygon-Count bleibt in Budget.

## Phase drei: LOD-System (Tag vier)

Für jeden NPC-Typ erstelle drei LOD-Versionen:
- LOD-null: Wie bereits erstellt (achttausend Polygone).
- LOD-eins: Vereinfachung erstellen (zweitausend Polygone).
  - Reduziere Segmente in Geometrien.
  - Entferne Finger-Details.
  - Vereinfache Gesicht.
- LOD-zwei: Stark vereinfacht (fünfhundert Polygone).
  - Nur Basis-Formen.
  - Kopf als Ellipsoid.
  - Keine Details.
- LOD-drei: Billboard (vier Polygone).
  - Plane mit Alpha-Textur.
  - Immer zur Kamera rotiert.

Implementiere LOD-Switching-Logik gemäß Performance-Direktiven.

## Phase vier: Instanced-Rendering (Tag fünf)

Konvertiere individuelle NPC-Meshes zu InstancedMeshes.
Implementiere Matrix-Update-System.
Teste Performance mit fünfhundert NPCs.
Ziel: Sechzig FPS erreichen.

## Phase fünf: Stephansdom (Tag sechs bis acht)

Fokus: Haupt-Wahrzeichen erstellen.

Tag sechs: Südturm (einhundertfünfzigtausend Polygone).
Tag sieben: Kirchenschiff und Dach (zweihunderttausend Polygone).
Tag acht: Fenster und Details (zweihundertfünfzigtausend Polygone).

Validierung: Stephansdom erkennbar als Stephansdom.

## Phase sechs: Standard-Gebäude (Tag neun bis zehn)

Erstelle modulares Gebäude-System.

Tag neun:
- Fenster-Modul erstellen.
- Tür-Modul erstellen.
- Wand-Segment-Modul erstellen.

Tag zehn:
- Kombiniere Module zu komplettem Gebäude.
- Erstelle mindestens drei verschiedene Gebäude.
- Teste Polygon-Count pro Gebäude (siebzigtausend bis achtzigtausend).

## Phase sieben: Texturen (Tag elf)

Erstelle prozedurale Texturen:
- Haut-Textur für NPCs.
- Stoff-Textur für Kleidung.
- Ziegel-Textur für Gebäude.
- Asphalt-Textur für Straße.

Wende Texturen auf alle Modelle an.

## Phase acht: Beleuchtung (Tag zwölf)

Implementiere Beleuchtungs-System:
- Direktionales Licht (Sonne).
- Hemisphäre-Licht.
- Füll-Licht.
- Straßenlaternen (dynamisch).

Teste Schatten funktionieren korrekt.

## Phase neun: Straßen-Objekte (Tag dreizehn)

Füge hinzu:
- Straßenlaternen (vierzig Stück entlang Straße).
- Bänke (zehn Stück).
- Mülleimer (fünfzehn Stück).
- Bäume (zwanzig Stück als Billboards).

## Phase zehn: Final-Validation (Tag vierzehn)

Kompletter Durchlauf aller Validierungs-Checks:
- Polygon-Count-Validierung.
- FPS-Monitoring (sechzig FPS bei fünfhundert NPCs?).
- Draw-Call-Zählung (unter vierhundert?).
- Visuelle Inspektion aller NPC-Typen.
- Gebäude-Screenshots.
- Textur-Validierung.

Wenn alle Checks bestehen: Projekt freigegeben.
Wenn Checks fehlschlagen: Zurück zu entsprechender Phase und fixen.

---

# 📋 FINALE CHECKLISTE

**PROJEKT NUR AKZEPTABEL WENN ALLE PUNKTE ERFÜLLT:**

**NPCs:**
- [ ] Mindestens drei verschiedene NPC-Typen existieren (Demonstrator, Police, Civilian).
- [ ] Jeder NPC hat mindestens siebentausend Polygone (LOD-null).
- [ ] Kopf mit erkennbaren Gesichtszügen (Augen, Nase, Mund).
- [ ] Torso mit anatomischer Form (nicht Zylinder).
- [ ] Separate Arme mit Händen (Finger erkennbar).
- [ ] Separate Beine mit Füßen.
- [ ] Kleidung als eigene Geometrie-Layer.
- [ ] LOD-System funktioniert (vier Stufen).
- [ ] Instanced-Rendering aktiv (Draw-Calls unter fünf).

**Stephansdom:**
- [ ] Existiert mit minimum fünfhunderttausend Polygonen.
- [ ] Südturm erkennbar mit korrekter Höhe.
- [ ] Dach mit Zickzack-Muster sichtbar.
- [ ] Fenster mit Details (nicht Löcher).
- [ ] Von Ferne als Stephansdom identifizierbar.

**Gebäude:**
- [ ] Mindestens drei verschiedene Gebäude existieren.
- [ ] Jedes Gebäude mindestens sechzigtausend Polygone.
- [ ] Fenster mit Rahmen und Glas (nicht Löcher).
- [ ] Türen mit Portal und Details.
- [ ] Mehrere Stockwerke erkennbar.
- [ ] Dach vorhanden.

**Texturen:**
- [ ] Mindestens vier verschiedene Texturen existieren.
- [ ] Haut-Textur für NPCs.
- [ ] Stoff-Textur für Kleidung.
- [ ] Gebäude-Texturen (Wand, Fenster).
- [ ] Straßen-Textur (Asphalt).
- [ ] Alle Texturen minimum fünfhundertzwölf mal fünfhundertzwölf Auflösung.

**Performance:**
- [ ] Sechzig FPS bei fünfhundert NPCs auf Desktop Medium.
- [ ] Gesamt-Polygon-Count unter drei Millionen (Desktop Medium).
- [ ] Draw-Calls unter vierhundert.
- [ ] Instanced-Rendering funktioniert.
- [ ] LOD-Switching funktioniert.

**Beleuchtung:**
- [ ] Direktionales Licht (Sonne) aktiv.
- [ ] Schatten funktionieren.
- [ ] Hemisphäre-Licht vorhanden.
- [ ] Straßenlaternen bei Nacht aktiv.

**Straßen-Objekte:**
- [ ] Straße mit Textur existiert.
- [ ] Mindestens zwanzig Straßenlaternen.
- [ ] Mindestens fünf Bänke.
- [ ] Mindestens zehn Mülleimer.
- [ ] Mindestens zehn Bäume oder Büsche.

**Validierung:**
- [ ] Polygon-Count-Funktion wurde ausgeführt.
- [ ] FPS-Monitor zeigt konstant sechzig FPS.
- [ ] Draw-Call-Count wurde überprüft.
- [ ] Screenshots aller NPC-Typen gemacht.
- [ ] Screenshots aller Gebäude gemacht.
- [ ] Visueller Vergleich: Vorher (primitiv) vs Nachher (detailliert).

**WENN EIN EINZELNER PUNKT FEHLT: NICHT AKZEPTABEL.**

---

*Dieser ultimative Grafik-Quality-Enforcement-Prompt enthält präzise Polygon-Budgets, anatomische Wort-Anweisungen ohne Code, priorisierte Implementations-Reihenfolge und strikte Validierungs-Kriterien. Befolge jeden Schritt exakt für AAA-Qualität.*
