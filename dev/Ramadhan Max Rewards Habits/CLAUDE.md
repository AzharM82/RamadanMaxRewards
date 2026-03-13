# Ramadan Max Rewards - Project Guide

## Overview
Ramadan habit tracking app with Google/Microsoft auth, Azure Table Storage backend, and admin role. Built with React 19 + TypeScript + Vite + Tailwind CSS v4. Deployed to Azure Static Web Apps with managed API functions.

## Live URL
https://brave-cliff-0ab6ad01e.6.azurestaticapps.net

## Azure Resources (resource group: `rg-aftersalahazkaar`)
- **SWA**: `RamadanMaxRewards` (Free plan, West US 2)
- **Table Storage**: `azkaaraftersalahsa` → tables `Profiles`, `Progress` (partitionKey: `default`, rowKey: userId)
- **Cosmos DB**: DELETED (2026-03-13) — migrated to Table Storage, saved ~$16/mo
- **Do NOT touch**: `AzkaarAfterSalah` SWA (separate app at calm-moss-0dbb8311e.4.azurestaticapps.net)

## App Settings (on SWA, not in code)
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AAD_CLIENT_ID`, `AAD_CLIENT_SECRET`, `TABLE_STORAGE_CONNECTION_STRING`, `ADMIN_EMAIL`

## Project Structure
```
├── src/                    # Frontend (React 19 + Vite)
│   ├── App.tsx             # Main app with auth gating + save button
│   ├── main.tsx            # Entry point, wrapped in AuthProvider
│   ├── services/api.ts     # Typed fetch wrappers for all API calls
│   ├── contexts/AuthContext.tsx  # Auth state (login, profile, admin)
│   ├── pages/              # LoginPage, ProfileSetupPage
│   ├── hooks/
│   │   ├── useHabitStorage.ts   # Progress state + localStorage + cloud save
│   │   └── useRamadanDay.ts     # Ramadan 2026 calendar (Feb 18 start)
│   ├── components/         # UI components (DaySelector, HabitTracker, etc.)
│   ├── data/               # Habit definitions, deed data by time of day
│   └── types.ts            # AllProgress, QuranProgress, DayProgress, etc.
├── api/                    # Azure Functions (Node.js v4, TypeScript)
│   ├── src/functions/      # GetRoles, profile, progress endpoints
│   ├── src/lib/            # auth.ts (x-ms-client-principal), cosmos.ts (Table Storage client)
│   ├── tsconfig.json       # Separate from frontend (no verbatimModuleSyntax)
│   └── package.json        # @azure/functions, @azure/data-tables
├── staticwebapp.config.json # Auth providers, route protection, platform config
└── .gitignore              # Excludes node_modules, dist, .env, *.md
```

## Key Architecture Decisions
- **Single Save button** instead of per-toggle API calls (cost optimization — 1 Table Storage write per save vs 26+ per session)
- **localStorage as cache**, API as source of truth. On mount: load local instantly, fetch API in background
- **Table Storage schema**: `Profiles` table (flat fields), `Progress` table (habits/quran as JSON strings)
- **`isDirty` flag** tracks unsaved changes; floating "Save Progress" button appears when dirty
- **Completion % capped at 100%** — planner deeds + habits share the same progress object
- **Admin role**: `reachazure37@gmail.com` gets `admin` via `/api/GetRoles` (called by SWA at login)
- **Days unlock progressively** — only days up to the current Ramadan day are selectable

## TypeScript Notes
- Frontend: `verbatimModuleSyntax: true`, `erasableSyntaxOnly: true` — use `import type { X }`, no enums
- API: `esModuleInterop: true`, `module: Node16` — uses `.js` extensions in imports

## Build & Deploy
```bash
# Frontend
npm run build              # tsc -b && vite build → dist/

# API
cd api && npm install && npm run build   # tsc → api/dist/

# Deploy (both together)
swa deploy ./dist --api-location api --app-name RamadanMaxRewards --env production --api-language node --api-version 20
```

## Git
- **Repo**: https://github.com/AzharM82/RamadanMaxRewards
- **Main branch**: `main` (local branch `AzkaarSalah` pushes to `origin/main`)
- **Docs branch**: `docs` (README, proposal, prompt files)
- Push with: `git push origin HEAD:main`

## Ramadan 2026 Calendar
- Start: February 18, 2026
- End: March 19, 2026 (30 days assumed)
- Storage keys: `ramadan-habits-2025`, `ramadan-quran-2025` (legacy naming)
