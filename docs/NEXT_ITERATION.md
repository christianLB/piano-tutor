# Next Iteration Plan — Piano Tutor AI

Date: 2025-08-09

## Objectives
- Elevate the demo into a polished, reliable POC with clear UX.
- Expand core capabilities (scores listing, analysis display, OSMD playback/controls).
- Improve robustness, observability, and developer experience.

## Current State (Baseline)
- Full stack runs via Docker Compose: `db`, `backend` (FastAPI + SQLModel + Alembic), `frontend` (Next.js+Tailwind).
- Frontend landing page is professional (hero, features, CTAs to `/analyse` and `/score`).
- `/analyse` uploads MusicXML/MIDI, validates, stores, analyses with `music21`, persists `Score` and `Analysis`.
- CORS configured for frontend ports (3000/3001/3100). Uploads accept common MIME types + extension fallback.
- Sample MusicXML available at `sheetmusic/musicalion268073-1.musicxml`.

## Demo Flow
1. Open http://localhost:3100
2. Click “Probar análisis (POC)” → `/analyse`
3. Upload MusicXML/MIDI → receive JSON (key, time signature, measures, notes)
4. Click “Ver partitura de ejemplo” → `/score` for OSMD render

## Next Iteration: Frontend
- UI/UX polish
  - Replace raw JSON on `/analyse` with summary cards (Key, TS, Measures, Notes)
  - Add error/success toasts and loading states
  - Add minimal navbar links and footer consistency across routes
- Scores list and detail
  - New route `/scores` calling `GET /scores`, show table with created_at, title
  - Link each row to `/scores/[id]` (detail view), fetch associated analysis
- Score viewer enhancements
  - Load stored MusicXML (from `storage/scores`) when a score is selected
  - Basic playback controls (OSMD options) and measure highlighting (stub ok)

## Next Iteration: Backend
- Endpoints
  - `GET /scores` (already exists) — extend with pagination query params
  - `GET /scores/{id}` — fetch one score and latest analysis
  - `GET /files/{filename}` — serve stored MusicXML with correct headers (for OSMD)
- Robustness & DX
  - Add pydantic response models for new endpoints
  - Expand tests (unit + simple API integration for new routes)
  - Improve logging around uploads and parsing

## Orchestration & Ops
- Docker Compose
  - Add healthchecks for backend and frontend
  - Add restart policies and small backoff
- Observability
  - Structured logs (uvicorn + app), surface in `docker compose logs`
  - Basic request timing middleware for analysis endpoint

## QA & Tooling
- Linting/Formatting: continue with Ruff/ESLint
- Type-check: `tsc --noEmit` and mypy (optional) for backend
- CI (optional): GitHub Actions matrix for lint + test + type-check

## Acceptance Criteria
- `/scores` page lists stored scores with created timestamps and titles
- Clicking a score opens detail page with analysis summary and a “Open in Viewer” CTA
- `/analyse` shows analysis in cards (no raw JSON by default)
- Backend serves files via `GET /files/{filename}` and detail via `GET /scores/{id}`
- All services start via `docker compose up -d` and pass healthchecks
- Lint and tests pass locally: `pnpm lint && pnpm type-check && pytest -q`

## Commands
- Start stack: `docker compose up -d`
- Rebuild frontend: `docker compose build frontend && FRONTEND_PORT=3100 docker compose up -d frontend`
- Rebuild backend: `docker compose build backend && docker compose up -d backend`
- Logs: `docker compose logs -f backend` / `docker compose logs -f frontend`
- Tests (backend): `docker compose exec backend pytest -q`

## Notes
- Keep `.env` updated; refer to `.env.example`.
- For demo: validate with a local MusicXML and basic flow across `/analyse` and `/score`.
