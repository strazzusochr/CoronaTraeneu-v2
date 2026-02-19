# Referenzpunkt: Letzter funktionierender Stand (2026-02-14)

## Überblick
- Stabile Spielsession mit korrekt funktionierender Steuerung, Kamera und Stadtumgebung.
- Dev-Server startet und ist erreichbar:
  - Lokal: http://localhost:3000/
  - Netzwerk: http://192.168.1.240:3000/

## Start & Entwicklung
- Starten: `npm run dev` (Vite)
- Lint: `npm run lint`
- Tests: `npm run test`
- Build: `npm run build`
- Hinweis: Falls PowerShell die Ausführung blockiert, `npm.cmd run dev` verwenden.

## Kamera & Steuerung
- Kamera:
  - 360° Drehung und Schwenken (Pan) aktiv
  - Zoom-Range erweitert (maxDistance 600)
  - Shift + Linke Maustaste: Schwenken
  - Linke Maustaste: Drehen
  - Rechte Maustaste: Schwenken
- Implementierung: [GameCanvas.tsx](file:///d:/musik/corona-control-project/corona-control-ultimate/src/components/game/GameCanvas.tsx)
  - OrbitControls mit:
    - enablePan, screenSpacePanning, enableRotate, enableZoom
    - enableDamping, dampingFactor
    - minPolarAngle=0.01, maxPolarAngle=π−0.01
    - maxDistance=600, zoomSpeed=1.1
  - Shift-Mapping: Umschalten LEFT zwischen ROTATE↔PAN per Keydown/Keyup

## Spielfigur (W/A/S/D)
- Kamera-orientierte Bewegung mit 120Hz Physik-Loop.
- Datei: [PlayerCharacter.tsx](file:///d:/musik/corona-control-project/corona-control-ultimate/src/components/game/entities/PlayerCharacter.tsx)

## Stadt & Verkehr
- Wien-Layout mit Blockstruktur und 4–6 Gebäudekomplexen pro Block, typische Fassadenfarben.
- Datei: [CityEnvironment.tsx](file:///d:/musik/corona-control-project/corona-control-ultimate/src/components/3d/environment/CityEnvironment.tsx)
- Verkehr blockiert Bühne, keine Autos durch die Bühne.
- Datei: [TrafficSystem.tsx](file:///d:/musik/corona-control-project/corona-control-ultimate/src/components/3d/environment/TrafficSystem.tsx)

## NPC-Verteilung
- 500 NPCs: 350 vor der Bühne, 150 entlang Straßen/Gehwegen; Bühnen-Sicherheitszone berücksichtigt.
- Datei: [gameSlice.ts](file:///d:/musik/corona-control-project/corona-control-ultimate/src/stores/slices/gameSlice.ts)

## Bekannte offene Punkte
- Physische Kollisionskörper für Gebäude und Spieler ergänzen.
- Einfache Gehweg-Wander-KI für Stadt-NPCs.
- Performance im Blick behalten (LOD feinjustieren).

## Backup (ZIP)
- Vollständiges Backup des Projekts liegt im Parent-Ordner:
  - Pfad: `d:\musik\corona-control-project\corona-control-ultimate-backup.zip`
- Wiederherstellung:
  1) ZIP entpacken
  2) Abhängigkeiten installieren (falls nötig): `npm install`
  3) Start: `npm run dev`

## Zurücksetzen auf diesen Stand (Soft)
- Dateiänderungen verwerfen und dieses Dokument als Referenz nutzen.
- Falls nötig, Backup-ZIP verwenden (siehe Abschnitt „Backup“).

