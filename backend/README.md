# Flask Backend

This folder contains a basic Flask backend for admin dashboard management.

## Install dependencies

```bash
cd backend
"/Users/jennabunescu/Desktop/Class/Serving Humanity w Computing/Hewitt-Chemistry-Games-Portal/.venv/bin/python" -m pip install -r requirements.txt
```

## Database setup (reproducible)

Migrations are committed under `backend/migrations/`.

```bash
cd backend
FLASK_APP=run.py "/Users/jennabunescu/Desktop/Class/Serving Humanity w Computing/Hewitt-Chemistry-Games-Portal/.venv/bin/python" -m flask db upgrade
```

This creates the SQLite database at `backend/instance/app.db` and seeds initial game rows.

## Run locally

```bash
cd backend
PORT=5001 "/Users/jennabunescu/Desktop/Class/Serving Humanity w Computing/Hewitt-Chemistry-Games-Portal/.venv/bin/python" run.py
```

## Endpoints

### Health

- `GET /api/health`

### Admin game management

- `GET /api/admin/games`
	- List all games (including hidden).
- `PATCH /api/admin/games/<slug>/filters`
	- Update `subject` and/or `age_group`.
- `PATCH /api/admin/games/<slug>/details`
	- Update `title` (or `name`) and/or `description`.
- `PATCH /api/admin/games/<slug>/visibility`
	- Update visibility with boolean `hidden`.

### Public game list

- `GET /api/games`
	- Returns only non-hidden games.

## Example curl requests

```bash
curl -s http://127.0.0.1:5001/api/admin/games
```

```bash
curl -s -X PATCH http://127.0.0.1:5001/api/admin/games/word-quest/filters \
	-H 'Content-Type: application/json' \
	-d '{"subject":"MATH","age_group":"7-9"}'
```

```bash
curl -s -X PATCH http://127.0.0.1:5001/api/admin/games/word-quest/details \
	-H 'Content-Type: application/json' \
	-d '{"title":"Word Quest Plus","description":"Updated admin description."}'
```

```bash
curl -s -X PATCH http://127.0.0.1:5001/api/admin/games/word-quest/visibility \
	-H 'Content-Type: application/json' \
	-d '{"hidden":true}'
```
