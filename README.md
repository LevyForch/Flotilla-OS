# Flotilla OS

> **Coordinate your flotilla — track boats, share status, chat, and plan — entirely in the browser.**

Flotilla OS is a **local-first, mobile-first** web app for coordinating a small group of boats (~8). No backend, no server — everything runs in your browser and persists to `localStorage`.

---

## What it does

- 🗺 **Live map** — All boat positions shown on an interactive OpenStreetMap
- 📍 **Status updates** — Arrived / Need Help / Fuel Issue / OK per boat
- 🆘 **Alert banner** — Instant panic/incident visibility at the top
- 💬 **Group chat** — Send messages per-boat identity, stored locally
- 📋 **Shared plan** — Meetup point + fallback coves, editable by anyone
- 🎮 **Demo mode** — 8 pre-seeded boats with simulated movement/status ticks

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:5173)
npm run dev
```

---

## Build

```bash
npm run build
# Output goes to ./dist
```

To preview the production build locally:
```bash
npm run preview
```

---

## GitHub Pages Deployment

### 1. Push to `main`
All pushes to the `main` branch automatically trigger the deploy workflow (`.github/workflows/deploy.yml`).

### 2. Enable GitHub Pages
In your repo settings:
- Go to **Settings → Pages**
- Set **Source** to **GitHub Actions**

### 3. Base path
The app is pre-configured with `base: '/Flotilla-OS/'` in `vite.config.js`.

If your repository name is different, set the `VITE_BASE_PATH` environment variable in your workflow or `.env` file:
```
VITE_BASE_PATH=/your-repo-name/
```

For a user/org pages site (`username.github.io`), set `VITE_BASE_PATH=/`.

---

## Architecture Notes

| Concern | Approach |
|---|---|
| State management | `useReducer` + `fleetReducer` (action-based) |
| Persistence | `localStorage` via `saveState`/`loadState` |
| Demo simulation | `useDemoTicker` interval hook |
| Routing | React Router v6 with HashRouter (GitHub Pages compatible) |
| Map | react-leaflet + OpenStreetMap tiles |
| Styling | Tailwind CSS v3 with custom nautical theme |

> ⚠️ **MVP disclaimer:** This is a local-first demo. There is **no real-time network sync**. All data lives in the browser. To add multi-user sync, swap `storage.js` with a backend adapter (WebSocket, Firebase, etc.) — the reducer architecture is designed for this.

---

## Project Structure

```
src/
  components/
    layout/    AppShell, TopBar, BottomNav
    map/       FleetMap, BoatMarker, MapLegend
    fleet/     FleetList, BoatCard, StatusPill, PanicBanner
    status/    StatusQuickActions
    chat/      ChatPanel, ChatMessage, ChatComposer
    plan/      SharedPlanPanel, MeetupEditor, FallbackCovesEditor
    common/    Card, Button, Badge, SectionHeader, EmptyState
  hooks/       useLocalStorageState, useFleetState, useDemoTicker
  lib/         constants, formatters, geo, storage, demoData, fleetReducer, id
  pages/       Dashboard, Map, Fleet, Chat, Plan, Settings
```
