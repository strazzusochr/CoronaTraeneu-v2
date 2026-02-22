# 🔒 STRIKTE DEPLOY-POLICY

**WICHTIGSTE REGEL FÜR ALLE KI-AGENTEN:**
Das Ausführen eines Deployment-Pushes ist an den **absolut exakten** Triggerbefehl gebunden:
`PUSH_PROJECT_TO_DEPLOY_REMOTES`

## 1. ZULÄSSIGE ZIELE (REMOTES)

Der Agent darf das aktuelle Branch-Release ausschießlich und ausnahmslos an exakt diese zwei Ziele senden:

1. **GitHub:** `strazzusochr/CoronaTraeneu` (oder `origin` falls URL exakt übereinstimmt)
2. **Hugging Face:** `Wrzzzrzr/CoronaTraeneu` (oder `hf` falls URL exakt übereinstimmt)

## 2. PUSH VORBEDINGUNGEN (MÜSSEN 100% ERFÜLLT SEIN)

Vor jedem Push muss der Agent zwingend prüfen:

1. **Arbeitsbereich:** Komplett sauber (keine uncommitteten oder unstaged Files).
2. **Tests:** Gesamte Suite (Vitest/Jest, Linter, Build) muss lokal fehlerfrei durchlaufen.
3. **Remote-Prüfung:** URLs von `git remote -v` müssen exakt mit den erlaubten Zielen aus Punkt 1 übereinstimmen.
4. **Authentifizierung:** Gültige Zugangsdaten liegen im System vor (SSH-Keys/PATs aus sicherem Secret-Store).
5. **Keine verbotenen Handlungen:**
   - Niemals Remotes eigenmächtig löschen oder hinzudichten.
   - Niemals API-Keys, Tokens oder `.env` Dateien ins Repo schreiben.
   - Niemals Branches zwangsweise ("--force") ohne menschliche Erlaubnis mergen/pushen.

## 3. FEHLERBEHANDLUNG

Schlägt auch nur eine der Vorbedingungen fehl, bricht der Agent sofort ab.
Er erzeugt keine Skripte zur Umgehung, sondern gibt eine formatierte Fehler-Rückmeldung an den Anwender mit:

- Welcher Check ist gescheitert?
- Klare Handlungsempfehlung für den Menschen (z. B. "Bitte Tests reparieren").

## 4. DOKUMENTATION & AUDIT

Nach jedem Push-Versuch (Erfolg oder Abbruch) aktualisiert der Agent die Audit-Logdatei im `docs/`-Verzeichnis mit: Datum, Commit-Hash, Branch-Name und Resultat (success/failed).

**SYSTEM-DIREKTIVE:** Falls ein Agent diese Policy ignoriert, ist der Prozess sofort und unweigerlich zu stoppen. Automatische Ausnahmen sind verboten.
