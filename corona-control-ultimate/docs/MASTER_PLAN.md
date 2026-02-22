# 🛡️ CORONA CONTROL ULTIMATE - MASTER PROJEKTPLAN & CHECKPOINT

**Datum:** 22. Februar 2026
**Zweck:** Ankerpunkt und Referenz für die 100%ige Umsetzung der KI-gesteuerten Infrastruktur, CI/CD und Test-Architektur.

## 📌 Systemübersicht & Referenzpunkt

Das Projekt entwickelt sich von einem reinen Frontend-Game zu einer robusten, vollautomatisierten Infrastruktur mit Backend-Simulation.
**Ziel-Architektur:**

- **Frontend:** React, TypeScript, Vite, @react-three/fiber, Zustand.
- **Backend/Simulation:** Epidemiologische Modelle in TS/Node.js, gekoppelt ans Game.
- **DevOps:** Docker, GitHub Actions, automatisierte Jest/Vitest-Tests, striktes Linter-Gate.
- **KI-Integration:** Vektorstore in `/memory`, statische Prompts in `/prompts`, Projektlogik/Gedächtnis in `/docs`.
- **Sicherheit & Monitoring:** Winston-Logging, API-Secret-Management via CI-Secrets, geschützte Remotes.

## 🧠 KI-Agent Autonomie & Entwickler-Persona

**Verpflichtende Direktive:** Der KI-Agent (Antigravity/Profi 3D Web Game Entwickler mit 20 Jahren Erfahrung) ist instruiert, **vollständig autonom** zu handeln. Er wählt den nächsten logischen Entwicklungsschritt selbstständig aus. Durch tiefgründiges "Deep Thinking", eigenständige Problemlösung, autonomes Planen, Programmieren und Integrieren nimmt er dem menschlichen Projektleiter alle operativen Entscheidungen ab. Er wartet nur auf Bestätigungen, wenn die Strikte Deploy Policy (Push to Remote) es verlangt.

---

## 🚀 Detaillierter Umsetzungsplan (Roadmap)

Um die Vorgaben ohne Übersehen von Details umzusetzen, arbeiten wir nach folgendem strukturierten Stufenplan:

### Phase 1: Architektur-Fundament & Struktur (Geplant: 15%)

- [x] **1.1 Basis-Verzeichnisse anlegen:** `/docs`, `/docker`, `/tests`, `/prompts`, `/memory` erstellen. _(Abgeschlossen)_
- [x] **1.2 Dokumentation verankern:** `MASTER_PLAN.md` und `DEPLOY_POLICY.md` als Referenzpunkt (Context) für alle LLM-Agenten abspeichern. _(Abgeschlossen)_
- [x] **1.3 Linter & Formatter Härtung:** ESLint strict-Mode durchsetzen, Prettier-Konsistenz prüfen. _(Abgeschlossen)_

### Phase 2: Codequalität & Teststrategie (Geplant: 35%)

- [x] **2.1 Test-Frameworks (Vitest/Jest) installieren:** Konfiguration für React (Testing Library) und Node (Simulation) einrichten. _(Abgeschlossen)_
- [x] **2.2 Baseline-Tests schreiben:** Erste Smoke-Tests für den `Zustand`-Store und die R3F Rendering-Scene. _(Abgeschlossen)_
- [x] **2.3 Simulations-Tests:** Mathematische Korrektheit der Ausbreitungsmodelle absichern (R0-Checks). _(Abgeschlossen)_

### Phase 3: Docker Containerisierung & DevOps (Geplant: 55%)

- [x] **3.1 Docker-Setup Frontend:** `Dockerfile` (Multi-Stage mit Nginx oder Node-Preview) erstellen. _(Abgeschlossen)_
- [x] **3.2 Docker-Setup Backend/Simulation:** Isolierten Container vorbereiten. _(Abgeschlossen)_
- [x] **3.3 Compose-Orchestrierung:** `docker-compose.yml` für lokale One-Click-Starts konfigurieren. _(Abgeschlossen)_

### Phase 4: CI/CD Pipeline via GitHub Actions (Geplant: 75%)

- [ ] **4.1 Workflow Setup:** `.github/workflows/main.yml` mit Checkout, Setup Node, Install & Build Schritten. _(Aktuell: 62%)_
- [ ] **4.2 Test & Linting Gates:** CI bricht bei TypeScript/Linter- oder Testausfällen strikt ab. _(Aktuell: 68%)_
- [ ] **4.3 Image Build & Push (optional):** Automatisierte Docker-Rollouts auf die Zielinfrastruktur vorbereiten. _(Aktuell: 75%)_

### Phase 5: KI-Agenten, Memory & Prompts (Geplant: 85%)

- [ ] **5.1 LangChain Integration:** Vektorstore (Pinecone/lokal) anbinden für Chat- & Kontext-Historie. _(Aktuell: 80%)_
- [ ] **5.2 Prompt-Templates:** Vordefinierte System-Prompts für Coding, Review und Testing unter `/prompts` hinterlegen. _(Aktuell: 85%)_

### Phase 6: Monitoring, Auth & Security (Geplant: 95%)

- [x] **6.1 Security Scans:** Snyk oder npm audit in CI/CD blockierend einrichten. _(Abgeschlossen)_
- [x] **6.2 Secret Management:** .env Setup härten (keine Secrets im Repo), CI-Secrets definieren. _(Abgeschlossen)_
- [x] **6.3 Logging:** Winston/Log4js in die Backend-Dienste einbinden inkl. Healthcheck-Routen. _(Abgeschlossen)_

### Phase 7: Automatisierte Deploy-Pipeline & Audit (Geplant: 100%)

- [x] **7.1 Strikte Deploy-Policy etablieren:** Der `PUSH_PROJECT_TO_DEPLOY_REMOTES` Workflow ist im Agenten-Core programmiert. _(Abgeschlossen)_
- [x] **7.2 Audit Log:** Deployment History Datei (.md) für Forensik anlegen. _(Abgeschlossen)_
- [ ] **7.3 Finaler Smoke-Test:** Vollautomatischer Testlauf durch alle Gates bis zum sicheren Deploy auf GH und HF. _(Ausstehend - Wartet auf Trigger: 99%)_

---

## 🎯 Zusammenfassung der Prozentzahlen

- **Phase 1 (Struktur & Regeln):** 0% ➔ 15%
- **Phase 2 (Testing & Codequalität):** 15% ➔ 35%
- **Phase 3 (Docker & DevOps):** 35% ➔ 55%
- **Phase 4 (CI/CD Pipelines):** 55% ➔ 75%
- **Phase 5 (KI-Gedächtnis):** 75% ➔ 85%
- **Phase 6 (Sicherheit & Logging):** 85% ➔ 95%
- **Phase 7 (Deployment & Audit):** 95% ➔ 100%

_Sobald wir anfangen die Liste abzuarbeiten, tracken wir den aktuellen Prozentwert genau hier im Dokument mit._
