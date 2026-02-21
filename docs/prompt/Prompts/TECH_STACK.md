Technologie-Stack Bericht: Corona Control Ultimate
Dieses Dokument bietet eine vollständige Übersicht über die verwendeten Programmiersprachen, Engines, Frameworks und Bibliotheken im Projekt "Corona Control Ultimate".

1. Programmiersprachen
TypeScript (TS/TSX): Die primäre Programmiersprache des gesamten Projekts. Sie bietet statische Typisierung für JavaScript, was besonders bei großen, objektorientierten Spielstrukturen (wie AI-Managern, State-Handling) entscheidend für die Fehlervermeidung ist.
HTML5 & CSS3: Werden für das grundlegende Layout, einfache UI-Elemente und das Container-Styling verwendet.
2. Core Framework & Build-Tools
React (v19): Das grundlegende Frontend-Framework. Wir nutzen es nicht nur für klassische Benutzeroberflächen (HUD, Menüs), sondern – in Kombination mit Fiber – für den gesamten Szenengraph der 3D-Welt.
Vite: Der extrem schnelle Build-Bundler und Development-Server, der Hot-Module-Replacement (HMR) ermöglicht und für eine performante Entwicklungs- und Produktionsumgebung sorgt.
3. 3D Engine & Rendering
Anstelle einer klassischen Standalone-Spieleengine (wie Unity oder Unreal) oder reinen Web-Engines wie Babylon.js setzen wir auf einen komponentenbasierten Ansatz mit Three.js:

Three.js: Die zugrundeliegende Low-Level WebGL-Bibliothek der Spielewelt. Sie kümmert sich um das Rendering von Geometrien, Kameras, Lichtern und Materialien im Browser.
React Three Fiber (R3F): Ein React-Renderer für Three.js. Er ermöglicht es, 3D-Objekte deklarativ als wiederverwendbare React-Komponenten zu schreiben.
React Three Drei: Eine riesige Sammlung nützlicher Erweiterungen und Abstraktionen für R3F (z.B. Kamerakontrollen, Text-Rendering, 3D-UI-Elemente, Ladebildschirme).
4. Physik-Engine
Rapier3D: Eine in Rust geschriebene, hochperformante und deterministische Physik-Engine, die via WebAssembly im Browser läuft.
@react-three/rapier: Der React-Wrapper für Rapier, der Rigidbodys (feste Körper), Kollider, Gravitation und kinematische Charakter-Controller nahtlos in den React-Three-Fiber Szenengraphen integriert.
5. State Management (Zustandsverwaltung)
Zustand: Ein minimaler, extrem schneller State-Manager (verwendet z.B. für den gameStore und dialogStore). Hier werden globale Variablen wie Missionsfortschritt, Karma, Spielerposition und Inventar verwaltet, ohne dass unnötige Re-Renders der gesamten Applikation ausgelöst werden.
6. Post-Processing & Visuelle Effekte
@react-three/postprocessing: Ein Wrapper um die postprocessing-Bibliothek, der für die "AAA"-Visuals sorgt. Darüber werden Effekte wie Bloom (Leuchten), Depth of Field (Schärfentiefe), Vignettierung und Tonemapping effizient berechnet.
7. Backend & Netzwerk (Multiplayer & Server)
Node.js & Express: Stellen das Server-Backend für Produktions-Hosting bereit.
Socket.io: Wird für die Echtzeitkommunikation (WebSocket) zwischen Client und Server verwendet (z.B. für künftige Multiplayer- oder Leaderboard-Features).
8. Development Tools & Utilities
Leva: Bietet ein kleines, grafisches Kontrollpanel für Entwickler im Spiel, um Variablen (wie Lichtstärken) in Echtzeit zu tweaken.
Stats.js: Das kleine overlay-Fenster oben im Spiel, das die Framerate (FPS) und Speicherauslastung überwacht.
ESLint & Vitest: Für Code-Qualitätsprüfung und Unit-Testing.
Zusammenfassung der Architektur
Das Projekt arbeitet als moderne Single Page Application (SPA), die die Leistungsfähigkeit von WebGL via Three.js voll ausreizt. Durch die Kombination mit React und Rapier3D entsteht eine Game-Engine-Bedingung direkt im Webbrowser, ohne dass der Spieler zusätzliche Software herunterladen muss. Es ist auf dem absoluten State-of-the-Art-Stand für moderne Web-3D-Erlebnisse.


Comment
Ctrl+Alt+M
