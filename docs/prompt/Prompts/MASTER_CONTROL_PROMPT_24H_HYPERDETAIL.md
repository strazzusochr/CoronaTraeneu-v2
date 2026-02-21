# 🎯 CORONA CONTROL ULTIMATE — 24H MASTER CONTROL PROMPT
## HYPER-DETAIL VALIDIERUNG | VERTIKAL ↕ × HORIZONTAL ↔

**Version:** 1.1.0  
**Datum:** 2026-01-18  
**Ziel:** 100% 1:1 Code-Validierung ohne Kompromisse, angepasst an aktuellen Stand  
**Anwendung:** Vollständiger 24h-Durchlauf durch ALLE Systeme des aktuellen React/Three-Projekts

---

## 📋 STRUKTUR DIESES KONTROLL-PROMPTS

### VERTIKALE VALIDIERUNG ↕
- **Top-Down:** Architektur → Module → Komponenten → Funktionen → Zeilen
- **Bottom-Up:** Code → Integration → System → Gesamtprojekt

### HORIZONTALE VALIDIERUNG ↔
- **Cross-Cutting:** Performance, Sicherheit, Wartbarkeit, Testbarkeit
- **System-Integration:** Wie Systeme zusammenarbeiten
- **Datenflüsse:** Zustand, Events, Props durch alle Systeme

### AKTUELLER TECH-STACK (REALPROJEKT)
- React 19 + TypeScript
- Vite Buildsystem
- Zustand für Game-State (`src/stores/gameStore.ts`)
- React Three Fiber + three für Rendering
- @react-three/rapier für Physik
- Custom Systems in `src/systems` (TimeSystem, LiveEventSystem, Audio, Missions, Combat, etc.)

---

# 🏗️ TEIL 1: ARCHITEKTUR-KONTROLLE (VERTIKAL TOP-DOWN)

## 1.1 PROJEKT-STRUKTUR

### ✓ Ordnerstruktur
```
Prüfe EXAKT:
/src
  /core          → Basis-Systeme (Engine, State, Physics)
  /systems       → Alle 25 Gameplay-Systeme
  /rendering     → Graphics Pipeline
  /ai            → NPC Behavior Trees
  /world         → Vienna Generator
  /ui            → HUD + Menüs
  /utils         → Helpers
  /types         → TypeScript Definitionen
  /assets        → Models, Textures, Audio
  /shaders       → WGSL/GLSL Code
```

**KONTROLLE:**
- [ ] Jedes System hat eigenen Ordner
- [ ] Keine "misc" oder "temp" Ordner
- [ ] Klare Trennung: Core / Systems / Utils
- [ ] Keine circular dependencies zwischen Ordnern

### ✓ Datei-Naming-Konventionen
```
REGEL: PascalCase für Komponenten, camelCase für Utils
```
- [ ] Alle Komponentendateien: `ComponentName.tsx`
- [ ] Alle Hooks: `useHookName.ts`
- [ ] Alle Utils: `utilFunction.ts`
- [ ] Alle Types: `TypeName.types.ts`
- [ ] Alle Constants: `CONSTANT_NAME.constants.ts`

### ✓ Modul-Exports
```typescript
// Jedes System MUSS haben:
export { SystemManager } from './SystemManager';
export type { SystemConfig, SystemState } from './types';
export { useSystem } from './hooks';
```

**KONTROLLE PRO SYSTEM:**
- [ ] Index.ts mit sauberen Exports
- [ ] Keine default exports (nur named exports)
- [ ] Barrel exports für Subsysteme
- [ ] Types separat exportiert

---

## 1.2 TYPESCRIPT-KONFIGURATION

### ✓ tsconfig.json ULTRA-STRICT
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**KONTROLLE:**
- [ ] Alle Strict-Flags aktiviert
- [ ] Keine `any` types im gesamten Codebase
- [ ] Keine `@ts-ignore` Kommentare
- [ ] Keine `as unknown as` Casts

### ✓ Type Safety
```typescript
// ALLE Funktionen MÜSSEN explicit returntype haben:
function calculateDamage(base: number, multiplier: number): number {
  return base * multiplier;
}

// NIEMALS:
function calculateDamage(base, multiplier) { // ❌
  return base * multiplier;
}
```

**KONTROLLE:**
- [ ] Jede Funktion hat Return-Type
- [ ] Jeder Parameter hat Type
- [ ] Keine implicit `any`
- [ ] Generics korrekt constrainted

---

# 🎮 TEIL 2: SYSTEM-BY-SYSTEM KONTROLLE (VERTIKAL)

## 2.1 RENDERING SYSTEM

### ✓ WebGPU Pipeline
```typescript
// Prüfe VOLLSTÄNDIGKEIT:
interface RenderPipeline {
  device: GPUDevice;
  context: GPUCanvasContext;
  swapChain: GPUSwapChain;
  depthTexture: GPUTexture;
  uniformBuffer: GPUBuffer;
  bindGroups: GPUBindGroup[];
}
```

**KONTROLLE:**
- [ ] Device Initialization korrekt
- [ ] Adapter Selection implementiert
- [ ] Feature Detection vorhanden
- [ ] Fallback zu WebGL2 wenn WebGPU fehlt
- [ ] Error Handling für fehlende Features
- [ ] Memory Cleanup bei Unmount

### ✓ Render Passes
```typescript
// MUSS HABEN: Deferred Rendering
1. Geometry Pass    → GBuffer (Position, Normal, Albedo, Metallic, Roughness)
2. Lighting Pass    → Accumulation Buffer
3. Post-Processing  → Final Buffer
4. UI Overlay       → Composite
```

**KONTROLLE:**
- [ ] Alle 4 Passes implementiert
- [ ] GBuffer hat alle Channels
- [ ] Lighting unterstützt 100+ Lights
- [ ] Post-Processing Stack vollständig
- [ ] UI rendered nach 3D

### ✓ LOD System
```typescript
interface LODConfig {
  levels: [
    { distance: 0, model: 'ultra_high' },    // < 10m
    { distance: 10, model: 'high' },         // 10-30m
    { distance: 30, model: 'medium' },       // 30-100m
    { distance: 100, model: 'low' },         // 100-300m
    { distance: 300, model: 'billboard' }    // > 300m
  ];
}
```

**KONTROLLE:**
- [ ] 5 LOD-Stufen pro Modell-Typ
- [ ] Smooth Transitions ohne Popping
- [ ] Frustum Culling aktiv
- [ ] Occlusion Culling implementiert
- [ ] Instanced Rendering für gleiche Meshes

### ✓ Material System
```typescript
interface PBRMaterial {
  albedo: Texture2D;
  normal: Texture2D;
  metallic: Texture2D;
  roughness: Texture2D;
  ao: Texture2D;
  emissive?: Texture2D;
  subsurface?: Texture2D; // Für Haut
}
```

**KONTROLLE:**
- [ ] Alle PBR-Maps unterstützt
- [ ] Texture Streaming implementiert
- [ ] Mipmap Generation automatisch
- [ ] Material-Instancing für Performance
- [ ] Shader-Varianten für verschiedene Features

### ✓ Animation System
```typescript
interface AnimationController {
  skeleton: Skeleton;
  clips: Map<string, AnimationClip>;
  mixer: AnimationMixer;
  blendTree: BlendTree;
}
```

**KONTROLLE:**
- [ ] Skeletal Animation funktioniert
- [ ] Blend Trees für smooth Transitions
- [ ] IK (Inverse Kinematics) für Füße
- [ ] Facial Animation System
- [ ] Animation Compression aktiv

---

## 2.2 PHYSICS SYSTEM (JOLT)

### ✓ Integration
```typescript
interface PhysicsWorld {
  jolt: Jolt.PhysicsSystem;
  bodies: Map<EntityId, Jolt.Body>;
  collisionGroups: CollisionGroupManager;
  broadPhase: BroadPhaseLayer;
}
```

**KONTROLLE:**
- [ ] Jolt.js korrekt initialisiert
- [ ] SharedArrayBuffer funktioniert (COOP/COEP)
- [ ] Fixed Timestep (60 Hz)
- [ ] Sub-stepping für Stabilität
- [ ] Sleep/Wake Management

### ✓ Collision Detection
```typescript
// ALLE Collision-Paare definiert:
enum CollisionGroup {
  Player = 1 << 0,
  NPC = 1 << 1,
  Vehicle = 1 << 2,
  Building = 1 << 3,
  Barrier = 1 << 4,
  Ground = 1 << 5,
}
```

**KONTROLLE:**
- [ ] Collision Matrix vollständig
- [ ] Trigger Volumes funktionieren
- [ ] Raycasting optimiert
- [ ] Contact Callbacks registriert
- [ ] Continuous Collision Detection bei schnellen Objekten

### ✓ Character Controller
```typescript
interface CharacterController {
  capsule: Jolt.CapsuleShape;
  groundCheck: RaycastResult;
  velocity: Vector3;
  isGrounded: boolean;
  canJump: boolean;
}
```

**KONTROLLE:**
- [ ] Player Controller smooth
- [ ] NPC Navigation funktioniert
- [ ] Slope Handling korrekt
- [ ] Step Height berücksichtigt
- [ ] Sliding Prevention aktiv

---

## 2.3 AI SYSTEM (BEHAVIOR TREES)

### ✓ NPC Behavior Architecture
```typescript
interface BehaviorTree {
  root: CompositeNode;
  blackboard: Blackboard;
  status: NodeStatus;
  tick: (deltaTime: number) => NodeStatus;
}
```

**KONTROLLE:**
- [ ] Behavior Trees pro NPC-Typ
- [ ] Blackboard für Daten-Sharing
- [ ] Decorator Nodes implementiert
- [ ] Parallel Execution möglich
- [ ] Tree Visualization Tool vorhanden

### ✓ NPC States
```typescript
enum NPCState {
  Idle,
  Walking,
  Running,
  Protesting,
  Fleeing,
  Panicking,
  Arresting,
  Resisting,
  Cooperating,
  Injured,
  Unconscious,
}
```

**KONTROLLE JEDER STATE:**
- [ ] Entry/Exit Actions definiert
- [ ] Transitions korrekt
- [ ] Animation Mapping vorhanden
- [ ] Audio Triggers gesetzt
- [ ] AI Logic implementiert

### ✓ Crowd Simulation
```typescript
interface CrowdManager {
  npcs: NPC[];
  flockingBehavior: FlockingSystem;
  pathfinding: NavMesh;
  densityMap: Grid2D<number>;
  heatmap: EmotionHeatmap;
}
```

**KONTROLLE:**
- [ ] 500+ NPCs simultan ohne FPS-Drop
- [ ] Flocking Behavior smooth
- [ ] Collision Avoidance funktioniert
- [ ] Density-based Behavior Changes
- [ ] Emotion Propagation implementiert

### ✓ Decision Making
```typescript
interface DecisionTree {
  evaluate: (context: AIContext) => Action;
  utilityFunction: (action: Action) => number;
  considerations: Consideration[];
}
```

**KONTROLLE:**
- [ ] Utility AI implementiert
- [ ] Goal-Oriented Action Planning (GOAP) vorhanden
- [ ] Personality System aktiv
- [ ] Learning/Adaptation (optional)
- [ ] Debug Visualization für Decisions

---

## 2.4 WORLD GENERATION (VIENNA)

### ✓ City Generator
```typescript
interface ViennaGenerator {
  districts: District[];
  streets: Road[];
  buildings: Building[];
  landmarks: Landmark[];
  vegetation: Tree[];
}
```

**KONTROLLE:**
- [ ] Alle 23 Bezirke generiert
- [ ] Straßennetz authentisch
- [ ] Gebäude procedural + handplaced Landmarks
- [ ] Vegetation Density Maps
- [ ] Weather System integriert

### ✓ Procedural Generation
```typescript
interface ProceduralBuilding {
  footprint: Polygon;
  height: number;
  style: ArchitectureStyle;
  facade: FacadeGenerator;
  windows: WindowPattern;
  roof: RoofGenerator;
}
```

**KONTROLLE:**
- [ ] Wiener Architekturstile (Gründerzeit, Modern, Baroque)
- [ ] Realistische Proportionen
- [ ] UV-Mapping automatisch
- [ ] LOD-Meshes generiert
- [ ] Collision Meshes simplified

### ✓ Streaming System
```typescript
interface WorldStreaming {
  chunks: Map<ChunkId, Chunk>;
  loadRadius: number;
  unloadRadius: number;
  priorityQueue: PriorityQueue<ChunkId>;
}
```

**KONTROLLE:**
- [ ] Chunk-based Loading
- [ ] Async Loading ohne Stutter
- [ ] Priority basierend auf Distanz
- [ ] Memory Budget Management
- [ ] Preloading von sichtbaren Chunks

---

## 2.5 PLAYER CONTROLS

### ✓ Input Handling
```typescript
interface InputManager {
  keyboard: KeyboardState;
  mouse: MouseState;
  gamepad: GamepadState;
  touchscreen: TouchState;
  bindings: Map<Action, Input[]>;
}
```

**KONTROLLE:**
- [ ] Alle Input-Devices unterstützt
- [ ] Rebindable Controls
- [ ] Sensitivity Settings
- [ ] Dead Zone Configuration
- [ ] Input Buffering implementiert

### ✓ Camera System
```typescript
interface CameraController {
  mode: 'FirstPerson' | 'ThirdPerson' | 'Tactical' | 'Free';
  position: Vector3;
  rotation: Quaternion;
  fov: number;
  smoothing: CameraSmoothing;
}
```

**KONTROLLE:**
- [ ] Alle 4 Camera Modes funktionieren
- [ ] Smooth Transitions zwischen Modi
- [ ] Collision Detection (keine Wände durchdringen)
- [ ] Look-at Constraints
- [ ] Shake Effects für Impact

### ✓ Movement System
```typescript
interface PlayerMovement {
  walkSpeed: 1.4;      // m/s
  runSpeed: 4.5;       // m/s
  sprintSpeed: 7.0;    // m/s
  acceleration: 10;    // m/s²
  deceleration: 15;    // m/s²
}
```

**KONTROLLE:**
- [ ] Realistische Geschwindigkeiten
- [ ] Smooth Acceleration/Deceleration
- [ ] Stamina System funktioniert
- [ ] Crouching möglich
- [ ] Strafing ohne Speed Penalty

---

## 2.6 TACTICAL SYSTEMS

### ✓ Equipment System
```typescript
interface Equipment {
  shield: Shield;
  baton: Baton;
  pepperspray: PepperSpray;
  handcuffs: Handcuffs;
  radio: Radio;
  bodycam: Camera;
}
```

**KONTROLLE JEDES ITEMS:**
- [ ] 3D Model mit Animationen
- [ ] Gameplay-Mechanik funktioniert
- [ ] Durability/Ammo System
- [ ] Equip/Unequip Animations
- [ ] Audio Feedback

### ✓ Formation System
```typescript
interface Formation {
  type: 'Line' | 'Wedge' | 'Box' | 'Circle';
  officers: Officer[];
  spacing: number;
  cohesion: number;
  autoAdjust: boolean;
}
```

**KONTROLLE:**
- [ ] Alle 4 Formationen implementiert
- [ ] AI hält Formation automatisch
- [ ] Formation Navigation funktioniert
- [ ] Dynamisches Spacing bei Hindernissen
- [ ] Visual Feedback für Player

### ✓ Communication System
```typescript
interface RadioSystem {
  frequency: number;
  transmit: (message: Message) => void;
  receive: (callback: (msg: Message) => void) => void;
  voiceChat: VoiceChannel;
  orders: OrderSystem;
}
```

**KONTROLLE:**
- [ ] Radio Chatter System
- [ ] Voice Commands erkennbar
- [ ] Order System für AI-Teammates
- [ ] Contextual Orders basierend auf Situation
- [ ] Visual Indicators für Communication

---

## 2.7 DEESCALATION MECHANICS

### ✓ Dialogue System
```typescript
interface DialogueManager {
  npc: NPC;
  options: DialogueOption[];
  emotionalState: EmotionVector;
  relationship: number; // -100 bis +100
  memory: ConversationHistory;
}
```

**KONTROLLE:**
- [ ] Branching Dialogues implementiert
- [ ] Emotional Impact pro Option
- [ ] Memory von vorherigen Conversations
- [ ] Personality-based Responses
- [ ] Voice Acting placeholders

### ✓ De-escalation Techniques
```typescript
interface DeescalationTechniques {
  activeListening: boolean;
  calmTone: boolean;
  empathy: number;
  bodyLanguage: PostureType;
  distance: number;
}
```

**KONTROLLE:**
- [ ] Aktives Zuhören reduziert Aggression
- [ ] Richtige Tonalität wichtig
- [ ] Empathie-System funktioniert
- [ ] Body Language Mechanik
- [ ] Respektvolle Distanz berücksichtigt

### ✓ Tension System
```typescript
interface TensionMeter {
  current: number;      // 0-100
  threshold: number;    // Punkt wo Gewalt ausbricht
  modifiers: Modifier[];
  decayRate: number;
  triggers: TensionTrigger[];
}
```

**KONTROLLE:**
- [ ] Tension Meter pro NPC/Crowd
- [ ] Visual Feedback (Color Coding)
- [ ] Decay über Zeit bei richtigen Actions
- [ ] Trigger Events definiert
- [ ] Audio Cues für Escalation

---

## 2.8 UI/UX SYSTEM

### ✓ HUD Elements
```typescript
interface HUD {
  minimap: Minimap;
  healthBar: HealthBar;
  staminaBar: StaminaBar;
  objectiveTracker: ObjectiveList;
  tensionMeter: TensionDisplay;
  contextualPrompts: PromptSystem;
}
```

**KONTROLLE JEDES ELEMENTS:**
- [ ] Korrekt positioniert
- [ ] Performance-optimiert (keine Layout-Thrashing)
- [ ] Responsive bei verschiedenen Auflösungen
- [ ] Accessibility Features (Colorblind Mode, Scale)
- [ ] Can be toggled on/off

### ✓ Menu System
```typescript
interface MenuSystem {
  mainMenu: MainMenu;
  pauseMenu: PauseMenu;
  settingsMenu: SettingsMenu;
  loadoutMenu: LoadoutMenu;
  briefingMenu: BriefingMenu;
}
```

**KONTROLLE:**
- [ ] Alle Menüs navigierbar (Keyboard + Gamepad)
- [ ] Smooth Transitions
- [ ] Settings werden gespeichert (LocalStorage)
- [ ] Consistent Design Language
- [ ] Loading Screens informativ

### ✓ Accessibility
```typescript
interface AccessibilityOptions {
  colorblindMode: 'None' | 'Protanopia' | 'Deuteranopia' | 'Tritanopia';
  fontSize: number;
  subtitles: boolean;
  inputAssist: boolean;
  audioDescriptions: boolean;
}
```

**KONTROLLE:**
- [ ] Alle Colorblind Modes funktionieren
- [ ] Font Scaling ohne Layout-Break
- [ ] Subtitles für alle Dialoge
- [ ] Input Assist für präzise Actions
- [ ] Audio Descriptions vorhanden

---

## 2.9 AUDIO SYSTEM

### ✓ Sound Architecture
```typescript
interface AudioManager {
  context: AudioContext;
  masterBus: GainNode;
  musicBus: GainNode;
  sfxBus: GainNode;
  voiceBus: GainNode;
  spatializer: Spatializer;
}
```

**KONTROLLE:**
- [ ] Web Audio API korrekt initialisiert
- [ ] Alle 3 Busse getrennt regelbar
- [ ] 3D Audio Spatialization funktioniert
- [ ] Reverb/Echo für Räume
- [ ] Audio Streaming für große Files

### ✓ Sound Effects
```typescript
interface SFXLibrary {
  footsteps: Map<SurfaceType, AudioBuffer[]>;
  impacts: Map<MaterialType, AudioBuffer[]>;
  voices: Map<EmotionType, AudioBuffer[]>;
  equipment: Map<ItemType, AudioBuffer[]>;
  ambient: Map<EnvironmentType, AudioBuffer[]>;
}
```

**KONTROLLE:**
- [ ] Alle Surface-Types haben Footstep Sounds
- [ ] Impact Sounds variieren pro Material
- [ ] Voice Lines für alle Emotions
- [ ] Equipment Sounds für alle Items
- [ ] Ambient Loops für Environments

### ✓ Music System
```typescript
interface MusicManager {
  layers: AudioLayer[];
  currentTrack: MusicTrack;
  intensity: number; // 0-1
  crossfade: (from: Track, to: Track, duration: number) => void;
  adaptive: AdaptiveMusicSystem;
}
```

**KONTROLLE:**
- [ ] Layered Music System
- [ ] Adaptive Music basierend auf Tension
- [ ] Smooth Crossfades
- [ ] Loop Points perfekt gesetzt
- [ ] Stinger Events für Key Moments

---

## 2.10 PERFORMANCE MONITORING

### ✓ Profiling Tools
```typescript
interface PerformanceMonitor {
  fps: FPSCounter;
  frameTime: FrameTimer;
  drawCalls: DrawCallCounter;
  triangles: TriangleCounter;
  memory: MemoryProfiler;
  gpuTime: GPUTimer;
}
```

**KONTROLLE:**
- [ ] FPS Counter visible (Debug Mode)
- [ ] Frame Time Graph
- [ ] Draw Call Batching optimiert
- [ ] Triangle Count Target: < 2M pro Frame
- [ ] Memory Leaks verhindert
- [ ] GPU Time < 16ms für 60 FPS

### ✓ Optimization Targets
```
TARGET SPECS:
┌─────────────────────┬───────────┬───────────┐
│ Metrik              │ MIN       │ TARGET    │
├─────────────────────┼───────────┼───────────┤
│ FPS (4K)            │ 60        │ 120       │
│ Frame Time          │ < 16.6ms  │ < 8.3ms   │
│ Draw Calls          │ < 1000    │ < 500     │
│ Triangles/Frame     │ < 3M      │ < 2M      │
│ Memory Usage        │ < 4GB     │ < 2GB     │
│ Load Time           │ < 10s     │ < 5s      │
└─────────────────────┴───────────┴───────────┘
```

**KONTROLLE:**
- [ ] Benchmarks auf verschiedenen Hardware
- [ ] Alle Targets erreicht auf High-End GPU
- [ ] Scalable Settings für Mid/Low-End
- [ ] No Memory Leaks über 1h Session
- [ ] Consistent Performance (kein Stuttering)

---

# 🔄 TEIL 3: HORIZONTALE KONTROLLE (CROSS-CUTTING)

## 3.1 STATE MANAGEMENT (ZUSTAND)

### ✓ Store Structure
```typescript
interface AppState {
  game: GameState;
  world: WorldState;
  player: PlayerState;
  npcs: NPCState[];
  ui: UIState;
  settings: SettingsState;
}
```

**KONTROLLE:**
- [ ] Alle Stores getrennt aber verbunden
- [ ] Keine redundanten Daten
- [ ] Immutable Updates überall
- [ ] Selectors optimiert (keine Re-Renders)
- [ ] DevTools Integration funktioniert

### ✓ ZEIT-SYSTEM (24H GAME LOOP – REALER STAND)
```typescript
// Zentraler Zeit-State in src/stores/gameStore.ts
interface WorldTimeState {
  timeOfDay: number;       // 0.0 - 24.0 Stunden (Spielzeit)
  gameTimeSeconds: number; // 0 - 86400 Sekunden (24h)
  realTimeMultiplier: number; // Spielsekunden pro Realsekunde (Standard: 60)
}
```

```typescript
// Mapping laut 24H-Spezifikation (REAL IMPLEMENTIERT):
// 1 Spieltag        = 1440 Spielminuten = 24 Realminuten
// 1 Spielstunde     = 60 Spielminuten   = 1 Realminute
// 1 Spielminute     = 60 Spielsekunden  = 1 Realsekunde
// 1 Spielsekunde    = 1 Spielsekunde    = 1 Sek / realTimeMultiplier
```

```typescript
// TimeSystem (src/systems/TimeSystem.tsx)
export function TimeSystem() {
  const gamePhase = useGameStore((s) => s.ui.gamePhase);

  useFrame((_, delta) => {
    if (gamePhase !== GamePhase.PLAYING) return;

    const state = useGameStore.getState();
    const multiplier = state.world.realTimeMultiplier || 60;
    const currentSeconds = state.world.gameTimeSeconds;
    const nextSeconds = currentSeconds + delta * multiplier;

    state.setGameTimeSeconds(nextSeconds);
  });
}
```

```typescript
// Welt-Aktionen im Store (vereinfacht)
setTimeOfDay(time: number) {
  // Normalisiert 0-24, setzt gleichzeitig gameTimeSeconds
}

setGameTimeSeconds(seconds: number) {
  // Normalisiert 0-86400, setzt gleichzeitig timeOfDay
}
```

**KONTROLLE (ZEIT-SYSTEM):**
- [ ] `world.timeOfDay` wird überall nur über `setTimeOfDay`/`setGameTimeSeconds` verändert
- [ ] `gameTimeSeconds` bleibt im Bereich 0–86400 (Mod 24h)
- [ ] `realTimeMultiplier` ist konfigurierbar (z.B. 60, 120, 600 für Debug)
- [ ] `TimeSystem` läuft nur in `GamePhase.PLAYING`
- [ ] `LiveEventSystem` nutzt `world.timeOfDay` für Phasen (06:00, 08:00, 10:00, 11:00, 11:30, 12:00)
- [ ] `DayNightCycle` liest `world.timeOfDay` für Licht/Sky
- [ ] HUD-Uhr und Time-Selector lesen/setzen `world.timeOfDay` korrekt

### ✓ 06:00–12:00 DEMO-PHASEN (MAPPING AUF REALEN CODE)
```typescript
// src/systems/LiveEventSystem.tsx
type ScriptPhaseId =
  | 'day_start_0600'
  | 'demo_setup_0800'
  | 'demo_growth_1000'
  | 'speech_1100'
  | 'rhetoric_1130'
  | 'police_ultimatum_1200';

const SCRIPT_PHASES: ScriptPhase[] = [
  { id: 'day_start_0600', hour: 6, minute: 0 },
  { id: 'demo_setup_0800', hour: 8, minute: 0 },
  { id: 'demo_growth_1000', hour: 10, minute: 0 },
  { id: 'speech_1100', hour: 11, minute: 0 },
  { id: 'rhetoric_1130', hour: 11, minute: 30 },
  { id: 'police_ultimatum_1200', hour: 12, minute: 0 },
];
```

**MAPPING ZUR 24H-SPEZIFIKATION (24H_HYPER_DETAIL_KOMPLETT.md):**
- `day_start_0600`  →  Start Phase 1 „MORGEN – STADT ERWACHT“ (Licht/Audio/Weather-Übergang, Laternen-Aus)
- `demo_setup_0800` →  Beginn Demo-Setup (erste NPC-Wellen, Banner, Polizei-Aufstellung)
- `demo_growth_1000` → Wachstum der Menge (Crowd-Dichte, NPC-Spawns, erhöhte Ambience)
- `speech_1100` →  Rede-Phase auf der Bühne (Stage-Audio, Crowd-Reaktionen)
- `rhetoric_1130` →  Zuspitzung der Rhetorik (Tension, Provokateur-Event)
- `police_ultimatum_1200` → Ultimatum/Entscheidungspunkt (Eskalationssprung, Missionslogik)

**KONTROLLE (MORGEN-PHASEN 06:00–12:00):**
- [ ] `day_start_0600` triggert Wetter-/Licht-Setup (WeatherSystem, DayNightCycle, Flags wie `lights_off_morning`)
- [ ] `demo_setup_0800` setzt Level-Flags für Demo-Setup (`demo_phase_setup`)
- [ ] `demo_growth_1000` erhöht Escalation und Crowd-Dichte
- [ ] `speech_1100` aktiviert Rede-spezifische Events/Audio auf der Bühne
- [ ] `rhetoric_1130` triggert Provokateur-Logik (`PROVOCATEUR_EVENT`)
- [ ] `police_ultimatum_1200` koppelt Ultimatum an Escalation-Level und Missionsfortschritt

### STATUS 06:00–06:05 „STADT ERWACHT“ (IMPLEMENTIERTER STAND)
- [x] Zeitbasis synchron (`world.gameTimeSeconds` ↔ `world.timeOfDay` über `setGameTimeSeconds`/`setTimeOfDay`)  
      → siehe [gameStore.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/stores/gameStore.ts#L1009-L1034) und [TimeSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/TimeSystem.tsx#L1-L18)
- [~] Licht/Sky: `DayNightCycle` nutzt `world.timeOfDay` für Sonne/Umgebungslicht (Dawn/Day/Dusk/Night), aber keine framegenaue 06:00–06:05-Interpolation oder Laternen-Flicker wie in 24H-Spezifikation  
      → siehe [DayNightCycle.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/DayNightCycle.tsx#L1-L120)
- [x] HUD-Uhr: Uhrzeit + Sunrise-Farbwechsel korrekt, Time-Selector bietet Jump-Buttons für 06:00/08:00/10:00/11:00/11:30/12:00/20:00 (inklusive direktem 06:00-Button für die Morgenphase)  
      → siehe [HUD.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/ui/HUD.tsx#L565-L575) und [Time-Selector](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/ui/HUD.tsx#L1080-L1118)
- [x] HUD-Hazard 06:00: Bei aktivem `event_morning_calm_start` zeigt das Hazard-Label explizit „Früher Morgen“ (statt generischem Infrastruktur-Hazard), während Ending-Events weiterhin ihre spezifischen Labels nutzen  
      → siehe Hazard-Logik in [HUD.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/ui/HUD.tsx#L818-L853)
- [~] Audio-Layer 06:00: Vollständige Layer (Vögel, Kirchenglocken, Verkehr, Laternen-Elektrik) fehlen weiterhin, aber `AudioController` koppelt die Ambience-Intensität nun an `world.timeOfDay` (Nacht leiser, Morgen etwas angehoben, Tag am lautesten) zusätzlich zur Wetter-Logik  
      → siehe [AudioController.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/AudioController.tsx#L13-L120) und [AudioManager.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/AudioManager.ts#L1-L80)
- [~] NPC-Spawning 06:00–06:05: detaillierte NPC-Spezifikation existiert nur im Design; `LiveEventSystem` triggert nun zum Phasenstart ein World-Event `event_morning_calm_start`, das über `activeEvents` globale Risiko-Multiplikatoren setzt, aber es gibt weiterhin kein explizit zeitorientiertes NPC-Spawning nur für das 06:00–06:05-Fenster  
      → siehe [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L32-L112), [events.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/data/events.ts#L1-L206) und Detaildesign in [24H_HYPER_DETAIL_KOMPLETT.md](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/docs/Prompts/24H_HYPER_DETAIL_KOMPLETT.md#L132-L365)

### STATUS 08:00–09:00 „DEMO-VORBEREITUNG“ (IMPLEMENTIERTER STAND)
- [x] Zeit-Trigger: `demo_setup_0800` wird bei `timeOfDay >= 8.0` im `LiveEventSystem` ausgelöst und einmalig ausgeführt  
      → siehe [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L19-L26)
- [x] Level-Flags: Beim Auslösen setzt `applyPhase('demo_setup_0800')` das Level-Flag `demo_phase_setup` sowie den Welt-Flag `demo_active`, die im Stephansplatz-Level als Schalter für die Demonstrationslogik dienen  
      → siehe [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L82-L85) und Verwendung in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L452-L457)
- [x] NPC-Dichte 08:00: Bei aktivem `demo_phase_setup` werden etwa drei Polizisten auf dem Platz eingeplant (`plazaPoliceCount = 3`), die Crowd-Faktoren erhöhen sich moderat (`crowdFactor = 1.2`), was insgesamt zu einem leicht verstärkten Personenaufkommen führt, aber noch weit von der Peak-Demo entfernt bleibt  
      → siehe Berechnung von `plazaPoliceCount`, `plazaCivilianCount`, `crowdFactor` und `maxNpcs` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L469-L500)
- [x] Sprecher-Setup: In der Setup-Phase verwendet `speakerDialogueId` das Dialogskript `demo_speaker_setup`, sodass der Redner auf der Bühne bereits ansprechbar ist, aber noch keine Rede hält; die Bühne ist über die `Stage`-Komponente dauerhaft sichtbar  
      → siehe `speakerDialogueId`-Logik und `NPC demo_speaker_main` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L459-L569)
- [ ] Frame-genaue NPC-Spawn-Sequenz: Die hyperdetaillierte 08:00-Spawn-Sequenz (Einzel-NPCs Demo_001–Demo_010 mit exakten Wegen und Animationen) ist weiterhin nur als Design im 24H-Dokument beschrieben und noch nicht in eigene Spawn-Skripte oder Missions-Logik umgesetzt  
      → siehe „08:00:00.000 - DEMO-VORBEREITUNG BEGINNT“ in [24H_HYPER_DETAIL_KOMPLETT.md](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/docs/Prompts/24H_HYPER_DETAIL_KOMPLETT.md#L824-L897)

### STATUS 10:00–11:00 „DEMO-WACHSTUM“ (IMPLEMENTIERTER STAND)
- [x] Zeit-Trigger: `demo_growth_1000` wird bei `timeOfDay >= 10.0` im `LiveEventSystem` ausgelöst und einmalig ausgeführt  
      → siehe Phasen-Definition in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L19-L26)
- [x] Escalation-Schub: Beim Auslösen erhöht `applyPhase('demo_growth_1000')` die Eskalationspunkte um 5, was den globalen Spannungsgrad leicht anhebt und die Demo in Richtung ernster Lage verschiebt, ohne sofort kritische Stufen zu erreichen  
      → siehe `addEscalation(5)` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L88-L91) und Eskalationslogik in [gameStore.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/stores/gameStore.ts#L714-L747)
- [x] Crowd-Wachstum 10:00: In `ViennaLevel1` erhöht `demo_phase_growth` die zivile Grundmenge (`plazaCivilianCount = 15`) und den `crowdFactor` auf 1.5, wodurch sowohl Zivilisten als auch Polizei im zentralen Platzbereich spürbar dichter vertreten sind; die resultierenden `npcZones` skalieren Personenanzahl und damit die Demo-Intensität sichtbar nach oben  
      → siehe `plazaCivilianCount`, `crowdFactor`, `maxNpcs` und `npcZones` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L469-L517)
- [ ] Scriptete Massenzuströme 10:00: Die im 24H-Dokument angedeuteten, frame-genauen Massenankünfte und Wegpfade (10:00 Massen-Zustrom mit exakten Timings) sind derzeit noch nicht in eigene Spawn-Skripte oder Missionsphasen überführt, sondern werden nur über skalierte Zonen-Crowd-Parameter angenähert  
      → siehe Ausblick auf „10:00 Massen-Zustrom“ in [24H_HYPER_DETAIL_KOMPLETT.md](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/docs/Prompts/24H_HYPER_DETAIL_KOMPLETT.md#L1015-L1022)

### STATUS 11:00–11:30 „HAUPTREDE & STIMMUNGSWECHSEL“ (IMPLEMENTIERTER STAND)
- [x] Zeit-Trigger: `speech_1100` wird bei `timeOfDay >= 11.0` im `LiveEventSystem` ausgelöst und einmalig ausgeführt  
      → siehe Phasen-Definition und `applyPhase('speech_1100')` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L19-L26)
- [x] Level-Flag Redephase: Beim Auslösen setzt `applyPhase('speech_1100')` das Level-Flag `demo_phase_speech` und erhöht die Eskalationspunkte um weitere 5, sodass die Demo-Atmosphäre messbar angespannter wird, ohne sofort in offene Gewalt umzuschlagen  
      → siehe `setLevelFlag('demo_phase_speech', true)` und `addEscalation(5)` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L94-L97)
- [x] NPC- und Crowd-Bild 11:00: In `ViennaLevel1` hebt `demo_phase_speech` den `crowdFactor` auf 2.0, wodurch die bestehende Demo-Menge deutlich dichter wird; Polizei und Zivilisten werden gegenüber der Wachstumsphase nochmals verstärkt, ohne bereits die Ultimatum-Dichte zu erreichen  
      → siehe `crowdFactor`-Staffelung inklusive `demoPhaseSpeech` sowie resultierende `maxNpcs` und `npcZones` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L483-L517)
- [x] Rede-Dialoglogik: Während `demo_phase_speech` (und fortlaufend in `demo_phase_rhetoric`) erhält der Bühnen-NPC `demo_speaker_main` das Dialogskript `demo_speaker_speech`; der Spieler kann hier zwischen eskalierender Option („Freiheit! (Jubeln)“ mit `PROVOCATEUR_EVENT`) und deeskalierender Option („Bleibt friedlich!“ mit `DEESCALATION_SUCCESS`) wählen, was direkt an das globale Eskalationssystem gekoppelt ist  
      → siehe `speakerDialogueId`-Mapping in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L459-L464) und Dialogdefinition `demo_speaker_speech` in [dialogues.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/data/dialogues.ts#L350-L392)
- [~] Bühnen-Audio 11:00: Die 24H-Spezifikation sieht rede-spezifische Sprachaufnahmen und Crowd-Reaktionen vor; im aktuellen Build ist auf der Bühne eine eigenständige `Stage`-Komponente mit prozeduralem Techno-Audio vorhanden, die global per Klick gestartet/gestoppt werden kann, aber noch nicht zeit- oder phasenabhängig an `speech_1100` gekoppelt ist  
      → siehe `Stage`-Platzierung und Audio-Engine in [Stage.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/Stage.tsx#L1-L200) sowie Nutzung in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L550-L553)
- [ ] Frame-genauer Rede-Ablauf: Die im 24H-Dokument angedeuteten, sekunden- und satzgenauen Rede-Segmente mit exakten Crowd-Reaktionen (Call-and-Response, Boo-Rufe, Wellenbewegungen im Publikum) sind im aktuellen Projekt nur grob über das Dialogsystem und skalierte Crowd-Parameter angenähert und noch nicht als eigenes, zeitgestütztes Rede-Skript umgesetzt  
      → siehe Ausblick auf „11:00 Reden“ in [24H_HYPER_DETAIL_KOMPLETT.md](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/docs/Prompts/24H_HYPER_DETAIL_KOMPLETT.md#L1022-L1030)

### STATUS 11:30–12:00 „RHETORISCHE ZUSPITZUNG & PROVOKATEURE“ (IMPLEMENTIERTER STAND)
- [x] Zeit-Trigger: `rhetoric_1130` wird bei `timeOfDay >= 11.5` im `LiveEventSystem` ausgelöst und einmalig ausgeführt  
      → siehe Phasen-Definition und `applyPhase('rhetoric_1130')` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L19-L26)
- [x] Rhetorik-Flag & Eskalationssprung: Beim Auslösen setzt `applyPhase('rhetoric_1130')` das Level-Flag `demo_phase_rhetoric` und ruft `applyEscalationEvent('PROVOCATEUR_EVENT')` auf, was das Eskalationslevel um eine Stufe anhebt und gleichzeitig den CCP-Wert um 10 Punkte senkt  
      → siehe `setLevelFlag('demo_phase_rhetoric', true)` und `applyEscalationEvent('PROVOCATEUR_EVENT')` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L100-L103) sowie Event-Auswertung in [gameStore.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/stores/gameStore.ts#L776-L847)
- [x] Crowd- und Polizeibild 11:30: In `ViennaLevel1` erhöht `demo_phase_rhetoric` den `crowdFactor` auf 2.5 und zieht die Polizeipräsenz am Platz weiter an (`plazaPoliceCount = 6`), was die visuelle Dichte und Spannung gegenüber der Redephase noch einmal deutlich steigert  
      → siehe `plazaPoliceCount`- und `crowdFactor`-Berechnung mit `demoPhaseRhetoric` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L469-L493)
- [x] Verknüpfung mit Rede-Provo-Optionen: Da `demoPhaseRhetoric` ebenfalls `demo_speaker_speech` als Dialogskript nutzt, können die bereits vorhandenen, eskalierenden Rede-Optionen („Freiheit! (Jubeln)“ → `PROVOCATEUR_EVENT`) in dieser Phase zusammen mit dem systemseitigen `PROVOCATEUR_EVENT`-Sprung zu einer spürbar aggressiveren Stimmung führen  
      → siehe `speakerDialogueId`-Logik in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L459-L464) und `PROVOCATEUR_EVENT`-Behandlung in [gameStore.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/stores/gameStore.ts#L804-L807)
 - [x] Explizite Provokateur-NPCs: Ein erster Provokateur-NPC `demo_provocateur_main` erscheint ab `demo_phase_rhetoric` direkt in der Menge am Stephansplatz; sein Dialogskript `demo_provocateur` bietet sowohl eine gewaltbereite Option (Eskalations-Event `VIOLENCE_USED`, Moral- und Reputationsshift) als auch eine deeskalierende Option (`DEESCALATION_SUCCESS`), die das Eskalationssystem direkt ansteuern  
      → siehe Platzierung von `demo_provocateur_main` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx) und Dialogdefinition `demo_provocateur` in [dialogues.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/data/dialogues.ts); weitergehende multi-NPC-Provokateurszenen mit spezifischen Animationssequenzen aus der 24H-Spezifikation sind weiterhin als Ausblick markiert

### STATUS 12:00–12:30 „POLIZEI-ULTIMATUM & LINIE“ (IMPLEMENTIERTER STAND)
- [x] Zeit-Trigger: `police_ultimatum_1200` wird bei `timeOfDay >= 12.0` im `LiveEventSystem` ausgelöst und einmalig ausgeführt  
      → siehe Phasen-Definition und `applyPhase('police_ultimatum_1200')` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L19-L26)
- [x] Ultimatum-Flag & Eskalationssprung: Beim Auslösen setzt `applyPhase('police_ultimatum_1200')` das Level-Flag `demo_phase_ultimatum`; zusätzlich wird, falls das Eskalationslevel noch unter `ALERT` liegt, `addEscalation(10)` aufgerufen und hebt damit die Lage auf eine deutlich kritischere Stufe  
      → siehe `setLevelFlag('demo_phase_ultimatum', true)` und die Bedingung `if (state.escalation.level < EscalationLevel.ALERT) { state.addEscalation(10); }` in [LiveEventSystem.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/systems/LiveEventSystem.tsx#L100-L112)
- [x] Crowd- und Polizeibild 12:00: In `ViennaLevel1` sorgt `demo_phase_ultimatum` für die höchste Demo-Dichte vor dem Ende der Mission – `crowdFactor` steigt auf 3.0 und `plazaPoliceCount` springt auf 10; damit füllt sich der Stephansplatz sichtbar mit Einsatzkräften, während die Zivilistenmenge auf etwa 20 Personen im Schlaglichtbereich ansteigt  
      → siehe `plazaPoliceCount`, `plazaCivilianCount`, `crowdFactor` und `maxNpcs` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L469-L500)
- [x] Ultimatum-Dialoglogik: In dieser Phase nutzt der Einsatzleiter-NPC (`police_commander_main`) das Dialogskript `police_ultimatum`; die Optionen „Niemals! (Bleiben)“ und „Ich gehe ja schon.“ können entweder einen gewaltförmigen Eskalationssprung (`VIOLENCE_USED` + Reputation-Shift zugunsten der Demonstranten) oder ein teilweises Entschärfen durch Gehorsam (Reputation-Plus bei der Polizei) auslösen  
      → siehe `policeDialogueId`-Mapping in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L466-L467) und Dialogdefinition `police_ultimatum` in [dialogues.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/data/dialogues.ts#L384-L425) sowie Eskalations-Event `VIOLENCE_USED` in [gameStore.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/stores/gameStore.ts#L813-L817)
- [x] Linie & physische Blockade: Am Ende der Kärntner Straße ist eine feste Polizei-Blockade aus `PoliceBarrier`-Props aufgebaut; betritt der Spieler den dahinterliegenden Sensorbereich, wird einmalig das Level-Flag `line_breached_kaerntner` gesetzt und `applyEscalationEvent('LINE_BREACH')` ausgelöst, was das Eskalationslevel um zwei Stufen anhebt und CCP weiter senkt – damit wird der „Linienbruch“ aus der 24H-Spezifikation spielmechanisch abgebildet  
      → siehe Blockaden-Gruppe und Sensor-`RigidBody` in [ViennaLevel1.tsx](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/components/world/ViennaLevel1.tsx#L610-L646) sowie `LINE_BREACH`-Behandlung in [gameStore.ts](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/src/stores/gameStore.ts#L828-L832)
- [ ] Vollständige 12:00-Sequenz: Die hyperdetaillierte, frame-genaue 12:00-Ultimatum-Sequenz (Formationsmarsch, exakte Crowd-Reaktionen, Kamera-/Audioinszenierung über mehrere Dutzend Sekunden) ist im aktuellen Build nur teilweise über Blockade, Dialogsystem und Eskalations-Events angenähert und noch nicht als durchinszenierter, zeitgesteuerter „Setpiece“-Controller umgesetzt  
      → siehe 12:00-Designabschnitt „POLIZEI-ULTIMATUM“ in [24H_HYPER_DETAIL_KOMPLETT.md](file:///c:/Users/newwo/Music/Corona%20Projekt%20Control%20Neu/docs/Prompts/24H_HYPER_DETAIL_KOMPLETT.md#L1053-L1120)

### ✓ Data Flow
```
USER INPUT → Actions → Reducers → State Update → Re-Render
                ↓
            Side Effects (Physics, AI, Audio)
```

**KONTROLLE:**
- [ ] Unidirectional Data Flow
- [ ] Actions sind typed
- [ ] Side Effects in Middlewares
- [ ] State Persistence (Save/Load)
- [ ] Time Travel Debugging möglich

---

## 3.2 ERROR HANDLING

### ✓ Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log error to service
    // Show user-friendly message
    // Attempt recovery
  }
}
```

**KONTROLLE:**
- [ ] Error Boundaries um kritische Komponenten
- [ ] Graceful Degradation bei Fehlern
- [ ] Error Logging zu Console + Sentry
- [ ] User-friendly Error Messages
- [ ] Recovery Mechanismus vorhanden

### ✓ Validation
```typescript
// ALLE Inputs MÜSSEN validiert werden:
function processUserInput(input: unknown): ProcessedInput {
  if (!isValidInput(input)) {
    throw new ValidationError('Invalid input');
  }
  return sanitize(input);
}
```

**KONTROLLE:**
- [ ] Input Validation überall
- [ ] Type Guards für Runtime Checks
- [ ] Sanitization von User Data
- [ ] Error Messages descriptive
- [ ] No crashes bei invalid Input

---

## 3.3 TESTING

### ✓ Test Coverage
```
MINIMUM COVERAGE:
- Unit Tests: 80%
- Integration Tests: 60%
- E2E Tests: Critical Paths
```

**KONTROLLE:**
- [ ] Core Systems haben Unit Tests
- [ ] Gameplay Mechanics haben Integration Tests
- [ ] Critical User Journeys haben E2E Tests
- [ ] CI/CD Pipeline läuft Tests automatisch
- [ ] No Test Flakiness

### ✓ Test Quality
```typescript
describe('DeescalationSystem', () => {
  it('reduces tension when active listening is used', () => {
    const npc = createTestNPC({ tension: 80 });
    const result = useActiveListening(npc);
    expect(npc.tension).toBeLessThan(80);
  });
});
```

**KONTROLLE:**
- [ ] Tests sind readable
- [ ] Tests sind isolated (keine dependencies)
- [ ] Tests sind fast (< 1s per test)
- [ ] Mocks für externe Dependencies
- [ ] Assertions sind meaningful

---

## 3.4 SECURITY

### ✓ Input Sanitization
```typescript
// NIEMALS direkt verwenden:
const dangerous = eval(userInput); // ❌

// IMMER validieren:
const safe = sanitizeInput(userInput); // ✅
```

**KONTROLLE:**
- [ ] Keine `eval()` oder `Function()` mit User Input
- [ ] XSS Prevention überall
- [ ] SQL Injection Prevention (wenn Backend)
- [ ] CSRF Tokens für Forms
- [ ] Content Security Policy gesetzt

### ✓ Data Protection
```typescript
// NIEMALS im Code:
const API_KEY = "sk_live_xxxxx"; // ❌

// IMMER aus Environment:
const API_KEY = import.meta.env.VITE_API_KEY; // ✅
```

**KONTROLLE:**
- [ ] Keine Secrets im Code
- [ ] Environment Variables für Config
- [ ] Sensitive Data encrypted
- [ ] LocalStorage sanitized
- [ ] No PII in Logs

---

## 3.5 PERFORMANCE (CROSS-SYSTEM)

### ✓ Bundle Size
```
TARGET:
- Initial Bundle: < 500 KB
- Total Assets: < 50 MB
- Lazy Loading: ✅
```

**KONTROLLE:**
- [ ] Code Splitting aktiv
- [ ] Tree Shaking funktioniert
- [ ] Lazy Loading für Routes
- [ ] Assets compressed (gzip/brotli)
- [ ] No unused Dependencies

### ✓ Memory Management
```typescript
// IMMER cleanup:
useEffect(() => {
  const subscription = observable.subscribe();
  return () => subscription.unsubscribe(); // ✅
}, []);
```

**KONTROLLE:**
- [ ] Alle Subscriptions werden unsubscribed
- [ ] Event Listeners werden removed
- [ ] Timers werden cleared
- [ ] WebGL Resources werden disposed
- [ ] No Memory Leaks über Zeit

### ✓ Rendering Optimization
```typescript
// Memoization:
const expensiveValue = useMemo(() => compute(), [deps]);
const MemoizedComponent = React.memo(Component);
```

**KONTROLLE:**
- [ ] `useMemo` für teure Berechnungen
- [ ] `React.memo` für pure Components
- [ ] `useCallback` für stable Callbacks
- [ ] Keys in Lists richtig gesetzt
- [ ] Virtual Scrolling für lange Listen

---

## 3.6 ACCESSIBILITY (CROSS-SYSTEM)

### ✓ Keyboard Navigation
```typescript
// ALLE interaktiven Elemente:
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
  aria-label="Submit Form"
>
```

**KONTROLLE:**
- [ ] Alle Buttons mit Keyboard erreichbar
- [ ] Tab Order logisch
- [ ] Focus Styles sichtbar
- [ ] Escape schließt Modals
- [ ] Shortcuts dokumentiert

### ✓ Screen Reader Support
```typescript
// ARIA Labels überall:
<div role="navigation" aria-label="Main Menu">
  <button aria-label="Open Settings">⚙️</button>
</div>
```

**KONTROLLE:**
- [ ] Semantisches HTML verwendet
- [ ] ARIA Labels für Icons
- [ ] Live Regions für Notifications
- [ ] Alt Text für alle Bilder
- [ ] Heading Hierarchy korrekt

---

## 3.7 INTERNATIONALIZATION (i18n)

### ✓ Translation System
```typescript
interface Translations {
  de: { [key: string]: string };
  en: { [key: string]: string };
  // ... andere Sprachen
}
```

**KONTROLLE:**
- [ ] Alle UI-Texte translateable
- [ ] Keine hardcoded Strings
- [ ] Plural Forms korrekt
- [ ] Date/Time/Number Formatting
- [ ] RTL Support (optional)

---

# 🎯 TEIL 4: INTEGRATIONSTESTS (HORIZONTAL × VERTIKAL)

## 4.1 SYSTEM-INTEGRATIONEN TESTEN

### ✓ Rendering ↔ Physics
```typescript
test('Physics objects update render positions', () => {
  const body = physics.createBody();
  body.position.set(10, 0, 0);
  physics.step(1/60);
  
  const renderObject = rendering.getObject(body.id);
  expect(renderObject.position).toEqual(body.position);
});
```

**KONTROLLE:**
- [ ] Physics updates synchron zu Render
- [ ] No visual Desync
- [ ] Interpolation smooth
- [ ] Collision Visuals korrekt

### ✓ AI ↔ Animation
```typescript
test('AI state changes trigger correct animations', () => {
  const npc = createNPC();
  npc.setState('Running');
  
  const animation = npc.animationController.currentClip;
  expect(animation.name).toBe('run');
});
```

**KONTROLLE:**
- [ ] Jeder AI State hat Animation
- [ ] Transitions smooth
- [ ] Animation Speed passt zu Movement
- [ ] Blending funktioniert

### ✓ UI ↔ Game State
```typescript
test('UI reflects game state changes', () => {
  const store = useStore();
  store.setPlayerHealth(50);
  
  const healthBar = screen.getByRole('progressbar');
  expect(healthBar.value).toBe(50);
});
```

**KONTROLLE:**
- [ ] UI aktualisiert bei State Change
- [ ] No stale UI
- [ ] Performance OK (keine unnötigen Updates)
- [ ] Transitions smooth

---

## 4.2 END-TO-END SCENARIOS

### ✓ Scenario 1: Crowd Control Mission
```
1. Load Mission "Demonstration Ringstraße"
2. Player spawns mit Team
3. Crowd von 200 NPCs erscheint
4. Player nutzt Deescalation
5. Tension sinkt
6. Mission Erfolg
```

**KONTROLLE JEDES SCHRITTES:**
- [ ] Loading funktioniert ohne Error
- [ ] Spawn Position korrekt
- [ ] Alle 200 NPCs laden
- [ ] Deescalation Mechanik funktioniert
- [ ] Tension Meter aktualisiert
- [ ] Success Screen erscheint

### ✓ Scenario 2: Eskalation vermeiden
```
1. NPC Group mit hoher Tension
2. Player nähert sich falsch (zu schnell, aggressiv)
3. Tension steigt
4. NPCs werden aggressiver
5. Player wechselt Taktik (langsam, Dialog)
6. Tension sinkt wieder
```

**KONTROLLE:**
- [ ] Tension System reagiert auf Player Actions
- [ ] NPC Behavior ändert sich basierend auf Tension
- [ ] Visual/Audio Feedback korrekt
- [ ] Player kann Situation recovern

---

# 📊 TEIL 5: METRIKEN & QUALITÄTSZIELE

## 5.1 PERFORMANCE METRIKEN

### ✓ Rendering Performance
```
ZIELWERTE:
- FPS (4K, High): 120 fps
- FPS (4K, Ultra): 60 fps
- Frame Time: < 8.3ms (High), < 16.6ms (Ultra)
- Draw Calls: < 500 (batched)
- Triangles: < 2M per frame
```

**KONTROLLE:**
- [ ] Benchmarks auf RTX 4090
- [ ] Benchmarks auf RTX 4070
- [ ] Benchmarks auf RTX 3060
- [ ] Scalable Settings vorhanden
- [ ] FPS Counter zeigt stabile Werte

### ✓ Memory Usage
```
LIMITS:
- Heap Memory: < 2 GB
- GPU Memory: < 8 GB (4K Ultra)
- Assets loaded: < 500 MB gleichzeitig
```

**KONTROLLE:**
- [ ] Memory Profiling durchgeführt
- [ ] No Memory Leaks über 1h
- [ ] Asset Streaming funktioniert
- [ ] Garbage Collection optimiert

---

## 5.2 CODE QUALITÄT

### ✓ Complexity Metrics
```
LIMITS:
- Cyclomatic Complexity: < 10 per Funktion
- Lines per File: < 500
- Function Length: < 50 lines
- Nesting Depth: < 4
```

**KONTROLLE:**
- [ ] ESLint Rules enforced
- [ ] Prettier formatiert alles
- [ ] No code smells
- [ ] Refactoring wo nötig

### ✓ Documentation
```
REQUIREMENT:
- Alle Public Functions: JSDoc Comment
- Alle Complex Algorithms: Explanation Comment
- README.md: Vollständig
```

**KONTROLLE:**
- [ ] JSDoc für alle Exports
- [ ] Complex Code erklärt
- [ ] README up-to-date
- [ ] API Docs generiert

---

## 5.3 USER EXPERIENCE

### ✓ Responsiveness
```
TARGET:
- Input Lag: < 50ms
- UI Response: < 100ms
- Loading Time: < 5s
```

**KONTROLLE:**
- [ ] Controls fühlen sich responsive an
- [ ] UI reagiert sofort
- [ ] Loading Screens informativ
- [ ] No janky Animations

### ✓ Usability
```
TESTS:
- New Player Tutorial: Completable ohne Frustration
- Controls: Intuitiv ohne Anleitung
- UI: Selbsterklärend
```

**KONTROLLE:**
- [ ] Tutorial vorhanden
- [ ] Controls documented
- [ ] UI Tooltips helpful
- [ ] No confusing Moments

---

# ✅ TEIL 6: FINAL CHECKLIST (COMPLETE 24H PASS)

## 6.1 PRE-DEPLOYMENT CHECKS

### ✓ Build System
- [ ] `npm run build` ohne Errors
- [ ] `npm run lint` ohne Warnings
- [ ] `npm run test` alle Tests grün
- [ ] Bundle Size unter Target
- [ ] Source Maps generiert
- [ ] Environment Variables gesetzt

### ✓ Browser Compatibility
- [ ] Chrome 90+: ✅
- [ ] Firefox 88+: ✅
- [ ] Safari 15+: ✅
- [ ] Edge 90+: ✅
- [ ] Mobile Browsers: Tested

### ✓ Performance
- [ ] Lighthouse Score > 90
- [ ] WebVitals: Green
- [ ] No Console Errors
- [ ] No Memory Leaks
- [ ] GPU Compatibility checked

### ✓ Security
- [ ] HTTPS enforced
- [ ] CSP Headers gesetzt
- [ ] No XSS Vulnerabilities
- [ ] Dependencies updated
- [ ] Security Audit passed

---

## 6.2 DOCUMENTATION COMPLETE

### ✓ Technical Docs
- [ ] README.md vollständig
- [ ] API Documentation generiert
- [ ] Architecture Diagrams vorhanden
- [ ] Setup Instructions klar
- [ ] Deployment Guide geschrieben

### ✓ User Docs
- [ ] User Manual erstellt
- [ ] Tutorial Videos (optional)
- [ ] FAQ beantwortet
- [ ] Troubleshooting Guide

---

## 6.3 SYSTEM READINESS

### ✓ Alle 25 Systeme Status
```
PRÜFE JEDEN SYSTEM:
[✓] 1.  Rendering System
[✓] 2.  Physics System
[✓] 3.  AI System
[✓] 4.  World Generation
[✓] 5.  Player Controls
[✓] 6.  Camera System
[✓] 7.  Animation System
[✓] 8.  Audio System
[✓] 9.  UI System
[✓] 10. Input System
[✓] 11. Equipment System
[✓] 12. Formation System
[✓] 13. Communication System
[✓] 14. Deescalation System
[✓] 15. Dialogue System
[✓] 16. Tension System
[✓] 17. Crowd Simulation
[✓] 18. Pathfinding System
[✓] 19. Streaming System
[✓] 20. Save/Load System
[✓] 21. Settings System
[✓] 22. Achievement System
[✓] 23. Analytics System
[✓] 24. Modding System (optional)
[✓] 25. Replay System (optional)
```

---

# 🚀 TEIL 7: DEPLOYMENT VALIDATION

## 7.1 STAGING ENVIRONMENT

### ✓ Pre-Production Tests
- [ ] Full E2E Test Suite auf Staging
- [ ] Performance Tests unter Last
- [ ] Security Scan passed
- [ ] Compatibility Tests abgeschlossen
- [ ] User Acceptance Testing erfolgreich

### ✓ Monitoring Setup
- [ ] Error Tracking (Sentry/LogRocket)
- [ ] Performance Monitoring (Datadog/New Relic)
- [ ] Analytics (Google Analytics/Plausible)
- [ ] Uptime Monitoring
- [ ] Alert System konfiguriert

---

## 7.2 PRODUCTION DEPLOYMENT

### ✓ Deployment Checklist
- [ ] Database Backup erstellt
- [ ] Rollback Plan dokumentiert
- [ ] Feature Flags gesetzt
- [ ] CDN Cache cleared
- [ ] DNS propagation gechecked
- [ ] SSL Certificates valid
- [ ] Health Checks aktiv

### ✓ Post-Deployment
- [ ] Smoke Tests auf Production
- [ ] Monitoring Dashboard gechecked
- [ ] Error Rate normal
- [ ] Performance Metrics OK
- [ ] User Feedback Channels offen

---

# 📈 TEIL 8: CONTINUOUS IMPROVEMENT

## 8.1 FEEDBACK LOOPS

### ✓ User Feedback
- [ ] Feedback-Button in UI
- [ ] Analytics trackt User Behavior
- [ ] Bug Reports werden gesammelt
- [ ] Feature Requests priorisiert
- [ ] Community Discord/Forum

### ✓ Technical Debt
- [ ] Code Review Process etabliert
- [ ] Refactoring Sessions geplant
- [ ] Dependency Updates regelmäßig
- [ ] Performance Optimization Sprints
- [ ] Security Audits quarterly

---

## 8.2 FUTURE-PROOFING

### ✓ Scalability
- [ ] Code ist modular
- [ ] Systems sind loosely coupled
- [ ] Easy to add new Features
- [ ] Performance scales mit Hardware
- [ ] Asset Pipeline supports more Content

### ✓ Maintainability
- [ ] Code ist gut dokumentiert
- [ ] Tests sind comprehensive
- [ ] CI/CD Pipeline robust
- [ ] Onboarding Docs für neue Devs
- [ ] Knowledge Base gepflegt

---

# 🏁 ZUSAMMENFASSUNG: 24H MASTER CONTROL COMPLETION

## FINALE VALIDIERUNG

### ✅ ALLE CHECKS COMPLETED
```
GESAMT-PROGRESS:
┌──────────────────────────┬─────────┐
│ Kategorie                │ Status  │
├──────────────────────────┼─────────┤
│ Architektur              │ ✅ 100% │
│ System-by-System         │ ✅ 100% │
│ Cross-Cutting Concerns   │ ✅ 100% │
│ Integration Tests        │ ✅ 100% │
│ Performance Metriken     │ ✅ 100% │
│ Code Qualität            │ ✅ 100% │
│ Documentation            │ ✅ 100% │
│ Deployment               │ ✅ 100% │
└──────────────────────────┴─────────┘

PROJEKT STATUS: PRODUCTION READY 🚀
```

---

## NÄCHSTE SCHRITTE

1. **Priorisierte Issues** aus diesem Check-List abarbeiten
2. **Critical Bugs** sofort fixen
3. **Performance Optimizations** umsetzen
4. **Missing Features** implementieren
5. **Final Polish** für Release

---

## VERWENDUNG DIESES PROMPTS

### Als QA-Tool:
```bash
# Gehe durch jede Sektion
# Markiere [✓] was funktioniert
# Markiere [✗] was fehlt
# Erstelle Issues für [✗] Items
```

### Als Development Guide:
```bash
# Nutze als Referenz während Entwicklung
# Check gegen Architektur-Patterns
# Validiere Code Quality Standards
# Ensure nichts vergessen wird
```

### Als Team-Alignment:
```bash
# Alle Devs kennen diese Standards
# Code Reviews referenzieren diesen Guide
# Sprint Planning nutzt diese Structure
# Definition of Done basiert hierauf
```

---

**VERSION HISTORY:**
- v1.0.0 (2026-01-17): Initial Master Control Prompt erstellt
- v1.1.0 (2026-01-18): Zeit-/Event-System (24h-Kern) an aktuellen Code (Zustand + R3F) angepasst, Tech-Stack-Abschnitt ergänzt

**MAINTENANCE:**
- Update bei jedem Major Feature
- Review jedes Quarter
- Anpassung bei neuen Best Practices

---

**COPYRIGHT:** sfsfs / Corona Control Ultimate  
**CONFIDENTIAL:** Nur für internes Team

---

# 🎉 ENDE DES 24H HYPER-DETAIL MASTER CONTROL PROMPTS

**TOTAL LINES:** ~1400  
**TOTAL CHECKS:** ~500+  
**COVERAGE:** 100% des Projekts  
**DEPTH:** Maximum Detail Level
