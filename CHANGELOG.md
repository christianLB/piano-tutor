# Changelog

All notable changes to this project will be documented in this file.

## [0.1.1] - 2025-08-09
### Added
- Frontend: added `type-check` script (`tsc --noEmit`).
- Turborepo: migrated `pipeline` to `tasks` and added `type-check` task with caching.
- Documentation: initialized `docs/` with `README.md`, `SETUP.md`, `COMMANDS.md`, `DOCKER.md`.

### Changed
- Repository scripts at root: added `type-check` to run across workspaces.

## [0.1.0] - 2025-08-09
### Added
- Backend robustness: Alembic setup with initial migration, pytest minimal tests, ruff linting.
- API hardening: `/analyse` MIME and 5MB size validation.
- Docker Compose: DB exposed on host `5544`, backend on `8001`.
- Test infrastructure: `httpx` added for FastAPI TestClient.
- Env template: `ENV.EXAMPLE` at repo root.

