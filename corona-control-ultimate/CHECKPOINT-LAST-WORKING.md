# Referenzpunkt: Letzter funktionierender Stand (2026-02-20 - Phase 18)

## Überblick

- **AAA-Qualität erreicht**: Optimiertes Stadt-Layout mit Freiraum am Stephansplatz.
- **Stadt-Raster**: Reduziert auf **6x6 Blöcke** (äußere Reihen entfernt) für bessere Übersicht und Performance.
- **Zentraler Platz**: Brunnen mit Neon-Effekten, Bäume und Sitzgelegenheiten am Spawn [30, 1, 30].
- **Hindernisfrei**: Große Monumente (LandmarkVienna), Konzertbühne und Absperrungen wurden entfernt, um die Sichtlinien zu klären.

## Performance & Grafik

- **LOD-System**: Aggressives Culling für NPCs > 35m. AI-Update auf 5Hz/3s gedrosselt.
- **Lighting**: Minimalistisches High-Performance Lighting (stable 30-60 FPS lokal).
- **NPC-Dichte**: Standardmäßig 200 NPCs, skalierbar über Szenario-Buttons.

## Verifizierte Missionen

- **Mission 1 (Beobachtungsposten)**: Erfolgreich getestet, Zielpunkt (Nord) erreichbar.
- **Mission 2 (Krause)**: Identifizierung bei [0, 0, -50] verifiziert.
- **Mission 3 (Rioters)**: Dispersal-Mechanik und Spawning funktionsfähig.

## Steuerung

- **Orbit-Kamera**: 360° Rotation und Pan (Shift+Links) stabil.
- **Spieler-Bewegung**: W/A/S/D flüssig, Spawn-Position sicher [30, 1, 30].

## Backup (Git)

- **Tag**: `last-working-v18-final`
- **Wiederherstellung**: `git checkout last-working-v18-final`
- **Backup (ZIP)**: Ein physisches ZIP-Backup sollte regelmäßig manuell aus dem Projekt-Ordner erstellt werden.

## Zurücksetzen auf diesen Stand

1. `git reset --hard last-working-v18-final`
2. `npm install` (falls Abhängigkeiten geändert wurden)
3. `npm run dev`
