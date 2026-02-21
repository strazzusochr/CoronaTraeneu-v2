---
description: Hyper-Verifizierungs-Protokoll für visuelle Kontrolle (360° Inspektion)
---

Dieses Protokoll dient der vollständigen visuellen Kontrolle der Grafik und Spielwelt im Browser. Es ist bei jedem Browser-Test anzuwenden, sofern nicht anders angewiesen.

### Schritte:

1. **Initialer Blick**: Schau geradeaus in die Laufrichtung (HORIZONT).
2. **360° Drehung (Horizont)**: Drehe die Kamera langsam um 360 Grad im Uhrzeigersinn, während der Blick waagerecht bleibt.
3. **Blick nach Oben**: Neige die Kamera um ca. 60 Grad nach oben (vom Horizont aus).
4. **360° Drehung (Oben)**: Drehe die Kamera langsam um 360 Grad auf diesem Neigungswinkel.
5. **Hyper-Zoom**: Zoome 25.000 px aus der Welt heraus (Vogelperspektive/Orbit).
6. **Blick nach Unten**: Neige die Kamera um 120 Grad nach unten (relativ zur aktuellen Ausrichtung, um den Boden/die Welt unter sich zu sehen).
7. **360° Drehung (Unten)**: Drehe die Kamera langsam um 360 Grad in dieser Zoom-Stufe.

// turbo-all
Führe diese Schritte mit dem `browser_subagent` aus und erstelle für jede Drehung repräsentative Screenshots.
