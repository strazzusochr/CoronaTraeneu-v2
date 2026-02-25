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

---

# Aktueller Arbeitsstand (2026-02-24 - Cloud GPU Proof & HF Fix)

## Erfolge & Abgeschlossene Aufgaben

- **HuggingFace Dev Mode Bug behoben**: Permanenter Fix durch PowerShell-Scripte (`hf_restart.ps1`, `hf_deploy.ps1`), die den Space über die API steuern und das unzuverlässige HF UI umgehen.
- **Cloud-GPU Rendering Proof**: Erfolgreicher Beweis, dass das Spiel (Corona Control Ultimate) auf der Google Colab T4 GPU im XFCE-Kioskmodus vollständig lädt und rendert.
- **noVNC Remote Desktop**: Ein funktionierendes Setup erstellt, um das Spiel auf der Cloud GPU direkt per Livestream im Browser zu bedienen (`x11vnc` + `websockify`).

## ⚠️ VERBLEIBENDE FEHLER & OFFENE BAUSTELLEN (Für morgen)

1. **Rendering Issues (Canvas/Styling)**:
    - Es müssen noch verbleibende Rendering-Fehler behoben werden (wie im vorherigen "Fixing Rendering Issues" Task besprochen), insbesondere:
        - Gelegentlicher Black Screen im 3D-Canvas beim initialen Laden / Tab-Wechsel.
        - Deprecated Style Props / Warnings in der Konsole bezüglich der Layout-Komponenten.
2. **Colab / XFCE Kiosk Capture Tuning**:
    - Die automatisierte Screenshot-Methode via `scrot` in Kombination mit GPU-beschleunigtem Chrome führt oft dazu, dass nur der blaue XFCE-Hintergrund erfasst wird, sobald die hohe 3D-Last anliegt.
    - Steuerung über `xdotool` in Colab ist fehleranfällig; Focus Management muss robuster werden.
3. **Graphics Overhaul & AAA Quality**:
    - Es stehen weitere Arbeiten an den visuellen Effekten und der Gesamtgrafik aus, um die Zielqualität zu sichern.

## Nächste Schritte (Next Session)

- Behebung der `style prop` Warnungen im React-Tree.
- Stabilität des 3D-Canvas beim Laden verbessern.
- Fortsetzung der _AAA Quality / Graphics Overhaul_ Verbesserungen.
