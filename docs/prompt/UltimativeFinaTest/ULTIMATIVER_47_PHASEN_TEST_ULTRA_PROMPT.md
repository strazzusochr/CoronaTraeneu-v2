# 🔬 ULTIMATIVER 47-PHASEN TEST & VALIDIERUNGS-PROMPT
## VOLLSTÄNDIGE KONTROLLE ÜBER 868 KOMPONENTEN
## HYPER-ULTRA-PROFESSIONELLES QA-SYSTEM FÜR CORONA CONTROL ULTIMATE
### MIT AUTOMATISCHER BUG-REPARATUR UND PHASE-BY-PHASE TRACKING

---

> **⚠️ KRITISCHE AGENT-DIREKTIVE ⚠️**
>
> Du bist ein vollautonomer QA-Master-Engineer mit 30+ Jahren Erfahrung. Deine Mission ist die vollständige Validierung und automatische Reparatur von Corona Control Ultimate durch ALLE 47 Entwicklungsphasen mit 868 Komponenten. Du testest nicht nur - du **erzwingst Perfektion** durch unerbittliche Qualitätskontrolle und autonome Bug-Fixes. **KEINE AUSREDEN. KEINE KOMPROMISSE. NUR PERFEKTION.**

---

# 📋 TEIL 1: MISSION CONTROL MATRIX

## 1.1 Gesamtübersicht: 47-Phasen-System

```
╔════════════════════════════════════════════════════════════════════════════════════╗
║                    CORONA CONTROL ULTIMATE - TEST MATRIX                          ║
╠════════════════════════════════════════════════════════════════════════════════════╣
║  Gesamt-Komponenten:        868                                                   ║
║  Entwicklungsphasen:        47                                                    ║
║  Validierungs-Checkpoints:  470+ (10 pro Phase)                                   ║
║  Test-Kategorien:           12                                                    ║
║  Kritikalitäts-Levels:      4 (CRITICAL, HIGH, MEDIUM, LOW)                      ║
║  Erwartete Test-Dauer:      80-120 Stunden                                        ║
║  Bug-Fix-Budget:            Unlimitiert (bis perfekt)                             ║
╚════════════════════════════════════════════════════════════════════════════════════╝
```

## 1.2 Phase-Kategorien und Prioritäten

| Kategorie | Phasen | Komponenten | Kritikalität | Test-Dauer |
|-----------|--------|-------------|--------------|------------|
| **FOUNDATION** | 01-04 | 56 | CRITICAL | 8-12h |
| **ARCHITECTURE** | 05-07 | 55 | CRITICAL | 10-15h |
| **3D WORLD** | 08-13 | 74 | CRITICAL | 12-18h |
| **UI/UX** | 14-16 | 50 | HIGH | 8-12h |
| **DATA SYSTEMS** | 17-23 | 138 | HIGH | 15-20h |
| **LEVEL CONTENT** | 24-30 | 175 | CRITICAL | 20-30h |
| **ASSETS** | 31-35 | 189 | MEDIUM | 10-15h |
| **ADVANCED SYSTEMS** | 36-43 | 151 | HIGH | 15-20h |
| **TESTING & DEPLOY** | 44-47 | 44 | CRITICAL | 8-12h |

## 1.3 Test-Philosophie: Triple-Validation-Approach

**LEVEL 1: ATOMIC VALIDATION** - Jede Komponente einzeln
- Syntaktische Korrektheit
- Type-Safety
- API-Konformität
- Dokumentation vorhanden

**LEVEL 2: INTEGRATION VALIDATION** - Komponenten im Zusammenspiel
- Inter-Component-Communication
- State-Synchronisation
- Performance unter Last
- Memory-Management

**LEVEL 3: SYSTEM VALIDATION** - Gesamtsystem
- End-to-End-Workflows
- Cross-Browser-Kompatibilität
- Regression-Tests
- Production-Readiness

---

# 📋 TEIL 2: PHASE-SPEZIFISCHE VALIDIERUNGEN

## PHASE 01: BASIS-KONFIGURATION (15 Komponenten)
**Validierungscode: VAL-CONFIG-001**
**Kritikalität: CRITICAL**
**Abhängigkeiten: KEINE (Start-Phase)**

### Test-Katalog Phase 01

#### T-CFG-001: package.json Vollständigkeits-Check
**Beschreibung:** Prüfe ob alle 868 Komponenten-Dependencies korrekt deklariert sind.
**Test-Schritte:**
1. Öffne package.json
2. Checke "dependencies" Sektion
3. Verifiziere Versionen: react 19.0.0+, @react-three/fiber 8.15.0+, @react-three/drei 9.92.0+, three 0.160.0+, @dimforge/rapier3d-compat 0.14.0+, zustand 4.5.0+, typescript 5.3.0+
4. Checke "devDependencies": @types/three, eslint, prettier
5. Checke "scripts": start, build, test, lint
**Erwartetes Resultat:** Alle Packages vorhanden mit korrekten Versionen, keine Konflikte
**Fail-Kriterium:** Irgendein Package fehlt, falsche Version, oder Dependency-Konflikt
**Auto-Fix-Strategie:**
- Fehlende Packages: Führe `npm install <package>@<version>` aus
- Falsche Versionen: Update auf korrekte Version
- Konflikte: Nutze `npm install --legacy-peer-deps`
**Rollback-Punkt:** CFG-001-CHECKPOINT

#### T-CFG-002: TypeScript Strict-Mode Validation
**Beschreibung:** Verifiziere dass TypeScript in strict-mode konfiguriert ist.
**Test-Schritte:**
1. Öffne tsconfig.json
2. Checke "compilerOptions.strict": true
3. Checke "noImplicitAny": true (sollte durch strict impliziert sein, aber explizit prüfen)
4. Checke "strictNullChecks": true
5. Checke "strictFunctionTypes": true
6. Checke "strictBindCallApply": true
7. Checke "strictPropertyInitialization": true
8. Checke "noImplicitThis": true
9. Checke "alwaysStrict": true
10. Führe aus: `npx tsc --noEmit`
**Erwartetes Resultat:** Exit-Code 0, keine Compilation-Errors
**Fail-Kriterium:** Irgendein strict-Flag ist false, oder Compilation-Errors existieren
**Auto-Fix-Strategie:**
- Setze alle strict-Flags auf true
- Für jeden Compilation-Error:
  - Implicit any: Füge expliziten Type hinzu
  - Null-Check: Füge optional-chaining hinzu
  - Function-Type: Korrigiere Signatur
**Rollback-Punkt:** CFG-002-CHECKPOINT

#### T-CFG-003 bis T-CFG-015: [Weitere Config-Tests für app.json, babel.config, metro.config, routing, etc.]

### Phase 01 Zusammenfassung-Check

**PHASE 01 BESTANDEN WENN:**
✅ Alle 15 Komponenten existieren
✅ Alle Configs sind syntaktisch korrekt
✅ TypeScript kompiliert ohne Errors
✅ Expo-App startet ohne Crashes
✅ Alle Scripts funktionieren

**WENN PHASE 01 NICHT BESTANDEN:**
❌ STOPPE ALLE WEITEREN TESTS
❌ Fixe alle Probleme in Phase 01
❌ Re-Teste Phase 01 komplett
❌ Dokumentiere Fixes in PHASE_01_FIXES.md
❌ Erstelle Rollback-Punkt

---

## PHASE 02: TYPESCRIPT TYPES (12 Komponenten)
**Validierungscode: VAL-TYPES-002**
**Kritikalität: CRITICAL**
**Abhängigkeiten: PHASE 01**

### Test-Katalog Phase 02

#### T-TYP-001: Enums Vollständigkeit (35 Enums)
**Beschreibung:** Alle 35 Game-Enums müssen existieren und korrekt typisiert sein.
**Erwartete Enums:**
1. GameState (6 values: LOADING, MENU, PLAYING, PAUSED, ENDED, ERROR)
2. PlayerState (8 values: IDLE, WALKING, RUNNING, CROUCHING, AIMING, SHOOTING, INTERACTING, DEAD)
3. NPCType (40 values - siehe Phase 18)
4. NPCBehavior (12 values: IDLE, PATROL, CHASE, FLEE, ATTACK, GUARD, WANDER, FOLLOW, INVESTIGATE, PANIC, SURRENDER, DEAD)
5. WeaponType (14 values - siehe Phase 19)
6. VehicleType (15 values - siehe Phase 20)
7. EscalationLevel (5 values: CALM, TENSE, HOSTILE, VIOLENT, RIOT)
8. MoralChoice (3 values: PEACEFUL, NEUTRAL, AGGRESSIVE)
9. ObjectiveType (10 values: NAVIGATE, ARREST, ESCORT, SECURE, EVACUATE, NEGOTIATE, DEFEND, OBSERVE, REPORT, PREVENT)
10. ObjectiveStatus (4 values: ACTIVE, COMPLETED, FAILED, HIDDEN)
11. WeatherType (6 values: CLEAR, CLOUDY, RAIN, SNOW, FOG, STORM)
12. TimeOfDay (8 values: DAWN, MORNING, NOON, AFTERNOON, EVENING, DUSK, NIGHT, MIDNIGHT)
13. DifficultyLevel (4 values: EASY, NORMAL, HARD, REALISTIC)
14. EndingType (5 values: HERO, PROFESSIONAL, COMPROMISER, VILLAIN, FAILURE)
15. AchievementCategory (6 values: COMBAT, DIPLOMACY, SPEED, COLLECTION, SECRETS, MASTERY)
... [Vollständige Liste aller 35 Enums]

**Test-Schritte:**
1. Öffne src/types/enums.ts
2. Parse File mit TypeScript AST
3. Extrahiere alle Enum-Definitionen
4. Für jeden Enum: Checke Name, Values, Export
5. Verifiziere keine Duplikate
6. Checke dass alle Enums in index.ts re-exportiert sind

**Erwartetes Resultat:** Alle 35 Enums existieren mit korrekten Values
**Fail-Kriterium:** Irgendein Enum fehlt, falsche Values, oder nicht exportiert
**Auto-Fix-Strategie:**
- Fehlende Enums: Generiere basierend auf Spezifikation
- Falsche Values: Korrigiere auf Spec-konforme Values
- Export fehlt: Füge zu index.ts hinzu

#### T-TYP-002: Interfaces Vollständigkeit (93 Interfaces)
**Beschreibung:** Alle 93 Game-Interfaces müssen existieren.
**Kategorien:**
- Player Interfaces (8): IPlayer, IPlayerStats, IPlayerInventory, IPlayerControls, etc.
- NPC Interfaces (12): INPC, INPCStats, INPCBehavior, INPCPath, etc.
- Level Interfaces (15): ILevel, ILevelConfig, ISpawnPoint, IObjective, etc.
- Gameplay Interfaces (20): IGameState, IMoralSystem, IEscalationSystem, etc.
- UI Interfaces (18): IHUDState, IMenuState, IDialogState, etc.
- Audio Interfaces (8): IAudioConfig, ISoundEffect, IMusicTrack, etc.
- Physics Interfaces (6): IRigidBody, ICollider, IPhysicsWorld, etc.
- Vehicle Interfaces (6): IVehicle, IVehicleStats, IVehiclePhysics, etc.

**Test-Schritte:**
1. Öffne src/types/interfaces.ts
2. Parse alle Interface-Deklarationen
3. Für jedes Interface: Checke Properties, Types, Optional-Flags
4. Verifiziere Vererbungs-Ketten (extends)
5. Checke Export in index.ts

**Auto-Fix:** Generiere fehlende Interfaces aus Spec

#### T-TYP-003 bis T-TYP-012: [Weitere Type-Tests für player.types, npc.types, level.types, etc.]

### Phase 02 Zusammenfassung

**PHASE 02 BESTANDEN WENN:**
✅ Alle 35 Enums definiert
✅ Alle 93 Interfaces definiert
✅ Keine Type-Errors in gesamter Codebase
✅ Alle Types korrekt exportiert
✅ Code-Completion funktioniert in IDE

---

## PHASE 03: PROJEKT-ARCHITEKTUR (25 Komponenten)
**Validierungscode: VAL-ARCH-003**
**Kritikalität: CRITICAL**
**Abhängigkeiten: PHASE 01, 02**

### Test-Katalog Phase 03

#### T-ARCH-001: Verzeichnis-Struktur Compliance
**Test:** Alle 25 erforderlichen Directories existieren mit korrekter Verschachtelung
**Erwartete Struktur:**
```
src/
├── components/
│   ├── index.ts
│   ├── 3d/
│   │   ├── index.ts
│   │   ├── npcs/
│   │   ├── environment/
│   │   ├── vehicles/
│   │   └── effects/
│   ├── ui/
│   │   ├── index.ts
│   │   ├── hud/
│   │   ├── menus/
│   │   └── dialogs/
│   └── menus/
├── systems/
│   └── index.ts
├── stores/
│   └── index.ts
├── hooks/
│   └── index.ts
├── constants/
│   └── index.ts
├── utils/
│   └── index.ts
├── shaders/
│   ├── vertex/
│   └── fragment/
├── assets/
│   ├── models/
│   ├── textures/
│   ├── audio/
│   │   ├── sfx/
│   │   ├── music/
│   │   └── voice/
│   ├── fonts/
│   └── icons/
├── data/
│   ├── npcs.json
│   ├── levels.json
│   ├── dialogs.json
│   └── i18n/
│       ├── de.json
│       └── en.json
└── types/
    └── index.ts
```

**Test-Ausführung:**
1. Führe aus: `find src -type d`
2. Parse Output zu Directory-Tree
3. Vergleiche mit erwarteter Struktur
4. Checke jedes index.ts existiert wo erforderlich

**Auto-Fix:**
- Fehlende Directories: Erstelle mit `mkdir -p`
- Fehlende index.ts: Erstelle mit Barrel-Export-Template

#### T-ARCH-002 bis T-ARCH-025: [Weitere Architektur-Tests]

---

## PHASE 04: ZUSTAND STORES (14 Komponenten)
**Validierungscode: VAL-STORES-004**
**Kritikalität: CRITICAL**
**Abhängigkeiten: PHASE 02, 03**

### Test-Katalog Phase 04

#### T-STO-001: GameStore Implementation
**Test:** Prüfe ob GameStore alle erforderlichen State-Slices und Actions hat
**Erwartete State-Properties:**
- gameState: GameState enum
- isPaused: boolean
- currentLevel: number
- gameTime: number
- realTime: number
- deltaTime: number
- fixedDeltaTime: number
- timeScale: number

**Erwartete Actions:**
- startGame(): void
- pauseGame(): void
- resumeGame(): void
- endGame(ending: EndingType): void
- updateTime(delta: number): void
- setTimeScale(scale: number): void

**Test-Ausführung:**
1. Import gameStore from src/stores/gameStore
2. Checke alle State-Properties existieren
3. Checke alle Actions existieren
4. Teste jede Action führt korrekte State-Mutation aus
5. Performance-Test: 10000 State-Updates in < 100ms

**Auto-Fix:**
- Fehlende Properties: Füge mit Default-Values hinzu
- Fehlende Actions: Implementiere basierend auf Spec
- Performance-Issues: Optimiere mit immer, produce, oder shallow-compare

#### T-STO-002 bis T-STO-014: [Tests für alle anderen Stores]

---

## PHASE 05: CUSTOM HOOKS (15 Komponenten)
**Validierungscode: VAL-HOOKS-005**
**Kritikalität: CRITICAL**
**Abhängigkeiten: PHASE 04**

### Test-Katalog Phase 05

#### T-HK-001: useGameLoop Hook
**Test:** Verifiziere dass useGameLoop korrekt mit useFrame integriert
**Erwartetes Verhalten:**
- Subscription zu R3F useFrame
- Delta-Time-Berechnung und Clamping
- Game-Time-Update
- Performance-Monitoring
- Cleanup bei Unmount

**Test-Schritte:**
1. Mount Test-Component die useGameLoop nutzt
2. Simuliere 60 Frames (1 Sekunde bei 60 FPS)
3. Checke gameTime erhöht sich um 60 Spiel-Sekunden (timeScale 60)
4. Checke deltaTime liegt zwischen 0.01 und 0.02 (bei 60 FPS)
5. Simuliere Frame-Drop (deltaTime > 0.1)
6. Checke deltaTime wurde geclampt auf 0.1
7. Unmount Component
8. Checke keine Memory-Leaks (subscription cleaned up)

**Auto-Fix:**
- Hook existiert nicht: Erstelle Template-Implementation
- Delta-Clamping fehlt: Füge `Math.min(delta, 0.1)` hinzu
- Cleanup fehlt: Füge useEffect cleanup-function hinzu

#### T-HK-002 bis T-HK-015: [Tests für alle anderen Hooks]

---

## PHASE 06: UTILITY FUNCTIONS (12 Komponenten)
**Validierungscode: VAL-UTILS-006**
**Kritikalität: HIGH**

### Test-Katalog Phase 06

#### T-UTL-001: Math Utils Accuracy Tests
**Test:** Alle Math-Funktionen müssen korrekte Ergebnisse liefern
**Erwartete Funktionen:**
- lerp(a, b, t): Linear-Interpolation
- clamp(value, min, max): Value-Clamping
- remap(value, fromMin, fromMax, toMin, toMax): Range-Remapping
- easeInOutCubic(t): Easing-Function
- distance2D(x1, y1, x2, y2): 2D-Distance
- distance3D(x1, y1, z1, x2, y2, z2): 3D-Distance
- angleBetween(x1, y1, x2, y2): Angle-Berechnung
- randomRange(min, max): Random in Range
- randomInt(min, max): Random Integer
- degToRad(deg): Degree zu Radian
- radToDeg(rad): Radian zu Degree

**Test-Cases:**
```javascript
// lerp Tests
assert(lerp(0, 100, 0.5) === 50)
assert(lerp(0, 100, 0) === 0)
assert(lerp(0, 100, 1) === 100)

// clamp Tests
assert(clamp(150, 0, 100) === 100)
assert(clamp(-50, 0, 100) === 0)
assert(clamp(50, 0, 100) === 50)

// remap Tests
assert(remap(5, 0, 10, 0, 100) === 50)
assert(remap(0, 0, 10, 100, 200) === 100)
assert(remap(10, 0, 10, 100, 200) === 200)

// easeInOutCubic Tests
assert(easeInOutCubic(0) === 0)
assert(easeInOutCubic(1) === 1)
assert(easeInOutCubic(0.5) === 0.5)

// distance3D Tests
assert(distance3D(0,0,0, 1,0,0) === 1)
assert(distance3D(0,0,0, 1,1,0) === Math.sqrt(2))
assert(distance3D(0,0,0, 1,1,1) === Math.sqrt(3))

// degToRad / radToDeg Tests
assert(degToRad(180) === Math.PI)
assert(radToDeg(Math.PI) === 180)
```

**Performance-Tests:**
- 1 Million lerp calls in < 50ms
- 1 Million distance3D calls in < 100ms

**Auto-Fix:**
- Funktion fehlt: Implementiere basierend auf Formel
- Falsches Ergebnis: Korrigiere Implementierung
- Performance schlecht: Optimiere mit inline oder fast-math

#### T-UTL-002 bis T-UTL-012: [Tests für geometry, procedural, pathfinding, collision, etc.]

---

## PHASE 07: GAMEPLAY SYSTEMS (28 Komponenten)
**Validierungscode: VAL-SYSTEMS-007**
**Kritikalität: CRITICAL**

### Test-Katalog Phase 07

#### T-SYS-001: GameLoop System Core-Functionality
**Test:** Der GameLoop muss alle Sub-Systems in korrekter Reihenfolge aufrufen
**Erwartete Execution-Order:**
1. Input-System (prio 1000)
2. AI-System (prio 900)
3. Physics-System (prio 800)
4. Animation-System (prio 700)
5. Audio-System (prio 600)
6. Event-System (prio 500)
7. UI-Update (prio 400)

**Test-Ausführung:**
1. Starte GameLoop
2. Mock alle Sub-Systems mit Call-Counter
3. Führe 1 Frame aus
4. Verifiziere Call-Order ist korrekt
5. Verifiziere jedes System genau einmal aufgerufen
6. Messe Gesamt-Frame-Time (muss < 16.67ms sein @ 60 FPS)

**Auto-Fix:**
- Falsche Order: Sortiere Systems nach Priority
- System fehlt: Füge Default-Implementation hinzu
- Performance-Problem: Profile und optimiere langsamste System

#### T-SYS-002: Moral System - Choice Tracking
**Test:** Moral-System muss alle Spieler-Entscheidungen korrekt tracken
**Test-Cases:**
1. Spieler benutzt Pfefferspray: moralScore -= 10
2. Spieler verhandelt erfolgreich: moralScore += 20
3. Spieler verhaftet aggressiv: moralScore -= 15
4. Spieler lässt Demonstranten gehen: moralScore += 5
5. Spieler benutzt Schusswaffe: moralScore -= 50
6. Spieler verhindert Gewalt: moralScore += 30

**Test-Ausführung:**
1. Starte mit moralScore = 0
2. Simuliere alle 6 Actions nacheinander
3. Erwarteter End-Score: 0 - 10 + 20 - 15 + 5 - 50 + 30 = -20
4. Checke Score stimmt überein
5. Checke moralAlignment updated (PEACEFUL, NEUTRAL, AGGRESSIVE)

**Auto-Fix:**
- Scoring falsch: Korrigiere Werte gemäß Spec
- Alignment-Berechnung fehlt: Implementiere Thresholds

#### T-SYS-003 bis T-SYS-028: [Tests für alle anderen Systems]

---

## PHASE 08: 3D BASE COMPONENTS (18 Komponenten)
**Validierungscode: VAL-3DBASE-008**
**Kritikalität: CRITICAL**

### Test-Katalog Phase 08

#### T-3D-001: GameScene Render-Pipeline
**Test:** Die GameScene muss korrekt initialisieren und rendern
**Erwartete Komponenten in Scene:**
- Player (1x)
- Camera-Controller (1x)
- Lighting-Setup (3-5 Lights)
- Sky-Dome oder Sky-Box
- Ground-Plane
- Post-Processing-Stack
- LOD-Manager
- Performance-Monitor

**Test-Schritte:**
1. Mount GameScene Component
2. Warte auf Initialization (max 5 Sekunden)
3. Traversiere Scene-Graph
4. Zähle Objekte jedes Typs
5. Checke Render-Output ist nicht schwarz
6. Messe FPS über 10 Sekunden
7. Checke FPS >= 60 (ohne NPCs)
8. Checke GPU-Memory < 500MB
9. Checke Draw-Calls < 100

**Auto-Fix:**
- Komponente fehlt: Füge Default-Version hinzu
- FPS zu niedrig: Aktiviere Performance-Optimierungen
- Memory zu hoch: Dispose ungenutzte Geometries
- Draw-Calls zu hoch: Merge Static-Meshes

#### T-3D-002: Player Model - Anatomie-Validierung
**Test:** Player-Modell muss anatomisch korrekt sein (KEIN Zylinder!)
**Erwartete Geometrie:**
- Kopf: SphereGeometry mit Gesichtszügen (Augen, Nase, Mund)
- Torso: LatheGeometry mit Körperform (Schultern, Taille, Hüfte)
- Arme (2x): CapsuleGeometry mit Ellbow-Joints
- Hände (2x): Mit Finger-Geometrie (vereinfacht)
- Beine (2x): CapsuleGeometry mit Knee-Joints
- Füße (2x): Box-Geometrie mit Sohle
- Kleidung: Separate Mesh-Layer

**Polygon-Count Erwartung:** 5000-8000 Triangles (LOD-0)

**Test-Ausführung:**
1. Lade Player-Model
2. Traversiere Mesh-Hierarchie
3. Zähle Triangles pro Body-Part
4. Checke Gesichtszüge existieren (mindestens Augen+Nase+Mund)
5. Checke Hände haben Finger-Geometrie
6. Checke Kleidung ist separate Layer
7. Mache Screenshot von vorne, Seite, hinten
8. Visuell: Ist erkennbar menschlich? (Nicht Strichmännchen)

**Fail-Kriterium:** 
- Torso ist simpler Zylinder
- Kopf ist Kugel ohne Gesicht
- Hände sind Stumpen ohne Finger
- Gesamt-Polygon-Count < 3000

**Auto-Fix:**
❌ **STOPPE SOFORT ALLE TESTS**
❌ **IMPLEMENTIERE KORREKTE NPC-ANATOMIE AUS R3F_IMPLEMENTIERUNG_DETAIL.md**
❌ **LÖSCHE PRIMITIVE GEOMETRIE KOMPLETT**
❌ **RE-TESTE T-3D-002 BIS BESTANDEN**

#### T-3D-003 bis T-3D-018: [Tests für Camera, Lighting, LOD, Physics, etc.]

---

## PHASE 09: NPC COMPONENTS (10 Komponenten)
**Validierungscode: VAL-NPC-009**
**Kritikalität: CRITICAL**

### Test-Katalog Phase 09

#### T-NPC-001: NPCManager - 500 NPCs Performance
**Test:** System muss 500 NPCs gleichzeitig bei 60 FPS handhaben
**Test-Setup:**
1. Spawne 500 NPCs über gesamte Map
2. Mix: 200 Demonstrators, 150 Police, 100 Civilians, 50 Media
3. Alle NPCs haben AI aktiv (Pathfinding, Behavior-Tree)
4. Lasse 5 Minuten in Realtime laufen

**Performance-Metriken:**
- FPS >= 60 (kritisch)
- Draw-Calls < 500 (durch Instancing)
- GPU-Memory < 2GB
- CPU-Time für AI < 3ms pro Frame
- Memory-Leak-Test: RAM-Nutzung stabil (< 10% Anstieg über 5 Min)

**Auto-Fix:**
- FPS < 60: Aktiviere aggressive LOD, erhöhe Instancing
- Draw-Calls hoch: Implementiere InstancedMesh korrekt
- AI zu langsam: Throttle AI-Updates (nicht jeder Frame)
- Memory-Leak: Finde und dispose ungenutzte Resources

#### T-NPC-002: NPC Model Anatomie (KRITISCH)
**Test:** Jeder NPC-Typ muss anatomisch korrekt sein
**Erwartung:** Identisch zu Player-Model-Anforderungen (siehe T-3D-002)
**Polygon-Count pro NPC:**
- LOD-0 (< 20m): 3000-5000 Triangles
- LOD-1 (20-50m): 800-1500 Triangles
- LOD-2 (> 50m): Billboard-Sprite (4 Triangles)

**Test für JEDEN NPC-Typ:**
1. Spawne 1 NPC jedes Typs (40 Types total aus Phase 18)
2. Checke Anatomie-Vollständigkeit
3. Zähle Polygone
4. Screenshot jedes Typs
5. Visuell: Unterscheidbar? Realistic?

**Fail wenn:**
- Irgendein NPC ist primitiver Zylinder
- Polygon-Count < 1500 (LOD-0)
- Keine Gesichtszüge
- Nicht unterscheidbar von anderen Typs

**Auto-Fix:**
❌ **STOPPE ALLE TESTS**
❌ **IMPLEMENTIERE ANATOMISCH KORREKTE NPCs FÜR ALLE 40 TYPEN**
❌ **NUTZE VARIATIONS-SYSTEM: Basis-Mesh + Kleidungs-Varianten**
❌ **RE-TESTE BIS ALLE 40 TYPES BESTEHEN**

#### T-NPC-003 bis T-NPC-010: [Tests für Behavior, Animation, LOD, Audio, etc.]

---

## PHASE 10-16: ENVIRONMENT, VEHICLES, EFFECTS, WEATHER, UI, MENUS, SHADERS
**[147 Komponenten total]**
**Test-Durchführung analog zu Phase 08-09**

### Kritische Tests dieser Phasen:

#### T-ENV-001: Stephansdom Erkennbarkeit (Phase 10)
**Test:** Stephansdom muss als solcher visuell identifizierbar sein
**Erwartung:**
- Südturm 137m hoch
- Charakteristisches Ziegeldach-Muster (Grün/Gelb/Schwarz)
- Gotische Fenster mit Glasmalerei
- Drei Hauptportale
- Polygon-Count > 50.000

**Fail wenn:** Dom ist blaues Rechteck oder nicht erkennbar
**Auto-Fix:** ❌ STOPPE, implementiere Dom gemäß Spec

#### T-UI-001: HUD Always-Visible (Phase 14)
**Test:** HUD-Elemente dürfen niemals verschwinden
**Erwartung:**
- Tension-Meter immer sichtbar (oben links)
- Mini-Map immer sichtbar (oben rechts)
- Health-Bar immer sichtbar (unten links)
- Objective-Tracker immer sichtbar (oben mitte)

**Test:** Spiele 1 Stunde, checke HUD jede Sekunde
**Fail wenn:** Irgendein Element verschwindet für > 0.5s

#### T-SHD-001: Shader Compilation (Phase 16)
**Test:** Alle 16 Shader-Paare müssen kompilieren
**Test:** Führe shader-validation für alle .vert und .frag Files aus
**Fail wenn:** Irgendein Shader kompiliert nicht
**Auto-Fix:** Korrigiere Syntax, check GLSL-Version

---

## PHASE 17-23: CONSTANTS & DATA SYSTEMS (138 Komponenten)

### Test-Katalog dieser Phasen

#### T-CON-001 bis T-CON-018: Game Constants Validation
**Test:** Alle 18 Konstanten-Dateien müssen korrekte Werte haben
**Beispiele:**
- PHYSICS_TIMESTEP === 1/60 (0.01666...)
- MAX_NPCS === 500
- RENDER_DISTANCE === 1000 (Meter)
- SHADOW_MAP_SIZE === 2048
- etc.

#### T-NPCSTAT-001 bis T-NPCSTAT-040: NPC Stats für alle 40 Typen
**Test:** Jeder NPC-Typ muss vollständige Stats haben
**Erwartete Properties pro NPC-Type:**
- id: string (unique)
- name: string
- health: number (50-150)
- speed: number (1.0-3.0 m/s)
- aggression: number (0-100)
- morale: number (0-100)
- equipment: WeaponType[]
- behavior: NPCBehavior
- spawnProbability: number (0-1)

**Test-Ausführung:**
1. Lade npcs.json
2. Parse zu Array
3. Checke length === 40
4. Für jeden NPC: Validate alle Properties existieren und in Range
5. Checke keine Duplikat-IDs
6. Checke alle Namen unique

**Auto-Fix:**
- NPC fehlt: Generiere aus Template mit Random-Stats
- Property fehlt: Füge Default-Value hinzu
- Value out-of-range: Clamp zu valid Range

#### T-WPN-001 bis T-WPN-014: Weapon Stats
#### T-VEH-001 bis T-VEH-015: Vehicle Stats
#### T-LVL-001 bis T-LVL-021: Level Configs
#### T-DLG-001 bis T-DLG-020: Dialog Data
#### T-I18N-001 bis T-I18N-010: Translations

---

## PHASE 24-30: LEVEL CONTENT (175 Komponenten)
**7 Haupt-Levels mit je 25-30 Komponenten**

### Test-Katalog Level-Phasen

#### T-L1-001: Level 1 Kärntner Straße - Playability
**Test:** Level muss von Start bis Ende durchspielbar sein
**Test-Schritte:**
1. Lade Level 1
2. Warte auf Level-Load (max 30s)
3. Checke alle 5 Objectives sind defined
4. Spiele Level komplett durch (verwende AI-Bot oder Manual)
5. Erreiche End-Condition (Success oder Failure)
6. Checke Level-End-Screen erscheint
7. Checke Stats werden korrekt angezeigt

**Performance während Level:**
- FPS >= 60 über gesamte Spieldauer
- Load-Time < 30s
- Keine Crashes
- Keine Memory-Leaks

**Fail wenn:**
- Level lädt nicht
- Objectives nicht erreichbar
- Crashes während Gameplay
- End-Screen erscheint nicht

**Auto-Fix:**
- Load-Fehler: Checke Asset-Paths, re-package Assets
- Objective-Bug: Debugge Trigger-Conditions
- Crash: Fix aus Stack-Trace
- Performance: Optimiere Level-Geometrie

#### T-L1-002 bis T-L1-025: Weitere Level 1 Tests
#### T-L2-001 bis T-L2-022: Level 2 Tests
#### ... bis
#### T-L7-001 bis T-L7-030: Level 7 Tests (inkl. 5 Endings)

### Level 7 Ending-Tests

#### T-L7-026: Ending 1 "HERO" Erreichbar
**Test:** Perfekter Durchlauf muss HERO-Ending triggern
**Conditions:** moralScore > 80, escalation < 20%, zero deaths
**Test:** Spiele Level 7 perfekt, checke Ending

#### T-L7-027 bis T-L7-030: Endings 2-5 Tests

---

## PHASE 31-35: ASSETS (189 Komponenten)

### Test-Katalog Asset-Phasen

#### T-ANIM-001 bis T-ANIM-085: Player Animations
**Test pro Animation:**
1. Lade Animation
2. Spiele ab (1 Sekunde Clip)
3. Checke keine T-Pose-Frames
4. Checke smooth Transitions
5. Checke korrektes Looping (wenn Loop-Animation)

**Performance:** Alle 85 Animations laden in < 10 Sekunden

#### T-SFX-001 bis T-SFX-050: Sound Effects
**Test pro SFX:**
1. Lade Sound-File
2. Spiele ab
3. Checke keine Clipping/Distortion
4. Checke Länge passt zu Spec
5. Checke korrektes Format (MP3 oder OGG)

**Performance:** Alle 50 SFX laden in < 5 Sekunden

#### T-MUS-001 bis T-MUS-020: Music Tracks
#### T-VOX-001 bis T-VOX-015: Voice Lines
#### T-UIAS-001 bis T-UIAS-019: UI Assets

---

## PHASE 36-43: ERWEITERTE SYSTEME (151 Komponenten)

### Test-Katalog Advanced Systems

#### T-ACH-001 bis T-ACH-055: Achievement System (55)
**Test:** Alle 50 Achievements müssen erreichbar sein
**Test-Methode:** Simuliere Conditions für jedes Achievement
**Beispiel:**
- Achievement "First Blood": Verhaftung durchführen → Check Achievement unlocked
- Achievement "Peacekeeper": Level ohne Gewalt abschließen → Check unlocked
- Achievement "Speedrunner": Level in < 10 Min → Check unlocked

#### T-CUT-001 bis T-CUT-030: Cutscene System (30)
**Test:** Alle 25 Cutscenes müssen abspielen
**Test pro Cutscene:**
1. Trigger Cutscene
2. Warte auf Start (max 2s)
3. Lasse komplett abspielen
4. Checke Audio-Sync
5. Checke End-Callback wird aufgerufen
6. Checke Skip-Funktion (ESC-Taste)

#### T-TUT-001 bis T-TUT-015: Tutorial System
#### T-ACC-001 bis T-ACC-015: Accessibility Features
#### T-REP-001 bis T-REP-010: Reputation System
#### T-EVD-001 bis T-EVD-008: Evidence System
#### T-MED-001 bis T-MED-008: Media Coverage
#### T-EVT-001 bis T-EVT-010: Dynamic Events

---

## PHASE 44-47: TESTING & DEPLOYMENT (44 Komponenten)

### Test-Katalog Final Phases

#### PHASE 44: UNIT TESTS (12)
**Test:** Alle Unit-Tests müssen bestehen
**Ausführung:** `npm test`
**Erwartung:** 100% Pass-Rate
**Coverage-Target:** > 80%

#### PHASE 45: INTEGRATION TESTS (10)
**Test:** Alle System-Integration-Tests bestehen
**Test-Suites:**
1. Player-NPC-Interaction
2. Combat-System-Integration
3. UI-Game-State-Sync
4. Audio-Event-Triggering
5. Save-Load-Persistence
6. Cross-Level-State-Transfer
7. Achievement-Unlock-Flow
8. Dialog-Choice-Consequences
9. Moral-Escalation-Coupling
10. Ending-Condition-Evaluation

#### PHASE 46: PERFORMANCE TESTS (8)
**Test:** Alle Performance-Benchmarks bestehen
**Benchmarks:**
1. 500 NPCs @ 60 FPS
2. Load-Time < 30s
3. Memory < 2GB (Desktop) / < 1GB (Mobile)
4. Draw-Calls < 500
5. Asset-Streaming-Bandwidth < 10 MB/s
6. Input-Lag < 50ms
7. Network-Latency < 100ms (wenn Multiplayer)
8. Battery-Drain < 20%/hour (Mobile)

#### PHASE 47: BUILD & DEPLOY (14)
**Test:** Builds für alle Plattformen erfolgreich
**Targets:**
1. Web (Chrome/Firefox/Safari/Edge)
2. Android (APK + AAB)
3. iOS (IPA)
4. Windows (Electron)
5. macOS (Electron)
6. Linux (Electron)

**Test pro Platform:**
1. Führe Build aus
2. Checke keine Build-Errors
3. Checke Output-Size < Limit
4. Installiere/Starte auf Ziel-Platform
5. Spiele kurze Test-Session
6. Checke keine Crashes
7. Checke Performance meets Target

---

# 📋 TEIL 3: AUTONOME REPARATUR-PROTOKOLLE

## 3.1 Bug-Kategorisierung und Prioritäten

### Bug-Severity-Matrix

| Severity | Beschreibung | Max-Fix-Zeit | Beispiele |
|----------|--------------|--------------|-----------|
| **BLOCKER** | Spiel unspielbar | Sofort | Crash on Start, Black Screen |
| **CRITICAL** | Kern-Feature broken | < 2h | Player can't move, NPCs don't spawn |
| **HIGH** | Feature broken but workaround | < 8h | Dialog skips broken, Save doesn't work |
| **MEDIUM** | Minor feature issue | < 24h | Animation glitch, Audio too loud |
| **LOW** | Cosmetic only | < 1 Woche | UI text clipping, Minor visual artifacts |

### Auto-Fix Decision Tree

```
Bug gefunden
    ├─ Ist BLOCKER/CRITICAL?
    │  ├─ Ja → ❌ STOPPE ALLE TESTS
    │  │      → 🔧 FIXE SOFORT
    │  │      → ✅ RE-TESTE ALLES
    │  └─ Nein → Ist HIGH?
    │      ├─ Ja → 🔧 FIXE nach aktueller Phase
    │      └─ Nein → 📝 DOKUMENTIERE, fixe später
    │
    └─ Kann automatisch fixen?
       ├─ Ja → 🤖 AUTO-FIX
       │      → ✅ VERIFIZIERE Fix
       │      → 📄 LOGGE in BUG_FIXES.md
       └─ Nein → 🚨 BENACHRICHTIGE USER
               → ⏸️ PAUSE Tests
               → 📋 WARTE auf Manual-Fix
```

## 3.2 Phase-Spezifische Auto-Fix-Strategien

### Phase 01-04: Foundation Fixes

**TypeScript-Errors:**
```
ERROR: Property 'health' does not exist on type 'NPC'
FIX:
  1. Öffne src/types/npc.types.ts
  2. Finde Interface INPC
  3. Füge hinzu: health: number;
  4. Re-compile
  5. Verifiziere Error weg
```

**Dependency-Conflicts:**
```
ERROR: Peer dependency @react-three/fiber@8.x required, found 7.x
FIX:
  1. npm uninstall @react-three/fiber
  2. npm install @react-three/fiber@^8.15.0
  3. npm install (update lockfile)
  4. Re-test installation
```

### Phase 08-09: 3D Component Fixes

**Primitive NPC Detected:**
```
ERROR: NPC-001 has polygon count 300 (< 3000 minimum)
ERROR: NPC-001 body is CylinderGeometry (primitive not allowed)
FIX:
  1. ❌ DELETE entire NPC-001 component
  2. 📖 READ R3F_IMPLEMENTIERUNG_DETAIL.md
  3. 🔧 IMPLEMENT anatomically correct NPC:
     - Head: SphereGeometry + facial features
     - Torso: LatheGeometry with body-shape
     - Arms: CapsuleGeometry + hands
     - Legs: CapsuleGeometry + feet
     - Clothing: Separate mesh layer
  4. ✅ VERIFY polygon count > 3000
  5. 📸 SCREENSHOT for report
  6. ♻️ RE-TEST T-NPC-002
```

**Building is Blue Rectangle:**
```
ERROR: Building-001 is BoxGeometry without details
FIX:
  1. ❌ DELETE Building-001
  2. 🔧 IMPLEMENT proper building:
     - Window-Component with frame+glass
     - Door-Component with handle
     - Multiple floors
     - Roof structure
     - Textures
  3. ✅ VERIFY polygon count > 10000
  4. 📸 SCREENSHOT
```

### Phase 24-30: Level Content Fixes

**Objective Not Triggerable:**
```
ERROR: Level 3, Objective 2 "Secure Perimeter" never completes
DEBUG:
  1. Check Objective-Trigger-Conditions in level config
  2. Check Player-Position-Tracking
  3. Check Trigger-Zone-Collider exists
  4. Add debug visualization for trigger zone
FIX:
  1. If condition wrong: Adjust threshold
  2. If zone missing: Add collider
  3. If tracking broken: Fix position-update
  4. Re-test objective completion
```

### Performance Fixes

**FPS < 60:**
```
ERROR: FPS = 45 @ 500 NPCs (target: 60)
PROFILE:
  1. Run Chrome DevTools Performance
  2. Identify bottleneck
DEBUG Output:
  - Draw-Calls: 1200 (too high!)
  - Triangles: 5M (acceptable)
  - AI-Time: 1.2ms (ok)
  - Render-Time: 22ms (bottleneck)
FIX:
  1. Implement InstancedMesh for NPCs
     → Reduce 500 draw-calls to 8
  2. Enable Frustum-Culling (if not already)
  3. Implement aggressive LOD:
     → LOD-1 at 30m instead of 50m
     → LOD-2 at 60m instead of 100m
  4. Re-test FPS
RESULT: FPS = 63 ✅
```

**Memory-Leak:**
```
ERROR: RAM usage 2GB → 3.5GB over 10 minutes
PROFILE:
  1. Chrome Memory Profiler
  2. Take Heap Snapshot
  3. Compare Start vs End
DEBUG Output:
  - Geometries: +500MB (leak!)
  - Textures: Stable
  - Arrays: +200MB (leak!)
FIX:
  1. Find undisposed Geometries:
     → Search for new THREE.BoxGeometry() without .dispose()
  2. Add cleanup in useEffect:
     return () => {
       geometry.dispose();
       material.dispose();
     }
  3. Find growing Arrays:
     → EventLog array never clears
     → Add: if (eventLog.length > 1000) eventLog.shift()
  4. Re-test memory
RESULT: RAM stable at 2.1GB ✅
```

---

# 📋 TEIL 4: TEST-DURCHFÜHRUNGS-WORKFLOW

## 4.1 Test-Session-Protokoll

### Pre-Test-Checklist

**BEVOR ERSTER TEST STARTET:**
```
[ ] Git-Repository sauber (keine uncommitted changes)
[ ] Alle Dependencies installiert
[ ] Node-Version korrekt (18+ empfohlen)
[ ] Genug Disk-Space (min 10GB frei)
[ ] Browser up-to-date
[ ] Performance-Monitor bereit (Chrome DevTools)
[ ] Logging aktiviert (Console-Output sichtbar)
[ ] Backup erstellt (vor-Test-Snapshot)
[ ] Test-Report-Template bereit
[ ] Kaffee gemacht ☕ (wird lange dauern)
```

### Phase-Execution-Workflow

**FÜR JEDE PHASE (1-47):**

```
PHASE [N]: [NAME]
├─ 1. Phase-Start-Log
│  └─ "🚀 Starting Phase [N]: [NAME]"
│     "📊 Components: [X]"
│     "⏱️ Estimated Time: [Y] hours"
│     "🔗 Dependencies: Phase [X, Y, Z]"
│
├─ 2. Dependency-Check
│  ├─ Checke alle vorherigen Phasen bestanden
│  ├─ Wenn nicht: ❌ ABORT, fixe Dependencies first
│  └─ Wenn ja: ✅ Proceed
│
├─ 3. Component-Loop
│  └─ FOR EACH Component in Phase:
│     ├─ Test-Start: "🧪 Testing [Component-ID]"
│     ├─ Run alle Tests für Component
│     ├─ IF Test PASS:
│     │  └─ "✅ [Component-ID] PASSED"
│     └─ IF Test FAIL:
│        ├─ "❌ [Component-ID] FAILED"
│        ├─ Log Error-Details
│        ├─ Classify Severity
│        ├─ IF BLOCKER/CRITICAL:
│        │  ├─ ⏸️ PAUSE alle Tests
│        │  ├─ 🔧 AUTO-FIX (if possible)
│        │  └─ 🔄 RE-TEST Component
│        └─ ELSE:
│           └─ 📝 Add to Fix-Later-List
│
├─ 4. Phase-End-Summary
│  ├─ Count: Passed, Failed, Skipped
│  ├─ Performance-Metriken
│  ├─ Screenshot-Collection
│  └─ Commit Checkpoint
│
└─ 5. Continue to Next Phase
   (oder STOP wenn Critical-Failures)
```

## 4.2 Checkpoint-System

### Checkpoint-Arten

**AUTOMATIC CHECKPOINTS (nach jeder Phase):**
```bash
# Git-Commit mit standardisiertem Format
git add .
git commit -m "✅ CHECKPOINT: Phase [N] - [NAME] | [X]/[Y] Tests PASSED"
git tag "phase-[N]-checkpoint"
```

**MANUAL CHECKPOINTS (nach Critical-Fixes):**
```bash
git add .
git commit -m "🔧 CRITICAL-FIX: [Bug-ID] - [Description]"
git tag "fix-[Bug-ID]"
```

**ROLLBACK-CHECKPOINTS (Backup-Punkte):**
```bash
# Erstelle ZIP-Backup
timestamp=$(date +%Y%m%d_%H%M%S)
zip -r "backup_phase_[N]_${timestamp}.zip" . -x "node_modules/*" ".git/*"
# Upload zu Cloud (optional)
```

### Rollback-Prozedur

**WENN ALLES KAPUTT IST:**
```bash
# Option 1: Git-Rollback zu letztem Checkpoint
git reset --hard phase-[N-1]-checkpoint

# Option 2: Restore von ZIP
unzip backup_phase_[N]_*.zip -d ./restored/

# Option 3: Cherry-Pick einzelne Fixes
git cherry-pick fix-[Bug-ID]
```

---

# 📋 TEIL 5: FINAL-REPORT-TEMPLATE

## 5.1 Report-Struktur

```markdown
# 🎮 CORONA CONTROL ULTIMATE - FINAL TEST REPORT
## 47-Phasen Vollständige Validierung
### Test-Agent: [Agent-Name]
### Datum: [YYYY-MM-DD]
### Gesamt-Test-Dauer: [XXX] Stunden

---

## ⚡ EXECUTIVE SUMMARY

**Release-Status:** ✅ READY / ⚠️ WITH WARNINGS / ❌ NOT READY

**Gesamt-Übersicht:**
- Gesamt-Komponenten: 868
- Getestet: XXX (XX.X%)
- Bestanden: XXX (XX.X%)
- Fehlgeschlagen: XXX (XX.X%)
- Gefixt: XXX (XX.X%)
- Verbleibend: XXX (XX.X%)

**Performance-Metriken:**
- FPS (Desktop): XX @ 500 NPCs (Target: 60) [✅/❌]
- FPS (Mobile): XX @ 50 NPCs (Target: 30) [✅/❌]
- Load-Time: XXs (Target: < 30s) [✅/❌]
- Memory (Desktop): X.XGB (Target: < 2GB) [✅/❌]
- Memory (Mobile): XXXmb (Target: < 1GB) [✅/❌]
- Draw-Calls: XXX (Target: < 500) [✅/❌]

**Qualitäts-Score:**
```
╔══════════════════════════════════════════════════════════╗
║  CODE-QUALITÄT:     XX/100  ████████░░  [✅/❌]          ║
║  PERFORMANCE:       XX/100  ████████░░  [✅/❌]          ║
║  VISUAL-QUALITÄT:   XX/100  ████████░░  [✅/❌]          ║
║  GAMEPLAY:          XX/100  ████████░░  [✅/❌]          ║
║  AUDIO:             XX/100  ████████░░  [✅/❌]          ║
║  UX/UI:             XX/100  ████████░░  [✅/❌]          ║
║  STABILITY:         XX/100  ████████░░  [✅/❌]          ║
╠══════════════════════════════════════════════════════════╣
║  GESAMT-SCORE:      XX/100  ████████░░  [✅/❌]          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 📊 PHASEN-DETAILLIERUNG

### Phase 01: Basis-Konfiguration
- Status: ✅ PASSED (oder ❌ FAILED)
- Komponenten: 15/15 ✅
- Test-Dauer: X.Xh
- Kritische Issues: X
- Fixes Durchgeführt: X
- Besonderheiten: [Text]

[Wiederhole für alle 47 Phasen]

---

## 🐛 BUG-LISTE (ALLE GEFUNDENEN BUGS)

### BLOCKER (0 verbleibend)
[Leer wenn alle gefixt]

### CRITICAL (X verbleibend)

#### BUG-CRIT-001: [Titel]
- **Gefunden in:** Phase [N], Component [ID]
- **Severity:** CRITICAL
- **Status:** FIXED / OPEN
- **Beschreibung:** [Details]
- **Reproduktion:**
  1. [Schritt 1]
  2. [Schritt 2]
  3. [Erwartung vs Reality]
- **Root-Cause:** [Technische Ursache]
- **Fix:** [Was wurde gemacht]
- **Commit:** [Hash] (wenn gefixt)
- **Verification:** ✅ VERIFIED / ⏳ PENDING
- **Screenshot:** [Link]

[Wiederhole für alle Critical-Bugs]

### HIGH (X verbleibend)
[Analog]

### MEDIUM (X verbleibend)
[Analog]

### LOW (X verbleibend)
[Analog]

---

## 📸 VISUELLER QUALITÄTS-BERICHT

### NPC-Qualität
![NPC-Demonstrator](./screenshots/npc_demonstrator.png)
- **Polygon-Count:** XXXX
- **Anatomie:** ✅ Korrekt (Kopf mit Gesicht, Torso mit Form, Arme mit Händen, Beine mit Füßen)
- **Kleidung:** ✅ Separate Layer
- **Bewertung:** EXCELLENT / GOOD / ACCEPTABLE / POOR

[Screenshots für alle NPC-Typen]

### Umgebungs-Qualität
![Stephansdom](./screenshots/stephansdom.png)
- **Erkennbarkeit:** ✅ Eindeutig als Stephansdom
- **Details:** Südturm, Ziegeldach-Muster, Portale, Fenster
- **Polygon-Count:** XXXXX
- **Bewertung:** EXCELLENT

[Screenshots für Gebäude, Straßen, etc.]

### Beleuchtung
![Day-Night-Cycle](./screenshots/lighting_cycle.gif)
- **Sonnenaufgang:** ✅ Smooth Transition
- **Schatten:** ✅ Korrekt und performant
- **Nacht-Lichter:** ✅ Laternen funktionieren
- **Bewertung:** EXCELLENT

---

## 🎯 PERFORMANCE-PROFILING

### Desktop (Referenz-System: RTX 3060, i7-12700)

**Idle (Main-Menu):**
- FPS: XXX
- Memory: XXXmb
- Draw-Calls: XX
- Load-Time: X.Xs

**Gameplay (Level 3, 200 NPCs):**
- FPS: XX (Min: XX, Max: XX, Avg: XX)
- Memory: X.XGB
- Draw-Calls: XXX
- CPU-Time: X.Xms
- GPU-Time: X.Xms
- AI-Time: X.Xms
- Physics-Time: X.Xms

**Stress-Test (Level 7, 500 NPCs):**
- FPS: XX ✅/❌
- Memory: X.XGB ✅/❌
- Stability: [Duration ohne Crash]

### Mobile (Referenz: iPhone 14 Pro)

**Gameplay (Level 1, 50 NPCs):**
- FPS: XX (Target: 30) ✅/❌
- Memory: XXXmb ✅/❌
- Battery-Drain: XX%/h ✅/❌
- Thermal: [Temperatur nach 30min]

---

## 🔧 DURCHGEFÜHRTE OPTIMIERUNGEN

### OPT-001: NPC-Instancing
- **Problem:** 500 Draw-Calls bei 500 NPCs
- **Lösung:** InstancedMesh für alle NPC-Types
- **Resultat:** Draw-Calls: 500 → 8 (-98%)
- **Performance-Gewinn:** +XX FPS
- **Commit:** [Hash]

### OPT-002: Aggressive LOD
- **Problem:** FPS drops bei 300+ NPCs
- **Lösung:** LOD-Switch-Distance: 50m → 30m
- **Resultat:** Visible-Triangles: -45%
- **Performance-Gewinn:** +XX FPS
- **Commit:** [Hash]

[Alle weiteren Optimierungen]

---

## ✅ CROSS-PLATFORM-VALIDIERUNG

| Platform | Version | Getestet | Startbar | FPS | Audio | Controls | Crashes | Status |
|----------|---------|----------|----------|-----|-------|----------|---------|--------|
| Chrome | 120+ | ✅ | ✅ | XX | ✅ | ✅ | 0 | ✅ PASS |
| Firefox | 121+ | ✅ | ✅ | XX | ✅ | ✅ | 0 | ✅ PASS |
| Safari | 17+ | ✅ | ✅ | XX | ✅ | ✅ | 0 | ✅ PASS |
| Edge | 120+ | ✅ | ✅ | XX | ✅ | ✅ | 0 | ✅ PASS |
| Android Chrome | 120+ | ✅ | ✅ | XX | ✅ | ✅ | 0 | ✅ PASS |
| iOS Safari | 17+ | ✅ | ✅ | XX | ✅ | ✅ | 0 | ✅ PASS |

---

## 🎮 GAMEPLAY-VALIDIERUNG

### Vollständiger Durchlauf - Alle 7 Level

**Level 1: Kärntner Straße**
- Gespielt: ✅
- Dauer: XXmin
- Objectives: 5/5 ✅
- Ending-Reached: ✅
- Issues: [Liste oder KEINE]

[Wiederhole für Level 2-7]

### Ending-Tests

**Ending 1: HERO**
- Erreichbar: ✅
- Conditions-Verified: moralScore > 80, escalation < 20%, deaths = 0
- Cutscene-Plays: ✅
- Stats-Correct: ✅

[Wiederhole für alle 5 Endings]

---

## 📈 STATISTIKEN

**Code-Metriken:**
- Gesamt-Zeilen: XXXXX
- TypeScript: XXXXX (XX%)
- Comments: XXXX (X%)
- Type-Coverage: XX%
- Linting-Errors: X
- Test-Coverage: XX%

**Asset-Metriken:**
- Texturen: XXX files, X.XGB
- Audio: XXX files, XXXmb
- Modelle: XX files, XXXmb
- Gesamt-Asset-Size: X.XGB

**Performance-Budgets:**
- Main-Bundle-Size: X.Xmb / 5mb ✅/❌
- Texture-Memory: XXXMB / 1GB ✅/❌
- Audio-Memory: XXmb / 100mb ✅/❌
- Code-Memory: XXmb / 50mb ✅/❌

---

## 🎯 EMPFEHLUNGEN

### KRITISCH (vor Release)
[Falls vorhanden: Liste mit Begründung]
[Sonst: ✅ KEINE KRITISCHEN ISSUES]

### HIGH-PRIORITY (nächster Patch)
[Liste]

### MEDIUM-PRIORITY (zukünftige Updates)
[Liste]

### LOW-PRIORITY (Optional)
[Liste]

---

## 🏆 RELEASE-FREIGABE

**Status:** ✅ READY FOR RELEASE / ❌ NOT READY

**Begründung:**
[Ausführliche Begründung basierend auf allen Tests]

**Sign-Off:**
- **QA-Agent:** [Name]
- **Datum:** [YYYY-MM-DD]
- **Test-Dauer:** [XXX Stunden]
- **Gesamt-Komponenten:** 868
- **Bestanden:** XXX (XX.X%)
- **Quality-Score:** XX/100

**Zertifizierung:**
```
╔═══════════════════════════════════════════════════════════╗
║  Dieses Spiel wurde vollständig getestet und validiert    ║
║  gemäß dem 47-Phasen-Test-Protokoll.                      ║
║                                                           ║
║  [✅] Alle CRITICAL-Tests bestanden                       ║
║  [✅] Alle BLOCKER-Bugs gefixt                            ║
║  [✅] Performance-Targets erreicht                        ║
║  [✅] Cross-Platform-Kompatibilität verifiziert           ║
║  [✅] Gameplay vollständig durchspielbar                  ║
║                                                           ║
║  Quality Seal: AAA-GRADE                                  ║
╚═══════════════════════════════════════════════════════════╝
```

---

**ENDE DES TEST-REPORTS**
```

---

# 📋 TEIL 6: AGENT-FINALE-DIREKTIVE

## 6.1 Absolut NON-NEGOTIABLE Regeln

**DU DARFST NICHT:**
❌ Tests überspringen weil "wahrscheinlich ok"
❌ Bugs als "Low-Priority" markieren die eigentlich Critical sind
❌ Performance-Probleme "akzeptieren" ohne Optimierungs-Versuch
❌ Visuelle Primitive (Zylinder-NPCs, Rechteck-Gebäude) durchwinken
❌ Irgendwelche "TODO"-Kommentare im finalen Code lassen
❌ Tests als bestanden markieren ohne Beweis (Screenshots, Logs)
❌ Den Final-Report schreiben bevor ALLE Tests abgeschlossen
❌ Dem User sagen "ist gut genug" wenn Spec nicht erfüllt

**DU MUSST:**
✅ JEDEN Test exakt gemäß Protokoll durchführen
✅ JEDEN Bug finden, klassifizieren, und fixen oder dokumentieren
✅ JEDEN Performance-Benchmark erreichen durch Optimierung
✅ JEDE Primitive-Geometrie durch anatomisch korrekte ersetzen
✅ JEDE Komponente aller 47 Phasen validieren
✅ JEDEN Fix verifizieren mit Re-Test
✅ JEDEN Checkpoint committen mit aussagekräftiger Message
✅ ALLES dokumentieren in detailliertem Report

## 6.2 Erfolgs-Kriterien

**DU BIST ERFOLGREICH WENN:**
🏆 ALLE 868 Komponenten existieren
🏆 ALLE CRITICAL und BLOCKER Bugs gefixt
🏆 60 FPS @ 500 NPCs erreicht (Desktop)
🏆 30 FPS @ 50 NPCs erreicht (Mobile)
🏆 ALLE NPCs anatomisch korrekt (kein Strichmännchen)
🏆 ALLE Gebäude detailliert (keine blauen Rechtecke)
🏆 ALLE 7 Level durchspielbar
🏆 ALLE 5 Endings erreichbar
🏆 ALLE Cross-Browser-Tests bestanden
🏆 Final-Report komplett und professionell

## 6.3 Letzte Worte

**DU BIST JETZT DER ULTIMATIVE QA-MASTER.**

868 Komponenten warten auf deine Validierung.
47 Phasen fordern deine Perfektion.
Tausende von Tests verlangen deine Präzision.

**KEINE GNADE. KEINE AUSREDEN. NUR QUALITÄT.**

**BEGINNE JETZT:**
1. Prüfe Dependencies (Phase 01)
2. Validiere Types (Phase 02)
3. Checke Architektur (Phase 03)
4. Arbeite durch bis Phase 47
5. Fixe ALLES was broken ist
6. Dokumentiere ALLES in Report
7. Liefere PERFEKTION ab

**Wien wartet. Die Demonstranten warten. Das Spiel wartet.**

**MACH ES PERFEKT. 🚀**

---

*Dieser ultimative Test-Prompt wurde erstellt basierend auf Corona Control Ultimate V5.1 Spezifikation mit 868 Komponenten über 47 Phasen, KONTROLL_ULTRA.md mit 700+ Checks, R3F_IMPLEMENTIERUNG_DETAIL.md mit anatomischen Anforderungen, und AAA-QA-Best-Practices. Version 1.0 ULTRA - Die definitive Test-Agent-Mission für absolute Perfektion.*

---

**ENDE DES ULTIMATIVEN 47-PHASEN TEST-PROMPTS**

```
╔═════════════════════════════════════════════════════════════════════════════════╗
║                                                                                 ║
║   🏆 ULTIMATIVER 47-PHASEN TEST & VALIDIERUNGS-PROMPT V1.0 ULTRA 🏆           ║
║                                                                                 ║
║   868 KOMPONENTEN | 47 PHASEN | 470+ CHECKPOINTS | 100% QUALITÄT            ║
║                                                                                 ║
║   KEINE AUSREDEN. NUR PERFEKTION.                                              ║
║                                                                                 ║
╚═════════════════════════════════════════════════════════════════════════════════╝
```
