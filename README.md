# DigiMoneta - Gehaltskampf-Arena

Eine gamifizierte Web-App zur Simulation von Gehaltsverhandlungen mit KI-gesteuerten Arbeitgebern im Stil klassischer RPG-Kampfspiele.

## 🎮 Features

### Spielmechaniken
- **Strategische Kämpfe**: Nutze verschiedene Verhandlungstechniken gegen unterschiedliche Chef-Typen
- **Skill-Training**: Verbessere deine Verhandlungsfähigkeiten durch praktische Übung
- **Erfolg sichern**: Lerne, wie du deine Ziele in echten Verhandlungen erreichst

### Chef-Typen
- **Hardliner** 👔: Strukturiert, emotionslos, regelgetrieben - Schwach gegen Marktdaten
- **Sparfuchs** 💰: Budgetfixiert, bonusorientiert, kreativ - Widerstandsfähig gegen Team-Argumente
- **Loyaler Boss** 🤝: Teamzentriert, bindungsoffen, entwicklungsfreundlich - Schwach gegen Leistungsnachweise

### Verhandlungszüge
- **Marktwert-Attacke** (Power: 7): Vergleichsdaten aus deiner Branche
- **Leistungs-Combo** (Power: 6): Erfolge aus letztem Projekt
- **Team-Bonus-Schlag** (Power: 5): Kollektive Leistung als Argument
- **Psychologische Pause** (Power: 4): Ruhe als Verhandlungsmittel

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (Version 16 oder höher)
- npm oder yarn

### Installation
```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build
```

Die App ist dann unter `http://localhost:3000` verfügbar.

## 🛠️ Technologie-Stack

- **Frontend**: React 18, TailwindCSS
- **State Management**: Zustand
- **Animationen**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 🎯 Spielablauf

1. **Startbildschirm**: Willkommen in der Gehaltskampf-Arena
2. **Profil-Setup**: 
   - Beruf & Branche wählen
   - Erfahrung & Verhandlungsziele definieren
   - Chef-Verhalten beschreiben
3. **Gegnerauswahl**: Wähle zwischen Hardliner, Sparfuchs oder Loyaler Boss
4. **Verhandlungsszene**: 
   - Nutze verschiedene Züge gegen den Chef
   - Verfolge den Kampfverlauf
   - Gewinne durch strategisches Denken
5. **Ergebnis**: Sieg oder Niederlage mit Tipps für echte Verhandlungen

## 🎨 Design-Features

- **Responsive Design**: Optimiert für Desktop und Mobile
- **Smooth Animations**: Framer Motion für flüssige Übergänge
- **Dark Theme**: Moderne, augenschonende Farbgebung
- **Gamification**: RPG-ähnliche Elemente mit Health Bars und Power Levels

## 📊 State Management

Die App verwendet Zustand für:
- Spielerprofil (Branche, Position, Erfahrung, Ziele)
- Employer-Typ und Battle-State
- Kampfverlauf und Logs
- Persistierung wichtiger Daten

## 🔧 Entwicklung

### Projektstruktur
```
src/
├── components/          # UI-Komponenten
│   ├── BattleHUD.jsx
│   ├── MoveSelector.jsx
│   ├── BattleLog.jsx
│   └── VictoryModal.jsx
├── screens/            # Hauptbildschirme
│   ├── WelcomeScreen.jsx
│   ├── SetupScreen.jsx
│   ├── BossSelectScreen.jsx
│   └── BattleScreen.jsx
├── store/              # State Management
│   └── useGameStore.js
├── App.jsx             # Haupt-App-Komponente
├── main.jsx            # Entry Point
└── index.css           # Globale Styles
```

### Anpassungen
- **Neue Chef-Typen**: Erweitere das `characters` Array in `BossSelectScreen.jsx`
- **Neue Züge**: Füge Moves im `useGameStore.js` hinzu
- **Styling**: Passe TailwindCSS-Klassen in den Komponenten an

## 🎯 Lernziele

Die App vermittelt:
- **Verhandlungsstrategien**: Verschiedene Ansätze je nach Chef-Typ
- **Argumentationstechniken**: Von Fakten bis Psychologie
- **Selbstvertrauen**: Durch praktische Übung in sicherer Umgebung
- **Reflexion**: Analyse der eigenen Verhandlungsstrategie

## 📝 Lizenz

Dieses Projekt ist für Bildungszwecke entwickelt. Freie Verwendung und Anpassung erlaubt.

---

**Viel Spaß beim Verhandeln! 🎮💼**