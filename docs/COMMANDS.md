# Comandos útiles

## Monorepo (raíz)
```bash
pnpm install                 # instala deps
pnpm dev                     # dev (tareas dev de cada app)
pnpm lint                    # lint (todas las apps que definan script lint)
pnpm type-check              # type-check (todas las apps con script)
pnpm test                    # tests (backend por ahora)
```

## Frontend (`apps/frontend`)
```bash
pnpm --filter frontend dev         # Next.js dev server
pnpm --filter frontend lint        # ESLint (perfil intermedio)
pnpm --filter frontend type-check  # TypeScript sin emitir
```

## Backend Python (`services/backend-python`)
```bash
# Lint + Tests en contenedor efímero
docker run --rm -v "$PWD/services/backend-python":/app -w /app \
  python:3.11-slim bash -lc "pip install -r requirements.txt && ruff check app && pytest -q"

# Correr local (opcional)
uvicorn app.main:app --reload --port 8000
```

## Docker Compose
```bash
# Levantar DB y backend
docker compose up -d db backend

# Reconstruir backend si cambian deps
docker compose build backend && docker compose up -d backend

# Ver logs
docker compose logs -f backend
```
