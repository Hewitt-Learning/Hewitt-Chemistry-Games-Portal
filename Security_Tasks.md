# Security tasks for next team

This document lists security-related tasks that we didn't get the time to fix. These tasks are a priority for making this code-base production-ready.

This is a security backlog. Add anything else that pops up during development here, but when you complete a task, don't remove it from this file. Just add it in a different section to signal that it's "done." I'd also recommend documenting exactly *how* you ended up fixing each issue, because libraries and tools deprecate over time, so good documentation would make it easier to keep this code-base updated.

For each fix or new feature you add, add unit/integration tests (these are very important because they make sure your change works but also prevents regressions)

## Backend

- Authentication & authorization
  - Admin endpoints (`/api/admin/*`) expose functionality and should be protected.
  - Add auth (token-based like JWT or session + admin user table). Require an admin role on these routes. Also make routes less straightforward (name them something more obfuscated rather than just 'admin' if community partner agrees)

- Debug mode enabled in `backend/run.py`.
  - The problem is that `app.run(..., debug=True)` is on by default. This is not safe for prod.
  - Remove `debug=True` for non-dev runs; respect `FLASK_ENV` or an explicit `DEBUG` env var. Add a check to refuse debug in production.

- Weak secret handling / default `SECRET_KEY` in `backend/config.py` and `.env.example`.
  - Problem is `Config.SECRET_KEY` falls back to a predictable default; no guidance to use env-managed secret in deployment.
  - Require secret via env in production; also generate a strong secret. 

- No rate limiting on admin endpoints in `admin_games.py`
  - Add a rate limiter and set reasonable per-IP and per-token limits.

- Input validation & sanitization
  - `admin_games` accepts JSON without validation. Although we have SQLAlchemy ORM, invalid or unexpected values might still affect things like UI.
  - We should use schema validation to validate request payloads and enforce allowed values for `subject` and `age_group`, also enforcing max lengths and types.

- SQL migrations
  - There is direct SQL in migrations which right now is sort of fine but try to keep migrations idempotent and avoid secrets in migrations.
  - Keep migrations limited to schema/seed data. When using raw SQL, ensure strings are constant and safe. Maybe highly recommend considering tests for migrations.

- No CSRF protection on state-changing endpoints
  - If admin UI uses cookies for auth, endpoints mutate state via PATCH without CSRF tokens.
  - If next team decides to use cookie-based sessions, add CSRF tokens. Otherwise, for token-based auth, make CORS restricted instead.

- There are no secure HTTP headers ? research this more though I'm not 100% sure what's needed to fix that.

- There is no audit logging for admin actions
  - There is no trail so if there is an admin endpoint breach we wouldn't be able to tell
  - Add logs that tell you the actor, IP, timestamp, action, etc.

---

## Frontend

- No obvious issues. THe only thing I'd note is that if you validate input on the frontend, make sure you mirror that validation on the backend too. It's not enough to only validate input client-side.

---

## Suggestions for tools
- Authentication / Authorization: Flask-Login + role checks, or JWT with `pyjwt` and role claims.
- Rate limiting: `Flask-Limiter`.
- Input validation: `marshmallow` or `pydantic`.
- Dependency scanning: `pip-audit`, `npm audit`, Dependabot, GitHub Actions security scans.
