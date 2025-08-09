# Setup

## Prerrequisitos
- Node.js >= 20 y pnpm >= 10
- Docker y Docker Compose
- Python (opcional, solo si quieres ejecutar tests fuera de Docker)

## Clonar el repo
```bash
git clone https://github.com/christianLB/piano-tutor.git
cd piano-tutor
```

## Variables de entorno
- Copia `ENV.EXAMPLE` y ajusta valores si lo necesitas:
```bash
cp ENV.EXAMPLE .env
```
- Frontend (opcional, para dev fuera de Docker):
  - Crea `apps/frontend/.env.local` con:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8001
    ```

## Levantar stack con Docker (backend + DB)
```bash
docker compose up -d db backend
```
- DB expuesta en host: `localhost:5544` (evita conflicto con Postgres local).
- Backend disponible en: `http://localhost:8001`.
- Salud: `curl http://localhost:8001/health` → `{ "status": "ok" }`.

## Ejecutar frontend (dev local)
En otra terminal:
```bash
pnpm install
pnpm --filter frontend dev
```
- Abre `http://localhost:3000` (Next elegirá otro puerto si 3000 está ocupado).

## Páginas y endpoints
- Frontend:
  - `/score`: renderiza un MusicXML de ejemplo.
  - `/analyse`: formulario que envía el archivo al backend.
- Backend:
  - `GET /health`
  - `POST /analyse` (acepta MusicXML/MIDI, valida MIME y tamaño ≤ 5MB)
  - `GET /scores`

## Troubleshooting
- Puerto 5432 ocupado: ya mitigado usando `5544:5432` en `docker-compose.yml`.
- Múltiples lockfiles: el monorepo usa el lock de raíz. Los lock anidados están ignorados.
- CORS: permitido por defecto para `http://localhost:3000` y `127.0.0.1:3000`.
