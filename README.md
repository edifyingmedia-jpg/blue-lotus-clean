# Blue Lotus — Builder (Minimal)

**Status:** Minimal, local-only frontend builder for prototyping components and page specs.

This repository contains a lightweight, self-contained app builder workspace intended to help you iterate on component primitives, a manifest, and a simple live preview + inspector. It is not a full production platform — it is a developer-focused sandbox that lets you programmatically create a UI spec and preview it immediately.

---

## What this project includes

- **Manifest**: `frontend/public/components.json` — list of available components and their default props.
- **Components**: `frontend/src/components/*` — small React primitives (Button, Card) and a registry.
- **Builder UI**: `frontend/src/builder/Workspace.jsx` — live preview, inspector, and a programmatic builder API.
- **Entry**: `frontend/src/index.jsx` and `frontend/public/index.html`.
- **Styles**: `frontend/src/index.css`.
- **Helper modules**: `frontend/src/builder/registry.js`, `generate.js`, `index.js`.
- **Package**: `frontend/package.json` — scripts and dependencies.

---

## Quick start (development)

1. **Install dependencies**
```bash
cd frontend
npm install
