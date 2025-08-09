# Docker & Servicios

## Servicios en `docker-compose.yml`
- `db` (Postgres 16)
  - Credenciales desde `.env` (ver `ENV.EXAMPLE`).
  - Puerto host `5544` mapea al `5432` del contenedor (evita conflicto con Postgres local).
- `backend` (FastAPI + Uvicorn)
  - Expone `8001` en host.
  - Depende de `db`.
- `frontend` (Next.js)
  - Expone `3001` en host (puedes cambiarlo con `FRONTEND_PORT`).
  - Depende de `backend`.
  - Usa `NEXT_PUBLIC_API_URL=http://localhost:8001` por defecto.

## Comandos básicos
```bash
# Levantar backend + DB
docker compose up -d db backend

# Levantar full-stack (DB + backend + frontend)
docker compose up -d db backend frontend

# Reconstruir backend si cambian deps o Dockerfile
docker compose build backend && docker compose up -d backend

# Logs
docker compose logs -f backend

# Acceder al frontend
open http://localhost:${FRONTEND_PORT:-3001}

# Apagar
docker compose down
```

## Migraciones (Alembic)
- Migración inicial ya aplicada.
- Para generar una nueva migración y aplicarla:
```bash
docker run --rm --network host -e PYTHONPATH=/app \
  -e BACKEND_DATABASE_URL=postgresql+psycopg://piano:piano_pass@localhost:5544/piano_tutor \
  -v "$PWD/services/backend-python":/app -w /app \
  python:3.11-slim bash -lc "pip install -r requirements.txt && alembic revision --autogenerate -m 'change' && alembic upgrade head"
```

## Healthchecks
- Backend: `GET http://localhost:8001/health` → `{ "status": "ok" }`.
- DB: verificar `docker compose logs db`.
