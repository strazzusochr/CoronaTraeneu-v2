# 🎮 Corona Control Ultimate — Master Prompt (R3F Edition)

> Konsolidiert aus 42 Prompt-Dateien. Widersprüche aufgelöst, Duplikate entfernt, beste Ideen vereint.
> Letzte Aktualisierung: 2026-02-21

---

## 1. Vision & Genre

**Titel:** Corona Control Ultimate
**Genre:** AAA-Polizeisimulation / Taktisches Crowd-Management / Narrative Deeskalation
**Setting:** Stephansplatz, Wien — 17. März 2021, Anti-Corona-Maßnahmen-Demonstration
**Spieler:** Oberstleutnant Stefan Müller, 37, erfahrener Wiener Polizist und Einsatzleiter
**Kernidee:** 24-Stunden-Demonstration in 24 Minuten Echtzeit (timeScale 60x). Der Spieler managt Eskalation, trifft moralische Entscheidungen und steuert taktische Polizeioperationen. Kein Gut-Böse — jede Entscheidung hat Konsequenzen.
**Sprache:** Deutsch (primär), Englisch (sekundär)

### Kern-Emotionen
- Moralische Komplexität ohne Dichotomie
- Zeitdruck und taktische Spannung
- Empathie für alle Seiten (Demonstranten, Polizei, Zivilisten, Medien)

---

## 2. Tech Stack

> Nur diese Technologien verwenden. Keine Alternativen, keine Experimente.

| Technologie | Version | Zweck |
|---|---|---|
| **React** | 19+ | UI-Framework |
| **Vite** | 7+ | Build + Dev Server |
| **TypeScript** | 5.3+ (strict) | Sprache |
| **Three.js** | 0.160+ | 3D-Engine |
| **@react-three/fiber** | 8.15+ | React-Renderer für Three.js |
| **@react-three/drei** | 9.92+ | R3F-Helfer (Detailed, Html, ContactShadows, etc.) |
| **@react-three/rapier** | 1.0+ | Physik (Rapier3D via WASM) |
| **@react-three/postprocessing** | 2.0+ | Post-FX (Bloom, ToneMapping, SMAA, Vignette) |
| **Zustand** | 5+ | State Management (Slices, Subscribe, getState) |
| **Vitest** | 4+ | Unit-Tests |
| **ESLint** | 9+ | Code-Qualität |
| **Howler.js** | 2.2+ | Audio (3D Spatial, Busse, Fading) |
| **Socket.IO** | 4+ | Multiplayer-Grundlage (Server) |
| **Node.js + Express** | 20+ / 4+ | Backend / Production Server |

### Verboten
- Kein Babylon.js, Phaser, PlayCanvas, A-Frame, Unity, Godot
- Kein Redux, MobX, Context als State-Manager
- Kein jQuery, Lodash
- Kein `useState` in 3D-Komponenten — nur Zustand
- Kein `setInterval`/`setTimeout` in R3F — nur `useFrame`
- Kein imperativer Three.js-Code wenn R3F-Äquivalent existiert
- Keine Class-Components
- Kein Expo / React Native (reines Web-Projekt)

---

## 3. Core Gameplay

### 3.1 Eskalationsstufen (5 Stufen)

| Stufe | Tension | Beschreibung |
|---|---|---|
| 0 — Friedlich | 0-20% | 95% NPCs ruhig, Dialog-Optionen, Patrouillieren |
| 1 — Angespannt | 20-40% | Lauter, vereinzelte Beleidigungen, Polizei formiert sich |
| 2 — Konfrontativ | 40-60% | Schubsen, Frontenbildung, Medien aktiv |
| 3 — Gewalt | 60-80% | Tränengas, Wasserwerfer, aktive Gewalt |
| 4 — Chaos | 80-100% | Vollständiger Kontrollverlust, Brände, Massenpanik |

### 3.2 Moral-Score-System

- **Basis:** 1000 Punkte (Range 0–2000)
- Positive: Deeskalation (+50), Fluchtweg öffnen (+30), Crush verhindert (+100)
- Negative: Zivilist verletzt (-150), Kind verletzt (-500), Todesfall (-1000)
- **Multiplikatoren:** Medien anwesend (×1.5), Livestreamer filmt (×2.0)

### 3.3 Fünf Enden

| Rang | Moral | Bedingung | Resultat |
|---|---|---|---|
| S — Held | >1500 | 0 Tote, Tension <20% | Beförderung, Friedenspreis |
| A — Profi | 1000-1499 | <5 Verletzte | Commander-Beförderung |
| B — Kontrovers | 500-999 | Gemischte Ergebnisse | Rang behalten, Untersuchung |
| C — Katastrophe | 200-499 | Hohe Verluste | Suspendierung |
| F — Tragödie | <200 | Massenopfer | 15 Jahre Gefängnis |

### 3.4 Spieler-Aktionen

- **Bewegung:** WASD (Walk 2.5 m/s), Shift (Sprint 5.0 m/s), Ctrl (Ducken 1.5 m/s)
- **Kamera:** First-Person (Standard, FOV 75°), Third-Person (V-Taste), Tactical (T-Taste, Vogelperspektive)
- **Kommando-Rad (C):** 8 Sektoren — Formation, Bewegung, Kommunikation, Crowd-Control, Verhaftung, Medizin, Unterstützung, Strategie
- **Fernglas (B):** Zoom, NPC-Identifikation, Raycast-basiert
- **Ausrüstung:** Schlagstock (1), Pfefferspray (2), Taser (3), Funkgerät, Handschellen, Bodycam

### 3.5 Scripted Events (Haupttimeline)

| Zeit | Event | Tension |
|---|---|---|
| 06:00 | Stadt erwacht, Laternen aus, Sonnenaufgang | 0% |
| 08:00 | Erste 10 Demonstranten, Bühnenaufbau | 5% |
| 10:00 | Massenzustrom auf 150 NPCs | 15% |
| 11:00 | Hauptredner-Rede (Dr. Hoffmann) | 15% |
| 11:30 | Aggressive Rhetorik (Karl Weber) | 25% |
| 12:00 | Polizei-Ultimatum (Oberst Gruber) | 45% |
| 13:00 | Wasserwerfer-Einsatz (optional) | 65% |
| 15:00 | Verhandlungsangebot | 30% |
| 18:00 | Sonnenuntergang, Extremisten formieren | 50% |
| 19:00 | Black-Bloc-Angriff | 80% |
| 20:00 | Barrikaden, Bengalos | 90% |
| 21:00 | PEAK CHAOS — Blendgranaten, SEK | 100% |
| 22:00 | Aftermath — Forensik, Aufräumen | 40% |
| 00:00 | Statistik-Screen, Ending basierend auf Moral | — |

### 3.6 Quest-System

**Haupt-Quest:** "Die Demonstration" — 5 Branching-Punkte, 9 Checkpoints
**10 Neben-Quests:**
1. "Der verlorene Sohn" — Vermissten-Suche, 4 Outcomes
2. "Medien-Manipulation" — 3 Journalisten, Media-Impact
3. "Undercover-Infiltration" — Stealth in der Demo
4. "Das Ultimatum" — Krause-Verhandlung, 15 Branch-Points
5. "VIP-Evakuierung" — Escort-Mission, 10-Min-Timer
6. "Bombendrohung" — 30-Min-Timer, Entschärfungs-Minigame
7. "Whistleblower" — Moralisches Dilemma
8. "Friendly-Fire" — Polizei-Fehlverhalten, Investigation
9. "Brennende Barrikade" — Feuer-Rettung, 8 Zivilisten
10. "Der Maulwurf" — Verräter-Suche, 5 Verdächtige

### 3.7 Dialog-System

- Branching-Dialog-Trees mit 6 Node-Typen: TEXT, CHOICE, CONDITION, ACTION, RANDOM, END
- 4 Antwortoptionen pro Dialog: diplomatisch, neutral, autoritär, empathisch
- RelationshipScore (-100 bis +100) pro NPC
- NPCs erinnern frühere Gespräche (Memory-System)
- Verbindung mit Zustand Store (`useDialogStore`)

---

## 4. 3D Rendering

### 4.1 Welt: Stephansplatz Wien

- **Abmessungen:** 300×200m (1 Unit = 1 Meter), Mittelpunkt (0,0,0)
- **Stephansdom:** Südturm 137m, Nordturm 70m, Zickzack-Ziegeldach (Grün/Gelb/Schwarz), gotische Fenster, Portale — Budget: 150k Polys
- **6 Gründerzeit-Gebäude:** Fenster-Rahmen/Glas/Sprossen, Schaufenster, Balkone — je 60-80k Polys
- **Haas-Haus:** Modern, Glasfassade, hohe Reflektivität
- **Straßenmöbel:** 40 Laternen, 30 Bänke, 20 Mülleimer, Verkehrszeichen
- **Boden:** Wiener Kopfsteinpflaster, Fischgrätmuster

### 4.2 LOD-System (5 Stufen, zentral über `LOD_DISTANCES`)

| LOD | Distanz | Polys | Textur |
|---|---|---|---|
| 0 — Ultra | 0-10m | 8.000 | 2K |
| 1 — High | 10-30m | 3.000 | 1K |
| 2 — Medium | 30-100m | 800 | 512 |
| 3 — Low | 100-300m | 200 (Impostor) | 256 |
| 4 — Billboard | >300m | 4 (Sprite) | 128 |

- `<Detailed>` aus `@react-three/drei` für LOD-Wechsel
- Hysteresis: LOD-Switch erst bei +10% Distance (kein Popping)
- Distanzen zentral in `RenderPipeline.ts` → `LOD_DISTANCES`

### 4.3 Tag-Nacht-Zyklus

- 7 Phasen: NIGHT, DAWN, MORNING, NOON, AFTERNOON, DUSK, EVENING
- Sonne bewegt sich über Spline, Farbwechsel: Morgen-Orange → Mittag-Weiß → Abend-Rot → Nacht-Blau
- `TimeSystem` Singleton: `gameTime + delta * timeSpeed (60)` modulo 1440
- Delta-Clamping: max 0.1s (verhindert Sprünge bei Tab-Wechsel)

### 4.4 Beleuchtung

- **DirectionalLight (Sonne):** Position aus gameTime berechnet, Intensity 1.0-1.8
- **HemisphereLight:** Intensity 0.4, Sky/Ground-Farben zeitbasiert
- **247 Straßenlaternen:** PointLight ab 18:00, 3000K, 15m Reichweite, gestaffelte Flicker-Sequenz
- **Polizei-Blaulicht:** 2Hz Blau/Rot Wechsel
- **Environment:** IBL via `<Environment preset="city" />`

### 4.5 Post-Processing (Feature-Flag-gated)

- **Bloom:** Tageszeit-abhängig (Tag: 0.2, Nacht: 0.5), Threshold 0.7-0.9
- **ToneMapping:** ACESFilmic, Exposure zeitbasiert
- **Vignette:** Fixe Stärke, verstärkt bei Stress
- **SMAA:** Antialiasing
- **Film-Grain:** Subtle (0.02-0.05)
- **Chromatic Aberration:** Nur bei Chaos-Stufe 4

### 4.6 Materialien

- PBR via `meshStandardMaterial` — Albedo, Normal, Roughness, Metalness, AO
- KTX2-Texturkompression wenn verfügbar
- Nass-Shader: Roughness ×0.3 bei Regen/Wasserwerfer

---

## 5. Performance

### 5.1 Budgets

| Metrik | Desktop (High) | Desktop (Low) | Mobile |
|---|---|---|---|
| FPS | 60 | 30 | 30 |
| NPCs aktiv | 500 | 150 | 50 |
| Draw-Calls | <500 | <200 | <100 |
| Polys gesamt | 3M | 1M | 300k |
| Memory | <2GB | <1GB | <512MB |
| Load-Time | <10s | <15s | <20s |

### 5.2 Instancing

- `InstancedMesh` für alle Crowd-NPCs (1 Draw-Call für 500 NPCs)
- Preallocated `Matrix4`, `Vector3`, `Object3D` — **keine** `new` in `useFrame`
- Dirty-Flag-System: Nur geänderte Instanzen updaten
- `SharedArrayBuffer` + Web Worker für Matrix-Berechnungen (wenn COOP/COEP Headers gesetzt)

### 5.3 Adaptive Qualität (PerformanceProfiler)

| Level | LOD-Scale | Crowd-Budget | Bloom | Shadows |
|---|---|---|---|---|
| ULTRA | 1.0 | 500 | An | 2048 |
| HIGH | 0.8 | 400 | An | 1024 |
| MEDIUM | 0.5 | 250 | Aus | 512 |
| LOW | 0.3 | 100 | Aus | Aus |

- Auto-Degradation bei frameTime >14ms (→ MEDIUM), >20ms (→ LOW)
- Auto-Recovery nach 120 Frames stabiler Performance

### 5.4 Multi-Frequenz-Updates

| System | Frequenz | Methode |
|---|---|---|
| Rendering | 60Hz | `useFrame` |
| Physik | 120Hz | Akkumulator + Fixed-Step (Hard-Cap: 4 Steps/Frame) |
| KI | 10Hz | Throttled in `useFrame` |
| UI/Zeit | 1Hz | Akkumulator |
| Globale Events | 0.2Hz | Akkumulator |

### 5.5 Spatial Partitioning

- `SpatialGridSystem`: 1000×1000m, 5×5m Zellen, O(1) Entity-Lookup
- NPC-KI-Throttling: Nahe NPCs (20Hz), mittlere (10Hz), ferne (2Hz)

### 5.6 Build-Optimierung

- `manualChunks`: three, r3f, rapier, drei, react, game-core, ui-core
- `React.lazy` für Szenen-Loading
- `minify: 'esbuild'`, `sourcemap: false` in Production
- `<Suspense>` mit `<LoadingScreen />` Fallback

---

## 6. UI/UX

### 6.1 HUD (permanent sichtbar)

- **Uhr** (oben Mitte): LCD-Stil, HH:MM, farbkodiert (Orange=Morgen, Weiß=Tag, Gold=Dämmerung, Blau=Nacht)
- **Tension-Meter** (oben links): Vertikaler Balken, Gradient Grün→Gelb→Rot
- **Health + Stamina** (unten links): Horizontale Balken, blinkt bei niedrig
- **Mini-Map** (oben rechts): 200×200px, NPCs als farbige Punkte, zoombar
- **Ausrüstung** (unten rechts): Aktive Waffe, Munition
- **Meldungs-Feed** (unten links): Letzte 5 Ereignisse, farbkodiert nach Schwere
- **Aktuelles Ziel** (oben, unter Uhr): Quest-Beschreibung

### 6.2 Menüs

- **Hauptmenü:** Animierter Stephansdom im Hintergrund, New Game / Load / Settings / Credits
- **Pause (ESC):** Overlay über eingefrorener Szene, Resume / Load Checkpoint / Settings / Return to Menu
- **Kommando-Rad (C):** Radial-Menü mit 8 Sektoren
- **Inventar (I):** 40 Slots Grid, Equipment-Slots (Kopf/Körper/Haupthand/Nebenhand), Crafting

### 6.3 Settings

- **Grafik:** Quality (LOW/MEDIUM/HIGH), Shadows, Post-Processing, FOV
- **Audio:** Master, Musik, SFX, Dialog, Ambient — je eigener Slider
- **Accessibility:** Farbenblind-Modi (Deuteranopia/Protanopia/Tritanopia), TTS, Große Schrift
- **4 Schwierigkeitsgrade:** Easy, Normal, Hard, Expert (Permadeath)

---

## 7. AI & NPCs

### 7.1 NPC-Typen (40+)

| Kategorie | Typen | Anzahl |
|---|---|---|
| Demonstranten | Friedlich, Aktivist, Radikal, Anführer, Familie, Senior, Student, etc. | 200-300 |
| Polizei | Streife, Bereitschaft, Einsatzleiter, Verhandler, Reiterstaffel, SEK | 100-150 |
| Medien | TV, Foto, Radio, Livestreamer, Drohne | 15-30 |
| Zivilisten | Passant, Tourist, Geschäftsinhaber, Obdachloser | 50-100 |
| Spezial | Undercover, Provokateur, Krause (Zielperson) | 3-8 |

### 7.2 AI-Architektur

- **Behavior Trees** als primäres Entscheidungssystem
  - Nodes: Sequence, Selector, Parallel, Inverter, Repeater, Conditional
  - Blackboard für Datenaustausch zwischen Nodes
  - 3 vorgefertigte Trees: Civilian, Rioter, Police
- **Utility AI** als Score-basiertes Fallback für einfache NPCs
  - FleeUtility = ThreatLevel × (1-Courage) × (1-Health)
- **Perception System:** 120° FOV, 30m Sichtweite, Hearing-Sensor
- **Memory System:** Short-Term + Long-Term, 100 Events Kapazität

### 7.3 Emotions-System

| Stufe | Range | Verhalten |
|---|---|---|
| CALM | 0.0-0.2 | Normal, gesprächsbereit |
| UNEASY | 0.2-0.4 | Nervös, schaut sich um |
| AGITATED | 0.4-0.6 | Laut, gestikulierend |
| ANGRY | 0.6-0.8 | Aggressiv, provozierend |
| ENRAGED | 0.8-1.0 | Gewaltbereit, angreifend |

- **Emotion Propagation:** Panik breitet sich aus (3m Radius), Wut (5m Radius)
- Delta-basierte Transitions — kein abruptes Umschalten

### 7.4 Crowd-Simulation

- **Boids-Algorithmus:** Separation (1.5m, Stärke 2.0), Alignment (5m, 1.0), Cohesion (10m, 0.5)
- **Crowd Density:** Comfortable <2.0/m², Crowded 2-3/m², Dangerous 3-4/m², **Crush >4.0/m²** (5 HP/s Schaden)
- **Sprechchor-Mechanik:** Initiator → Crowd-Response mit 0.1-0.3s Delay

### 7.5 Taktik-System

- **Formationen:** Linie, Keil, Box, Kreis — KI hält Formation automatisch
- **Squad-Management:** Leader + Members, Tension-basierte Taktik-Wahl
- **Polizei-Kommandos:** Formation ändern, Vorrücken, Rückzug, Verhaftung, Absperrung

---

## 8. State Management

### 8.1 Store-Architektur (Zustand v5, Slice-Pattern)

```
useGameStore
├── createPlayerSlice    → position, health, stamina, equipment, binoculars
├── createGameSlice      → gameState, missions, npcs, projectiles, worldItems, save/load
├── createInventorySlice → 40 slots, equipment, crafting
└── createSettingsSlice  → audio, graphics, accessibility, debug
```

### 8.2 Regeln

- NPCs als `Record<string, NPC>` — nicht als Array (O(1) statt O(n) Lookup)
- `useGameStore.getState()` in `useFrame` — nicht `useGameStore()` Hook (verhindert Re-Renders)
- `useGameStore.subscribe()` für Event-basierte Updates (z.B. Mission abgeschlossen → UI-Update)
- Selektive Subscriptions: `useGameStore(state => state.player.health)` — nicht den ganzen Store
- **Keine** `window`-Globals (`window.gameStore`, `window.playerState`)
- `selectIsPlaying = (state) => state.gameState.menuState === 'PLAYING'` — abgeleitet, nicht dupliziert

### 8.3 Separate Stores

- `useDialogStore` — Dialog-System mit Choices & Triggers
- `useFeatureFlagStore` — Phasen-basierte Feature-Aktivierung (persist via localStorage)
- `usePerformanceProfiler` — FPS, FrameTime, OptimizationLevel, crowdBudget, bloomEnabled

---

## 9. Audio

### 9.1 Layer-Architektur (3 Busse)

| Bus | dB | Inhalt |
|---|---|---|
| Music | -6 | Adaptive Soundtrack, 5 Tension-Layer, D-Moll |
| SFX | -3 | Umgebung, Waffen, Explosionen, Schritte |
| Voice | 0 | Dialog, NPC-Rufe, Megafon |

### 9.2 Spatial Audio

- 3D-Positionierung via Howler.js
- Inverse Distance Attenuation (1m Referenz, 50m Maximum)
- Occlusion: Tiefpass-Filter basierend auf Materialtyp (Beton vs. Glas)
- Doppler-Effekt für schnelle Quellen (343 m/s)

### 9.3 Adaptive Musik

- BPM skaliert mit Eskalation: 80 BPM (Stufe 0) → 150 BPM (Stufe 4)
- Crossfade auf musikalischem Grid (4 Beats)
- Stems: Pad, Strings, Percussion, Brass, Full Orchestra

### 9.4 Crowd-Audio

- Layer 1: Ambient Base (-30 dB, immer)
- Layer 2: Murmeln (-20 dB, skaliert mit NPC-Dichte)
- Layer 3: Sprechchöre (-15 dB, skaliert mit Tension)
- Layer 4: Schreie/Events (-10 dB, 3D-positioniert)

---

## 10. Backend & Deployment

### 10.1 Server

- **Express + Socket.IO** für Multiplayer-Grundlage
- WASM MIME-Type Middleware
- Differenziertes Caching: Assets 1 Jahr immutable, HTML no-cache
- CSP-Headers, CORS-Härtung

### 10.2 Deployment

- **Primär:** Hugging Face Spaces (aktuell konfiguriert)
- **Alternativ:** Google Cloud Run (Docker, europe-west3)
- COOP/COEP Headers für SharedArrayBuffer (Rapier WASM)

### 10.3 Save/Load

- Auto-Save bei Checkpoints + nach Events
- Manual-Save: 15 Slots mit Timestamp
- `localStorage` für Spielstände
- Corruption-Detection via Checksums

---

## 11. Testing

### 11.1 Framework

- **Vitest** für Unit-Tests (Stores, Manager, AI-Logik)
- **React Testing Library** für UI-Komponenten
- 80%+ Coverage, 100% für kritische Systeme (Store, Physics, AI)

### 11.2 Kritische Tests

- Ghost-Walking-Bug Prevention (Physics-Render Sync)
- 60 FPS @ 500 NPCs Desktop
- Memory Leak Rate < 10 MB/hour
- Alle 5 Enden erreichbar
- Kein Crash bei 2-Stunden-Playtest
- Delta-Time-Clamping funktioniert (max 0.1s)
- NaN-Protection in Player-Position und Velocity

### 11.3 Quality Gates

- 0 TypeScript-Errors
- 0 ESLint-Errors
- Load-Time <10s Desktop
- Input-Lag <50ms
- Keine `any`-Typen in Production-Code

---

## 12. Roadmap (Priorisiert)

### Phase 1 — Foundation (ERLEDIGT)
- [x] Vite + React 19 + TypeScript Setup
- [x] Zustand Store mit 4 Slices
- [x] R3F Canvas mit Rapier Physics
- [x] Player V1 (FPS, Rapier RigidBody, Store-basiert)
- [x] Tag-Nacht-Zyklus (TimeSystem)
- [x] InstancedCrowd (500 NPCs)
- [x] LOD-System (5 Stufen)
- [x] Post-Processing Pipeline
- [x] Feature-Flag-System (Phasen-basiert)
- [x] PerformanceProfiler mit adaptiver Qualität

### Phase 2 — Gameplay Core (NÄCHSTE)
- [ ] PhysicsWorld-Collider für alle Gebäude
- [ ] NPC Behavior Trees aktivieren (Civilian, Rioter, Police)
- [ ] Dialog-System End-to-End (DialogStore → UI → NPC-Reaktion)
- [ ] Tension-System End-to-End (Store → Events → NPC-Verhalten → HUD)
- [ ] Haupt-Quest mit 5 Branching-Punkten
- [ ] 3 Side-Quests (Der verlorene Sohn, Das Ultimatum, Bombendrohung)
- [ ] Moral-Score-Tracking + Ending-Berechnung

### Phase 3 — World & Immersion
- [ ] Stephansdom Detail-Geometrie (150k Polys)
- [ ] 6 Gründerzeit-Gebäude mit Fenstern/Türen/Texturen
- [ ] 247 Straßenlaternen mit Flicker-Sequenz
- [ ] Crowd-Audio (4 Layer, Tension-skaliert)
- [ ] Adaptive Musik (5 Stems, BPM-skaliert)
- [ ] Regen/Wetter-System
- [ ] Scripted Events (08:00-22:00 Timeline)

### Phase 4 — Polish & Content
- [ ] Restliche 7 Side-Quests
- [ ] 5 Ending-Cinematics
- [ ] Cutscene-Engine (4-Track Timeline)
- [ ] Wasserwerfer-Physik + Tränengas-Partikel
- [ ] Bengalos + Barrikaden
- [ ] Accessibility-Features (Farbenblind, TTS)
- [ ] Save/Load mit Cloud-Sync
- [ ] Performance-Optimierung auf alle 3 Hardware-Tiers

### Phase 5 — Multiplayer & Launch
- [ ] Socket.IO Multiplayer (2-4 Co-op)
- [ ] Leaderboard + Achievements
- [ ] Lokalisierung (EN)
- [ ] CI/CD Pipeline
- [ ] Production Build + Deployment

---

## 📌 Regeln für den KI-Agenten

1. **Nur Technologien aus Sektion 2 verwenden** — bei Bedarf nachfragen
2. **R3F-Patterns bevorzugen:** `useFrame`, `useThree`, `<mesh>`, Zustand — kein imperativer Three.js-Code
3. **Performance First:** Kein `new` in `useFrame`, kein `useState` in 3D-Komponenten, `InstancedMesh` für Crowds
4. **Store-basierte Architektur:** Logik im Store, Darstellung in der Komponente — Separation of Concerns
5. **Kein vages "mache es besser"** — konkrete Anweisungen: "Nutze `InstancedMesh` mit preallocated `Matrix4`"
6. **Feature-Flags nutzen:** Neue Features hinter Flags aktivieren, nicht hart einbauen
7. **Testen:** Jede Store-Action hat einen Unit-Test
8. **Keine window-Globals:** Alles über Zustand-Stores
9. **Adaptive Qualität:** Jedes Rendering-Feature muss auf `OptimizationLevel` reagieren können
10. **Deutsch als primäre Sprache** in Code-Kommentaren und UI-Texten
