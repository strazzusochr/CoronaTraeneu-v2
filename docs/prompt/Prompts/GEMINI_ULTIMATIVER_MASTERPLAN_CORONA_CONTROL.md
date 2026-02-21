# 🏆 GEMINI AUTONOMIE-MASTERPLAN: CORONA CONTROL ULTIMATE
## ULTIMATIVER PROFESSIONELLER ENTWICKLUNGS-PROMPT FÜR AAA-QUALITÄT 3D WEB GAME
### Technologie-Stack: React Native (Expo) · React 19 · React Three Fiber · Three.js · Expo Router

---

> **AN DEN GEMINI-AGENTEN:** Du bist ein vollautonomer AAA-Game-Entwickler mit 30+ Jahren Erfahrung in 3D-Webgames, React Three Fiber und modernen WebGL/WebGPU-Technologien. Dieses Dokument ist dein vollständiger Masterplan. Lies ihn vollständig, verstehe die Architektur und implementiere Schritt für Schritt mit höchster Qualität. Kommuniziere und dokumentiere ausnahmslos auf Deutsch. Vor jeder kritischen, irreversiblen Aktion holst du eine ausdrückliche Nutzer-Bestätigung ein.

---

# 📋 TEIL 1: PROJEKT-IDENTITÄT & VISION

## 1.1 Spiel-Konzept

Du entwickelst das Spiel **„Corona Control Ultimate"** — eine AAA-Quality, photorealistische, browserbasierte 3D-Polizei-Simulation, die taktisches Crowd-Management und Deeskalation thematisiert. Das Spiel ist ein einzigartiger historischer Simulator, der den siebzehnten März zweitausendeinundzwanzig in Wien nachbildet — den Tag einer großen Anti-Corona-Maßnahmen-Demonstration am Stephansplatz.

Das Spiel ist kein gewöhnliches Browserspiel. Es besitzt:
- Photorealistisches 3D-Rendering mit PBR-Materialien und dynamischen Schatten
- Mehr als einhundertfünfzig gleichzeitig aktive KI-gesteuerte NPCs mit eigenem Emotional-State
- Eine vollständig simulierte Wiener Altstadt mit dem Stephansdom als Hauptattraktion
- Einen moralisch komplexen Gameplay-Loop ohne einfache Gut-Böse-Dichotomien
- Vollständige deutsche und englische Lokalisierung
- Einen vierundzwanzigstündigen Tag-Nacht-Zyklus in Echtzeit komprimiert auf vierundzwanzig Minuten

## 1.2 Spieler-Erfahrung und Kern-Emotion

Der Spieler schlüpft in die Rolle von Oberstleutnant Stefan Müller, einem siebenunddreißigjährigen erfahrenen Wiener Polizisten. Stefan ist kein Held aus dem Lehrbuch — er ist ein Mensch mit Familie, eigenen Zweifeln und dem ehrlichen Wunsch, ohne Blutvergießen durch diesen Tag zu kommen. Der Spieler spürt den Druck: Hunderte von aufgebrachten Menschen, politische Vorgesetzte die Ergebnisse wollen, Medien die auf einen Skandal warten, und Polizisten die auf Befehle warten. Jede Entscheidung hat Konsequenzen.

## 1.3 Ziel-Plattformen und Performance-Anforderungen

Das Spiel muss in folgenden Umgebungen laufen:
- Moderne Browser: Chrome neunzig+, Firefox achtundachzig+, Safari fünfzehn+, Edge neunzig+
- WebGL zwei-Punkt-null als Basis-Renderer mit WebGPU als optionale Erweiterung
- Mindest-Performance: sechzig Frames pro Sekunde bei einhundertachtzigtausend Polygonen und fünfhundert NPCs auf mittlerer Hardware
- Mobile-Unterstützung via Expo-Router auf iOS und Android (dreißig FPS Minimum)
- Reaktionsfähiges Layout von dreihundertzwanzig Pixel Breite bis viertausend Pixel (4K)

---

# 📋 TEIL 2: TECHNOLOGIE-STACK UND ARCHITEKTUR

## 2.1 Pflicht-Technologien (KEINE AUSNAHMEN)

Du verwendest ausschließlich diese Technologien. Jede Abweichung ist verboten:

**Haupt-Framework:** React Native über Expo SDK fünfzig oder höher mit Web-Support aktiviert. Expo Router Version drei oder höher für alle Navigation. Das Projekt wird mit `create-expo-app` initialisiert mit Template blank-typescript.

**UI-Layer:** React Version neunzehn in der neuesten stabilen Version. Alle Komponenten sind funktionale React-Komponenten mit Hooks. Keine Klassen-Komponenten. useState für lokalen State, useReducer für komplexen State, useEffect für Lifecycle, useCallback und useMemo für Performance-Optimierung.

**3D-Rendering-Layer:** React Three Fiber Version neun oder höher als React-Wrapper für Three.js. Three.js Version null-komma-einhundertachtundfünfzig oder höher als zugrundeliegende 3D-Engine. Drei/Drei (Drei-Bibliothek) für hilfreiche R3F-Utilities wie OrbitControls, useGLTF, Environment, Stats.

**State-Management:** Zustand Version vier oder höher als globaler State-Manager. Kein Redux, kein MobX. Zustand-Stores für: GameState, NPCManager, PlayerState, UIState, AudioState, CameraState.

**Sprache:** TypeScript Version fünf-Punkt-sieben oder höher mit strict-Mode aktiviert. Keine impliziten any-Typen. Alle Interfaces und Types explizit definiert.

**Build-Tool:** Expo Metro Bundler für natives Build. Vite als optionaler Web-Build für bessere Performance beim Web-Export.

## 2.2 Verbotene Technologien

Folgende Technologien dürfen unter keinen Umständen verwendet werden:
- Kein Babylon.js, kein Phaser, kein PlayCanvas, kein A-Frame
- Kein Unity WebGL Export, kein Godot Web-Export
- Kein jQuery, kein Lodash (außer wenn explizit nötig), keine unnötigen Dependencies
- Keine Native-Only-Libraries die kein Web-Support haben
- Kein Class-Based React, kein Redux, kein Context als primärer State-Manager

## 2.3 Ordner-Struktur (Strikt einzuhalten)

Das Projekt-Verzeichnis ist wie folgt strukturiert:

Das Hauptverzeichnis enthält die Expo-Konfigurationsdatei app.json, die TypeScript-Konfiguration tsconfig.json, die Package-Datei package.json, und das Metro-Konfigurationsfile metro.config.js.

Der Ordner namens app enthält alle Expo-Router-Screens. Darin befindet sich die Haupt-Layout-Datei als Underscore-Layout-TSX, der Index-Screen als index.tsx für das Hauptmenü, der Game-Screen als game.tsx für das eigentliche Spiel, der Settings-Screen als settings.tsx, und der Credits-Screen als credits.tsx.

Der Ordner namens src enthält den gesamten Quellcode unterteilt in:
- components: Alle React-Komponenten aufgeteilt in Unterordner ui für zweidimensionale Elemente, scene für dreidimensionale Szenen-Objekte, npc für NPC-Komponenten, environment für Umgebungs-Elemente, und hud für das Heads-Up-Display
- systems: Spielsysteme als TypeScript-Klassen oder Funktionen, darunter NPCSystem, CollisionSystem, AudioSystem, WeatherSystem, TimeSystem, TensionSystem
- stores: Zustand-Store-Definitionen als gameStore.ts, npcStore.ts, playerStore.ts, uiStore.ts, audioStore.ts
- types: Alle TypeScript-Interfaces und Types als Dateien wie GameTypes.ts, NPCTypes.ts, EnvironmentTypes.ts
- utils: Hilfsfunktionen als mathUtils.ts, colorUtils.ts, textureUtils.ts, animationUtils.ts
- assets: Prozedural-generierte Texturen als Funktionen in textureGenerators.ts, Audio-Definitionen, und konstante Daten
- hooks: Custom React Hooks als useGameLoop.ts, useKeyboard.ts, useCollision.ts, useNPCSpawner.ts
- constants: Spielkonstanten als gameConstants.ts, npcConstants.ts, audioConstants.ts

## 2.4 Architektur-Prinzipien

Die Architektur folgt diesen unverbrüchlichen Prinzipien:

**Single Responsibility:** Jede Datei, jede Komponente, jede Funktion hat genau eine klar definierte Aufgabe. Eine NPC-Komponente rendert einen NPC — sie enthält keine Spiellogik.

**Separation of Concerns:** Rendering-Code und Logik-Code sind strikt getrennt. React Three Fiber Komponenten rendern die Szene. Zustand-Stores verwalten den Spielzustand. System-Funktionen verarbeiten Spiellogik.

**Performance First:** Jede Design-Entscheidung priorisiert Performance. Instanced Meshes für alle wiederholten Objekte. Frustum-Culling aktiviert. LOD-System für alle NPCs und Gebäude. Textur-Atlas-Nutzung wo möglich.

**Type Safety:** Keine einzige Stelle im Code hat ein implizites any. Alle NPC-Zustände sind als diskriminierte Unions typisiert. Alle API-Schnittstellen haben vollständige Type-Definitionen.

---

# 📋 TEIL 3: SPIELWELT-SPEZIFIKATION

## 3.1 Hauptschauplatz: Stephansplatz Wien

Der Stephansplatz hat folgende exakte Abmessungen in der Spielwelt: dreihundert Einheiten in X-Richtung (Ost-West) und zweihundert Einheiten in Z-Richtung (Nord-Süd). Eine Einheit entspricht einem realen Meter. Der Platz liegt bei Y-Koordinate null als Referenzniveau.

Der Mittelpunkt des Platzes in Weltkoordinaten ist Null-Null-Null. Der Stephansdom beginnt an Koordinate null-null-minus-vierzig (leicht nördlich vom Zentrum) und erstreckt sich in Z-Richtung bis minus-einhundertzwanzig.

**Bodenbelag:** Der Hauptbereich des Platzes ist mit historischem Wiener Kopfsteinpflaster bedeckt. Dieses Pflaster wird prozedural als Textur generiert: Eine Canvas-Textur in zweitausend mal zweitausend Pixeln Auflösung zeigt das typische Fischgrät-Muster. Jeder Pflasterstein ist ungefähr zehn mal zwanzig Zentimeter groß mit leichter Farbvariation zwischen hellem Grau RGB zweihundert-zweihundert-zweihundert und mittelgrauem Beige RGB einhundertachtzig-einhundertsiebzig-einhundertfünfundsechzig. Die Steine haben subtile Höhenunterschiede durch eine Displacement-Map mit Amplitude von zwei Zentimetern. Fugen zwischen Steinen sind in dunklem Grau RGB achtzig-achtzig-achtzig dargestellt.

**Straßenmarkierungen:** Um den Platz laufen Fahrrad- und Fußgänger-Markierungen als breite weiße Linien, acht Zentimeter Breite, die als separate Mesh-Geometrie über dem Boden liegen mit Y-Offset von einem Millimeter um Z-Fighting zu vermeiden.

## 3.2 Stephansdom: Das Herzstück der Szene

Der Dom ist das wichtigste Geometrie-Objekt der Szene und muss außergewöhnliche Qualität haben. Er wird aus geometrischen Primitiven aufgebaut, nicht aus externen Modellen.

**Haupt-Kirchenschiff:** Ein langer rechteckiger Baukörper vierzig Einheiten breit, siebzig Einheiten lang, dreißig Einheiten hoch. Die Wände bestehen aus prozedural texturiertem Stein in der typischen Wiener Kalkstein-Farbe, einem warmen Gelbbeige bei RGB zweihundertfünfzehn-zweihundert-einhundertsiebenzig. Jede Wand hat regelmäßige Spitzbogenfenster-Öffnungen mit Glasmaterial. Das Dach zeigt das charakteristische Ziegelmuster der Stephansdom-Westfassade in drei Farben: Grün bei RGB siebzig-einhundertdreißig-achtzig für glasierte Ziegel, Gelb bei RGB zweihundertdreißig-einhundertneunzig-sechzig für helle Ziegel, und Dunkelgrau-fast-Schwarz bei RGB fünfzig-fünfzig-fünfzig für den Rahmen.

**Südturm:** Der berühmte Südturm ist das Markenzeichen des Doms. Er ragt einhundertsiebenunddreißig Einheiten in die Höhe (einhundertsiebenunddreißig Meter Höhe im Original). Er beginnt als breites quadratisches Fundament zwanzig mal zwanzig Einheiten und verjüngt sich stufenweise in mehreren Oktagonalen Stufen bis zur Spitze. Jede Stufe ist geometrisch korrekt mit gotischen Fialen, Wimpergen und Maßwerk-Elementen aus einfachen Geometrien zusammengebaut. Die Spitze trägt ein goldenes Kreuz aus BoxGeometry-Elementen mit metallischem Material.

**Romanischer Westturm:** Ein zweiter, niedrigerer Turm siebzig Einheiten hoch auf der Nordseite der Westfassade, im romanischen Stil mit flacher Turmhaube.

**Eingangstore:** Die drei Haupt-Portale auf der Westseite sind jeweils acht Einheiten breit und vierzehn Einheiten hoch, ausgeführt als tiefe Spitzbogen-Nischen mit mehrfach gestuftem Gewände aus BoxGeometry-Profilen. Im Innern des Portals ist eine dunkle Holztür-Geometrie sichtbar.

**Detaillierung der Fassade:** Die Fassade trägt Statuen als vereinfachte menschliche Silhouetten aus SphereGeometry für den Kopf und CapsuleGeometry für den Körper, zwischen dreißig und einhundert Zentimeter Größe, verteilt in den Nischen. Diese Statuen sind steinfarben texturiert.

**Glasfenster:** Alle Kirchenfenster erhalten ein semitransparentes Material mit transmission-Wert von null-komma-acht und leichter Farbe: Dunkelblau-Violett für die großen Rosettenfenster, Buntglas-Mix für die Seitenschiff-Fenster.

## 3.3 Umgebungsgebäude: Wiener Altstadt-Architektur

Um den Stephansplatz stehen historische Gebäude im Gründerzeit- und Barock-Stil. Du erstellst mindestens sechs vollständig detaillierte Gebäude-Blöcke:

**Allgemeiner Gebäude-Aufbau (für alle Gründerzeit-Häuser):**

Jedes Gebäude ist modular aus wiederverwendbaren Komponenten aufgebaut. Das Fundament ist ein einfacher grauer Sockel zwei Einheiten hoch und leicht nach vorne versetzt zur Fassade. Die Fassade hat Breiten zwischen zwölf und vierzig Einheiten und Höhen zwischen fünfzehn und dreißig Einheiten für drei bis fünf Stockwerke.

**Fenster-Komponente (wiederverwendbar):** Jedes Fenster besteht aus einem äußeren Rahmen aus vier schmalen BoxGeometry-Elementen (jeweils zehn Zentimeter breit, zehn Zentimeter tief), einem Fensterbrett als flacher Box unten die fünfzehn Zentimeter nach vorne ragt, einem Glasfläche als Plane-Mesh mit semitransparentem Material (transmission null-komma-sieben, leichter Grünstich), einem Kreuz-Sprossen aus zwei dünnen BoxGeometry-Elementen die das Glas in vier Felder teilen, und optionalen Fensterläden als zwei klappbare BoxGeometry-Panels.

**Erdgeschoss:** Das Erdgeschoss hat eine Höhe von vier bis fünf Einheiten. Die großen Schaufenster sind drei Einheiten breit und zwei-komma-fünf Einheiten hoch. Die Haupteingangstür ist zwei Einheiten breit, drei Einheiten hoch, mit Verdachung (kleinem Vordach) aus einer flachen Box, einem dekorativen Schlussstein als SphereGeometry abgeflacht über der Tür, und einem Griff aus einem kleinen Zylinder.

**Obergeschosse:** Jedes Obergeschoss ist drei-komma-fünf Einheiten hoch und trägt drei bis fünf Fenster symmetrisch verteilt. Die Brüstungsfelder zwischen Fenstern im zweiten Stock haben Reliefdekor als flache BoxGeometry-Ornamente. Das Hauptgesims zwischen Erdgeschoss und erstem Obergeschoss ist ein deutlich vorspringendes horizontales Profil aus zwei BoxGeometry-Elementen übereinander.

**Dachzone:** Das Dach ist ein flaches Wiener Mansarddach mit leichter Neigung. Auf dem Dach befinden sich Dachgauben als kleine Giebelfenster, Kamine aus zylindrischen Geometrien mit Schrägabdeckung, und Dachrinnen aus sehr dünnen langen Boxen an den Traufkanten.

**Haas-Haus (Gegenüber dem Dom):** Das Haas-Haus ist ein modernes Glasgebäude im Kontrast zur historischen Umgebung. Hier verwendest du eine unregelmäßige polygonale Form mit vollverglasten Fassaden, Spiegelglas-Material mit hoher Reflektivität (roughness null-komma-null-fünf, metalness null-komma-zwei, envMapIntensity drei-komma-null), und einer geschwungenen Dach-Silhouette.

## 3.4 Straßenausstattung und Umgebungsdetails

**Straßenlaternen:** Es stehen vierzig Wiener Gaslaternen im klassischen Stil um den Platz, alle vier-komma-fünf Einheiten hoch, im Abstand von fünfzehn Einheiten. Jede Laterne besteht aus einem gusseisernen Mast (schwarzer Zylinder mit leichter Verjüngung nach oben), einem schmiedeeisernen Ausleger (Bogen aus einer Torus-Geometrie), und einem Laternenkopf (oktagonales Prisma mit Glasscheiben). Nachts leuchten sie mit einem PointLight warm-gelb bei Farbe RGB zweihundertfünfzig-zweihundertfünfundzwanzig-einhundertsiebzig und Intensität eins-komma-fünf und Reichweite zwanzig Einheiten.

**Bänke:** Dreißig Parkbänke aus Gusseisen und Holz, grob sechs Einheiten lang und null-komma-fünfundsiebzig Einheiten hoch, bestehend aus Sitzflächen-Latten als fünf flache BoxGeometry-Elemente, einem Rahmen aus schwarzen Eisen-Profilen, und Rückenlehnen-Latten.

**Mistkübel (Mülleimer):** Zwanzig Wiener-Standard-Mülleimer, dreißig Zentimeter Durchmesser, eins-komma-zwei Meter hoch, aus grauem Kunststoff mit Stadtlogo-Textur.

**Hinweisschilder und Verkehrszeichen:** Zehn Straßenschilder, acht Verkehrszeichen, vier U-Bahn-Eingangsschilder mit dem typischen Wiener-Linien-U und Stationsnamen Stephansplatz.

**Fahrzeuge:** Drei stationäre Einsatzfahrzeuge der Polizei (weiß mit grüner Schrift, Blaulicht oben), zwei Krankenwagen, und ein Feuerwehrauto, alle aus geometrischen Primitiven gebaut mit korrekten Proportionen.

**Tauben:** Sechzig bis einhundert Tauben als Billboard-Sprites (immer zur Kamera gedrehte Planes mit Vogel-Textur), die über den Platz flattern mit einfachem Boids-Flocking-Algorithmus.

---

# 📋 TEIL 4: NPC-SYSTEM (HERZSTÜCK DES SPIELS)

## 4.1 NPC-Klassen und ihre Rollen

Das Spiel hat fünf grundlegende NPC-Typen:

**Demonstranten:** Zweihundert bis dreihundert Menschen die friedlich oder aggressiv demonstrieren. Sie tragen Schilder, skandieren Parolen, und bewegen sich in der Crowd-Masse. Kleidung ist zivil, bunt gemischt, viele mit Schals und Masken gegen Kälte und aus Symbolik.

**Polizisten:** Hundert bis hundertfünfzig Beamte in vollständiger Einsatzausrüstung. Schutzhelm, Schutzweste, Schlagstock, und Schutzschild für Bereitschaftspolizisten. Standard-Uniform für normale Beamte. Sie bewegen sich in Formationen und reagieren auf Spieler-Befehle.

**Zivilisten:** Fünfzig bis hundert unbeteiligte Passanten, Touristen, und Schaulustigen. Sie versuchen dem Geschehen auszuweichen oder beobachten es von sicherer Distanz.

**Medien:** Fünfzehn bis dreißig Journalisten und Kameraleute. Sie bewegen sich gezielt zu spannenden Ereignissen und filmen alles. Was in ihrer Kamera landet beeinflusst die öffentliche Meinung.

**Führungspersonen:** Drei bis fünf Demo-Anführer und ein bis drei politische Beobachter mit eigenen Namen, Persönlichkeiten, und Dialogen. Sie sind zentral für die Story-Progression.

## 4.2 NPC-Anatomie (Visuelle Darstellung)

Jeder NPC wird aus geometrischen Primitiven zusammengebaut — keine externen Modelle, keine GLB-Dateien. Die Qualität muss erkennbar menschlich sein, kein Strichmännchen.

**Kopf-Aufbau:** Der Kopf ist eine SphereGeometry mit zweiunddreißig horizontalen und vierundzwanzig vertikalen Segmenten, skaliert auf Y-Achse mit Faktor eins-komma-fünfzehn für ovale Form, und Z-Achse mit Faktor null-komma-neun für leichte Abflachung. Hautfarbe ist NPC-individuell mit Variation zwischen RGB zweihundertfünfunddreißig-zweihundert-einhundertachtzig für hell und RGB einhundertsiebzig-hundertdreißig-neunzig für dunkler.

**Augen:** Zwei kleine weiße Kugeln (Augäpfel), davor je eine farbige Iris-Scheibe (CylinderGeometry sehr flach, Radius null-komma-null-vier), und eine schwarze Pupillen-Scheibe noch davor. Augenbrauen als flache Boxen in Haarfarbe leicht über den Augäpfeln. Die Augen öffnen und schließen sich in einem Blink-Zyklus alle drei bis acht Sekunden.

**Nase:** Drei verbundene Elemente: Nasenrücken als schmaler BoxGeometry-Quader leicht nach vorne geneigt, Nasenspitze als kleine Kugel, und zwei winzige Nasenflügel-Kugeln links und rechts.

**Mund:** Eine dünne horizontale Furche aus zwei BoxGeometry-Elementen übereinander für Ober- und Unterlippe. Bei Sprechen-Animation öffnet sich der Mund um fünf Grad Rotation auf der Unterlippe.

**Ohren:** Abgeflachte Kugeln an den Seiten des Kopfes, skaliert auf eins-komma-drei in Y und null-komma-vier in Z.

**Haare:** Eine leicht größere Kugel-Kappe über dem SchädelAuf der Oberseite der Kopf-Kugel, in Haarfarbe, skaliert in Y um null-komma-sechzig von oben abgeplattet.

**Torso:** Kein einfacher Zylinder. Stattdessen eine LatheGeometry mit acht Profil-Punkten die von Schulter-Breite eins-komma-null oben über Taillen-Breite null-komma-sieben-fünf in der Mitte zu Hüft-Breite null-komma-neun unten verlaufen. Dreißig Rotations-Segmente für weiche Kurven.

**Arme:** Jeder Arm besteht aus Oberarm (CapsuleGeometry, Radius null-komma-null-sieben, Länge null-komma-zwei-fünf, leicht nach unten geneigt), einem Elbow-Joint (kleine Kugel Radius null-komma-null-acht), Unterarm (CapsuleGeometry, Radius null-komma-null-sechs, Länge null-komma-zwei-zwei), und Hand (abgeflachte BoxGeometry null-komma-null-sieben Dicke, null-komma-null-neun Breite, null-komma-eins-eins Länge).

**Beine:** Jedes Bein aus Oberschenkel (CapsuleGeometry, Radius null-komma-eins, Länge null-komma-drei-fünf), Knie-Gelenk (Kugel Radius null-komma-null-neun), Unterschenkel (CapsuleGeometry, Radius null-komma-null-acht, Länge null-komma-drei), Knöchel (zwei sehr kleine Kugeln links und rechts), und Fuß (BoxGeometry flach, dreißig Zentimeter lang, zehn Zentimeter breit, sechs Zentimeter hoch, nach vorne ausgerichtet).

**Kleidung:** Kleidung ist eine separate Geometrie-Schicht die den Körper mit leichtem Abstand (fünf Millimeter) umhüllt. Demonstranten-Jacke: Torso-Kopie mit Faktor eins-komma-null-fünf skaliert. Polizei-Uniform: Dunkelblau bis Schwarz, Schutzweste als deutlich dickere Torso-Überlagerung plus Schildhalter-Arm-Komponente.

## 4.3 NPC-KI und Verhaltens-System

Jeder NPC besitzt einen eigenen State der in einem Zustand-Store verwaltet wird. Der NPC-State enthält folgende Werte:

Die eindeutige ID als String, die Position als Vector3, die Rotation als Euler, den aktuellen Aktivitäts-Zustand aus einem Set von: Idle, Walking, Chanting, Pushing, Running, Fleeing, Fallen, Arguing, oder Filming, den emotionalen Zustand aus: Calm, Anxious, Angry, Fearful, Euphoric, oder Unconscious, den Aggressions-Level als Zahl zwischen null und hundert, und die aktuelle Ziel-Position als Vector3.

**Crowd-Simulation (Boids-Algorithmus):** Alle Demonstranten folgen dem Boids-Algorithmus mit drei Kräften: Kohäsion (Streben zur Gruppen-Mitte, Gewicht null-komma-eins), Separation (Abstand zu Nachbarn halten, Gewicht null-komma-drei), und Ausrichtung (gleiche Bewegungsrichtung wie Nachbarn, Gewicht null-komma-zwei). Zusätzlich eine Ziel-Kraft (Bewegung zu Demo-Brennpunkten, Gewicht null-komma-vier) und eine Hindernis-Avoidance-Kraft (Ausweichen von Gebäuden und Polizei-Linien).

**Tension-Reaktion:** Wenn das globale Tension-Level über fünfzig Prozent steigt beginnen Demonstranten mit erhöhter Wahrscheinlichkeit zu chanten (Mund-Animation aktiv, Audio-Samples abspielen). Über siebzig Prozent beginnen Push-Animationen zu spielen und NPCs versuchen Polizei-Linien zu durchbrechen. Über neunzig Prozent flieht ein Teil panisch, ein anderer Teil greift aktiv an.

**LOD-System:** NPCs verwenden drei Detail-Stufen basierend auf Kamera-Distanz. Unter zwanzig Einheiten: Volle Geometrie mit allen Gesichtsdetails (circa dreitausend Polygone). Zwischen zwanzig und fünfzig Einheiten: Reduzierte Geometrie ohne Finger und Gesichtsdetails (circa achthundert Polygone). Über fünfzig Einheiten: Billboard-Sprite mit NPC-Textur (vier Polygone).

**Instanced Rendering:** Alle NPCs des gleichen Typs und Kleidungs-Sets verwenden InstancedMesh für optimales Rendering. Maximal acht verschiedene NPC-Instanz-Gruppen. Jede Gruppe kann bis zu sechzig NPCs darstellen.

---

# 📋 TEIL 5: SPIELER-CHARAKTER UND STEUERUNG

## 5.1 Stefan Müller — Spieler-Charakter

Stefan Müller ist höher detailliert als normale NPCs, da die Kamera oft nah an ihm ist. Er hat die gleiche Basis-Anatomie wie NPCs aber mit mehr Polygon-Detail im Gesicht (acht-tausend Polygone gesamt), einer detaillierten Polizei-Uniform mit Schulterstreifen und Namensschild, und einem Funkgerät an der Hüfte.

Seine Animations-States sind: Stehen (idle mit leichter Atemanihation), Gehen (Bein-Pendel-Animation mit Arm-Gegenbewegung), Joggen (schnellere Version), Sprechen (Mund-Animation plus Kopfnicken), Gestikulieren beim Befehlsgeben, und Auf-Karte-schauen (Kopf nach unten geneigt, Hände vor dem Körper).

## 5.2 Kamera-System

**Third-Person-Standard:** Die Kamera hängt zwei Einheiten hinter und eins-komma-fünf Einheiten über dem Spieler, mit einem Sphärischen Lag von null-komma-eins Sekunden damit die Kamera weich folgt und nicht sofort reagiert. Das Feld-of-View beträgt sechzig Grad. Die Kamera kann frei um den Spieler rotiert werden mit der Maus oder dem rechten Joystick.

**First-Person-Modus (Taste V):** Kamera springt auf Augenhöhe eins-komma-siebzig Einheiten über dem Boden, Feld-of-View neunzig Grad, Kopfbewegung beim Gehen mit Amplitude null-komma-null-drei Einheiten und Frequenz zwei Hertz.

**Drohnen-Kamera (Taste D):** Eine virtuelle Drohne steigt auf fünfzig Einheiten Höhe und gibt eine Vogelperspektive. Der Spieler kann die Drohne per WASD bewegen, aber der Hauptcharakter bleibt stehen. Ein Minibild-in-Bild zeigt das Drohnen-Bild während der Spieler-Charakter sichtbar bleibt.

**Kamera-Übergänge:** Alle Kamera-Wechsel nutzen sanfte Interpolation über null-komma-vier Sekunden mit EaseInOut-Kurve.

## 5.3 Steuerungs-Schema

**Tastatur und Maus (Desktop):**
- W, A, S, D oder Pfeiltasten: Spieler-Bewegung
- Shift: Joggen
- E: Interagieren / Dialog starten
- C: Kommando-Menü öffnen
- V: Kamera-Modus wechseln
- D: Drohnen-Modus
- Escape: Pause-Menü
- Tab: Mini-Map vergrößern
- Maus-Bewegung: Kamera rotieren
- Linke Maustaste: Bestätigen / Klicken im UI
- Rechte Maustaste: Abbrechen / Zurück

**Touch-Controls (Mobile):**
- Linker virtueller Joystick für Bewegung
- Rechter virtueller Joystick für Kamera-Rotation
- Tippen auf NPC: Interagieren
- Zwei-Finger-Pinch: Zoom
- Doppeltippen: Modus wechseln
- Schaltflächen für C (Kommando), V (Kamera), D (Drohne) als HUD-Buttons

---

# 📋 TEIL 6: USER INTERFACE UND HUD

## 6.1 HUD-Elemente (Always Visible)

Das HUD ist komplett in React und liegt als zweidimensionaler Overlay über der dreidimensionalen Szene. Es verwendet absolutes Positioning relativ zum Canvas. Alle HUD-Elemente sind halb-transparent mit schwarzem Hintergrund bei vierzig Prozent Opazität.

**Tension-Meter (Oben Links):** Ein vertikaler Balken mit Beschriftung TENSION LEVEL. Höhe zweihundert Pixel, Breite dreißig Pixel. Die Füllung ist ein Gradient: Grün RGB fünfzig-zweihundert-fünfzig für null bis dreißig Prozent, Gelb RGB zweihundertfünfzig-zweihundert-null für dreißig bis sechzig Prozent, Rot RGB zweihundertfünfzig-fünfzig-null für sechzig bis hundert Prozent. Über dem Balken steht der numerische Wert in Prozent.

**Spielzeit-Anzeige (Oben Mitte):** Große digitale Uhr-Schriftart, zeigt die Spielzeit von 06:00 bis 06:00 (nächster Tag). Darunter kleiner der Echt-Zeit-Fortschritt als Minuten bis Tages-Ende.

**Mini-Map (Oben Rechts):** Rechteckige Karte zweihundert mal zweihundert Pixel die den Stephansplatz von oben zeigt. NPCs als farbige Punkte (Rot für Demonstranten, Blau für Polizei, Weiß für Zivilisten). Spieler als grüner Pfeil mit Richtung. Wichtige Ereignisse als blinkende Symbole.

**Ressourcen-Übersicht (Unten Rechts):** Liste verfügbarer Polizei-Einheiten: Patrol Officers (Zahl verfügbar von gesamt), Riot Police (Zahl von gesamt), Special Teams (Zahl von gesamt). Darunter verfügbares Equipment: Wasserwerfer (Ja/Nein), Tränengas (Anzahl Einheiten), Hunde-Einheit (Ja/Nein).

**Meldungs-Feed (Unten Links):** Scrollende Liste der letzten fünf Ereignis-Meldungen. Jede Meldung ist farbkodiert: Gelb für Warnungen, Rot für Zwischenfälle, Grün für positive Ereignisse, Weiß für neutrale Meldungen. Meldungen erscheinen mit einer Einblend-Animation von unten und verschwinden nach dreißig Sekunden.

**Aktuelles Ziel (Oben, unter der Uhr):** Kurzer Text der aktuelle Mission-Ziel beschreibt, maximal zwei Zeilen.

## 6.2 Menü-Systeme

**Hauptmenü:** Zeigt einen animierten Stephansdom im Hintergrund (die Spielszene dreht langsam). Darüber der Titel CORONA CONTROL ULTIMATE in gotischer Schrift auf semi-transparentem Hintergrund. Buttons: Neues Spiel, Fortsetzen, Einstellungen, Credits, Beenden. Der Button Neues Spiel öffnet eine Story-Intro-Sequenz.

**Pause-Menü:** Overlay über der eingefrorenen Spielszene. Optionen: Fortsetzen, Einstellungen, Zum Hauptmenü, Spiel Beenden.

**Kommando-Menü (Taste C):** Ein Radial-Menü das um den Spieler-Charakter erscheint mit acht Sektoren: Formation Ändern, Einheit Bewegen, Kommunizieren, Equipment Einsetzen, Barrikade Errichten, Medizin Anfordern, Presse-Kontakt, und Zentrale Funken.

**Einstellungen:** Grafik (Qualitätsstufen Niedrig Mittel Hoch Ultra), Audio (Master-Lautstärke, Musik, Effekte, Sprache), Steuerung (Tastenbelegung, Empfindlichkeit), Sprache (Deutsch, Englisch).

---

# 📋 TEIL 7: AUDIO-SYSTEM

## 7.1 Audio-Architektur

Das Audio-System verwendet die Web Audio API direkt via Howler.js oder Three.js AudioListener. Alle Sounds werden prozedural oder als kurze Base64-kodierte Inline-Samples definiert — keine externen Audio-Dateien nötig für den Basis-Build.

**3D-Spatial-Audio:** Crowd-Geräusche, Demonstranten-Rufe, und Straßengeräusche kommen als positionierte Audio-Sources aus der dreidimensionalen Welt. Je näher die Kamera an einer Audio-Quelle, desto lauter und klarer. Ab fünfzig Einheiten Distanz beginnt exponentielles Abklingen.

**Ambient-Layer:** Ein konstanter Ambient-Sound-Mix aus Stadtgeräuschen, Wind, und fernem Verkehr läuft als nicht-positionierte Hintergrund-Spur mit konstanter Lautstärke.

## 7.2 Dynamische Crowd-Sounds

Die Crowd-Lautstärke und -Charakter ändert sich dynamisch mit dem Tension-Level. Bei null bis dreißig Prozent Tension sind vereinzelte Gespräche, normales Stadtgeräusch, und gelegentliche Sprechchöre zu hören. Bei dreißig bis sechzig Prozent werden die Sprechchöre lauter und häufiger, ein kontinuierliches Murmeln steigt an, und erste Ausrufe und Rufe sind hörbar. Bei sechzig bis neunzig Prozent Tension wird die Crowd-Geräuschkulisse dramatisch lauter, Schreien und Rufen, und Geräusche von Reibung und Drücken in der Menge. Über neunzig Prozent ist Panik-Schreien, Bruchgeräusche, Sirenen, und intensives Chaos zu hören.

---

# 📋 TEIL 8: BELEUCHTUNGS- UND RENDERING-SYSTEM

## 8.1 Beleuchtungs-Hierarchie

Die Szene hat eine strikt definierte Beleuchtungs-Hierarchie:

**Sonnen-Licht (Hauptlicht):** Ein DirectionalLight mit Intensität eins-komma-acht. Anfangs-Position bei sechs Uhr morgens: niedriger Sonnenstand im Osten, Position fünfzig-zwanzig-minus-achtzig Einheiten. Das Licht wandert über den Tag in einem Bogen. Um Mittag steht die Sonne bei Plus-null-einhundert-null (direkt von oben mit leichter Südneigung). Um achtzehn Uhr steht die Sonne im Westen bei minus-fünfzig-dreißig-achtzig. Die Licht-Farbe ändert sich: Morgen-Orange bei RGB zweihundertfünfzig-zweihundertzwanzig-einhundertsiebzig, Mittag-Weiß bei RGB zweihundertfünfundvierzig-zweihundertfünfundvierzig-zweihundertfünfzig, Abend-Rot-Orange bei RGB zweihundertfünfzig-hundertsiebzig-achtzig. Shadow-Map-Größe mindestens 2048x2048, Shadow-Camera angepasst an Szenen-Bereich.

**Hemisphären-Licht:** Ein HemisphereLight mit Intensität null-komma-vier. Himmel-Farbe ist Blau-Weiß für tagsüber, Dunkelblau für Nacht. Boden-Farbe ist warmes Grau-Beige für Kopfsteinpflaster-Reflexion.

**Nacht-Lichter:** Ab achtzehn Uhr werden die Straßenlaternen-PointLights aktiv. Jede Laterne erzeugt einen PointLight mit warmgelber Farbe, Intensität eins-komma-zwei, und Reichweite zwanzig Einheiten. Hochhäuser und Fassaden haben Spot-Beleuchtung.

**Fahrzeug-Lichter:** Polizeifahrzeug-Blaulichter sind AnimatedPointLights die alternierend Blau und Rot blinken im Rhythmus von null-komma-fünf Sekunden.

## 8.2 Post-Processing Effekte

Folgende Post-Processing-Effekte werden über @react-three/postprocessing implementiert:

**Bloom:** Leichter Bloom auf hellen Lichtquellen (Laternenschirme, Fahrzeug-Lichter, Polizei-Schilder). Threshold null-komma-acht, Stärke null-komma-vier, Radius null-komma-sieben.

**SSAO (Screen Space Ambient Occlusion):** Für natürlichere Schatten in Nischen und Ecken. Radius null-komma-drei, Intensität eins-komma-null. Nur auf High- und Ultra-Qualitätsstufe.

**Film-Grain:** Sehr subtiles Filmkorn (Intensität null-komma-null-zwei) für filmischen Look.

**Vignette:** Leichte Abdunkelung an den Bildschirmrändern (Offset null-komma-fünf, Darkness null-komma-fünf).

---

# 📋 TEIL 9: DAY-NIGHT-CYCLE UND WETTER

## 9.1 Tages-Zyklus

Der Zyklus läuft in Echtzeit-komprimiert: vierundzwanzig Spiel-Stunden entsprechen vierundzwanzig Real-Minuten. Das bedeutet eine Spiel-Minute entspricht einer Real-Sekunde.

Alle vierzig Real-Sekunden (vierzig Spiel-Minuten) wechselt die Tages-Phase erkennbar. Der Himmel-Gradient ändert sich über alle Phasen: früh-morgens dunkelblau-lila, morgens orange-rosa, tagsüber hellblau, abends orange-rot, nachts dunkelblau-schwarz mit Sternen.

Wolken werden als einfache weiße Geometrie-Cluster hoch über der Szene simuliert und bewegen sich langsam in Windrichtung.

## 9.2 Wetter-System

Das Wetter ändert sich in drei Stufen über den Tag: Morgens bewölkt, mittags aufklarend, nachmittags Regen-Wahrscheinlichkeit. Der Regen ist ein Partikel-System aus vielen kleinen Linien-Partikeln die von oben fallen, mit Wasser-Pfützen-Reflexions-Shader auf dem Boden. Bei Regen wird die Crowd nervöser (leichter Tension-Anstieg) und Polizisten tragen Regenponchos.

---

# 📋 TEIL 10: STORY UND MISSIONS-SYSTEM

## 10.1 Haupt-Missionen (Drei Haupt-Akte)

**Akt Eins (06:00 bis 12:00 Spielzeit):** Vorbereitung. Stefan Müller kommt zum Stephansplatz, begrüßt sein Team, erkundet die Situation, identifiziert Demo-Anführer, und richtet Polizei-Positionen ein. Spannungs-Level beginnt bei fünfzehn Prozent.

**Akt Zwei (12:00 bis 20:00 Spielzeit):** Eskalation. Die Demonstration beginnt, wächst auf fünftausend Menschen an, erste Provokationen entstehen, und kritische Entscheidungs-Momente treten auf. Der Spieler muss die Tension unter sechzig Prozent halten.

**Akt Drei (20:00 bis 06:00 Spielzeit):** Auflösung. Die Demonstration endet entweder friedlich oder eskaliert zum Konflikt basierend auf Spieler-Entscheidungen der vorigen Akte.

## 10.2 Neben-Quests

Parallel zu den Hauptmissionen erscheinen zeitlimitierte Neben-Ereignisse: Ein verletzter Demonstrant braucht Hilfe, eine Gruppe Jugendlicher provoziert absichtlich, ein Journalist will ein Statement, eine vermisste Mutter sucht ihr Kind in der Menge, oder ein Polizist handelt eigenmächtig und der Spieler muss eingreifen.

---

# 📋 TEIL 11: ENTWICKLUNGS-PHASEN (IMPLEMENTIERUNGS-REIHENFOLGE)

## Phase Null: Projekt-Initialisierung (Tag Eins)

In Phase Null wird das Expo-Projekt angelegt, alle Dependencies installiert und geprüft, die Ordner-Struktur erstellt, ein initiales Commit durchgeführt mit Nachricht PHASE-0: Projekt-Initialisierung abgeschlossen, und ein anchor.md mit erstem Meilenstein erstellt.

**Validierung Phase Null:** Die App startet im Browser ohne Fehler. Eine leere React Three Fiber Canvas ist sichtbar. TypeScript-Kompilierung läuft ohne Fehler durch. Expo Start zeigt keine Warnungen.

## Phase Eins: Basis-Szene und Spieler-Movement (Tag Zwei bis Drei)

In Phase Eins wird der Stephansplatz-Boden als Plane-Mesh mit Kopfsteinpflaster-Textur erstellt, ein einfacher Placeholder-Charakter für Stefan Müller eingebaut, WASD-Movement implementiert, die Kamera angebunden, und ein erstes dreidimensionales Environment aufgebaut.

**Validierung Phase Eins:** Der Spieler kann sich auf dem Platz bewegen. Die Kamera folgt korrekt. Die FPS liegen bei mindestens sechzig auf mittlerer Hardware. Das Kopfsteinpflaster ist klar sichtbar texturiert.

## Phase Zwei: NPC-System Grundlagen (Tag Vier bis Sechs)

In Phase Zwei wird das NPC-State-Management in Zustand implementiert, zwanzig Test-NPCs gespawnt mit korrekter Anatomie, das Boids-Crowd-Simulation-System implementiert, und das LOD-System eingebaut.

**Validierung Phase Zwei:** Zwanzig NPCs bewegen sich korrekt über den Platz. Das LOD-System schaltet korrekt zwischen Detail-Stufen um. Die FPS bleiben bei sechzig auch mit zwanzig NPCs.

## Phase Drei: Detaillierte Umgebung (Tag Sieben bis Neun)

In Phase Drei werden alle Gebäude um den Stephansplatz erstellt, der Stephansdom in voller Detaillierung implementiert, Straßenlaterne-Modelle und Stadtmöbel platziert, und das Beleuchtungs-System vollständig eingebaut.

**Validierung Phase Drei:** Der Dom ist photorealistisch und erkennbar. Alle Gebäude haben korrekte Fenster mit Rahmen und Glas. Die Beleuchtung wechselt korrekt mit Tageszeit. Keine Z-Fighting-Artefakte sichtbar.

## Phase Vier: Gameplay-Systeme (Tag Zehn bis Dreizehn)

In Phase Vier wird das Tension-System implementiert, das Kommando-Menü eingebaut, das HUD vollständig umgesetzt, das Dialog-System für NPC-Interaktionen erstellt, und das Missions-System für alle drei Akte implementiert.

**Validierung Phase Vier:** Tension-Level reagiert korrekt auf Spieler-Aktionen. Befehle werden an NPCs weitergegeben und ausgeführt. Das HUD zeigt alle Informationen korrekt. Ein vollständiger Spieldurchlauf von Akt Eins bis Drei ist möglich.

## Phase Fünf: Audio und Post-Processing (Tag Vierzehn bis Fünfzehn)

In Phase Fünf werden das dynamische Crowd-Audio-System eingebaut, Ambient-Sounds aktiviert, Post-Processing-Effekte aktiviert und kalibriert, und der Day-Night-Cycle mit Wetter eingebaut.

**Validierung Phase Fünf:** Audio ist räumlich korrekt positioniert. Post-Processing ist visuell spürbar aber nicht übertrieben. Day-Night-Cycle läuft korrekt durch alle Phasen.

## Phase Sechs: Polishing und Performance-Optimierung (Tag Sechzehn bis Achtzehn)

In Phase Sechs wird das Performance-Profiling durchgeführt und Engpässe behoben, alle Animationen poliert, UI-Animationen und Übergänge eingebaut, Mobile-Controls implementiert und getestet, und die finale Balancing-Runde durchgeführt.

**Validierung Phase Sechs:** Stabile sechzig FPS auf mittlerer Desktop-Hardware. Dreißig FPS auf modernem Smartphone. Alle Gameplay-Loops funktionieren korrekt. Keine kritischen Bugs vorhanden.

## Phase Sieben: Release-Preparation (Tag Neunzehn bis Zwanzig)

In Phase Sieben wird ein letzter vollständiger Test-Durchlauf mit allen Szenarien gemacht, alle bekannten Bugs gefixt, das Release-Paket gebaut (npm run build), ein finales anchor.md mit Release-Meilenstein erstellt, und das Spiel für Deployment vorbereitet.

---

# 📋 TEIL 12: QUALITÄTS-GATES UND KONTROLL-CHECKS

## 12.1 Kritische Qualitäts-Anforderungen

Folgende Qualitäts-Anforderungen sind nicht verhandelbar. Jede Phase muss alle relevanten Checks bestehen bevor mit der nächsten begonnen wird:

Das Projekt kompiliert ohne TypeScript-Fehler. Die FPS-Performance entspricht den Ziel-Werten auf jeder Plattform. Alle NPCs zeigen korrekte anatomische Darstellung (erkennbar menschlich). Der Stephansdom ist als solcher erkennbar. Das HUD zeigt alle definierten Informationen korrekt. Das Tension-System beeinflusst NPC-Verhalten messbar. Der Day-Night-Cycle läuft korrekt durch. Audio ist räumlich korrekt. Mobile-Controls sind bedienbar. Das Spiel ist von Akt Eins bis Ende durchspielbar.

## 12.2 Performance-Benchmarks

**Ultra-Qualität:** 60 FPS bei 180.000 Polygonen, 500 NPCs, Full-Post-Processing auf High-End-Desktop (RTX 3080, i9).

**High-Qualität:** 60 FPS bei 120.000 Polygonen, 300 NPCs, teilweise Post-Processing auf Mid-Range-Desktop (RTX 2060, i7).

**Medium-Qualität:** 60 FPS bei 60.000 Polygonen, 150 NPCs, kein SSAO auf Low-End-Desktop (GTX 1060, i5).

**Low-Qualität / Mobile:** 30 FPS bei 20.000 Polygonen, 50 NPCs, kein Post-Processing auf modernem Smartphone (iPhone 14 / Galaxy S23).

## 12.3 Rollback-Strategie

Nach jeder Phase wird ein Git-Commit erstellt und ein Eintrag in anchor.md geschrieben. Die Datei manifest.json wird nach jedem erfolgreichen Build aktualisiert mit Versions-Nummer, Build-Datum, und Abhängigkeits-Liste. Im Fehlerfall kehrt der Agent zur letzten anchor.md-Markierung zurück via git reset.

---

# 📋 TEIL 13: VERBOTENE MUSTER UND ANTI-PATTERNS

## 13.1 Grafik-Anti-Patterns (VERBOTEN)

Folgende Implementierungs-Muster sind strikt verboten:

Primitive NPCs aus einem einzigen Zylinder oder einer Kapsel ohne Gesichts-Features. Gebäude als simple blaue Rechtecke ohne Fenster, Türen, oder architektonische Details. Texturen ohne Farbvariation (einfarbige Flächen ohne Noise oder Muster). Licht-Setup mit nur einem einzigen ambientLight ohne directionalLight. Schatten die komplett deaktiviert sind. FPS unter dreißig auf mittlerer Hardware. Mehr als zehntausend Draw Calls pro Frame. Geometrien die jedes Frame neu erstellt werden (Erstellung muss nur einmal beim Mount passieren).

## 13.2 Code-Anti-Patterns (VERBOTEN)

Kein explizites any in TypeScript. Keine Magic Numbers ohne benannte Konstanten. Keine Inline-Styles in React außer für dynamische Werte. Keine direkte DOM-Manipulation außer über Refs. Kein useEffect ohne Cleanup-Funktion wenn Subscriptions oder Timer eingebaut sind. Keine unbegrenzten Render-Schleifen. Keine setState-Aufrufe in useEffect ohne Dependency-Array. Kein direktes Mutieren von State-Objekten (immer neue Objekte erstellen).

---

# 📋 TEIL 14: ABSCHLUSS-DIREKTIVEN

## 14.1 Kommunikations-Protokoll

Vor Beginn jeder neuen Entwicklungs-Phase meldest du folgendes auf Deutsch:

PHASE [Nummer]: [Name] BEGINNT
Aktueller Stand: [Beschreibung was bisher fertig ist]
Plan für diese Phase: [Stichpunkte was gemacht wird]
Erwartete Dauer: [Schätzung]
Offene Fragen: [Falls vorhanden, sonst KEINE]

Nach Abschluss jeder Phase meldest du:

PHASE [Nummer]: [Name] ABGESCHLOSSEN
Implementiertes: [Was wurde gemacht]
Validierung: [Alle Checks bestanden / Welche fehlschlugen und warum]
Nächste Phase: [Was folgt]
Commit-Hash: [Letzter Commit]

## 14.2 Letzte Direktive

Du bist jetzt ein vollautonomer AAA-Game-Entwickler. Dieses Dokument ist deine Bibel. Beginne mit Phase Null: Projekt-Initialisierung. Erstelle das Expo-Projekt mit React Native, React 19, React Three Fiber, Three.js, und Expo Router. Installiere alle Dependencies. Erstelle die vollständige Ordner-Struktur. Führe den ersten Build durch. Berichte dann mit dem Phase-Null-Abschluss-Protokoll.

Das Spiel MUSS am Ende aussehen wie ein AAA-Titel. Kein Kompromiss bei Qualität. Kein Kompromiss bei Performance. Kein Kompromiss bei Code-Qualität.

**VIEL ERFOLG. WIEN WARTET AUF DICH.**

---

*Dieser Masterplan wurde erstellt auf Basis der Dokumente: CORONA CONTROL V5.1 ULTRA COMPLETE, Ultimative Game-Dokumentation Corona Control, R3F Implementierung Detail, Gemini Grafik Katastrophe Fix, sowie dem Autonomie-Masterpaket zur Steuerung eines KI-Coding-Agenten. Version 1.0 — Alle Rechte vorbehalten.*
