# Flask Backend

This folder contains the initial Flask setup for the admin dashboard backend.

## Run locally

```bash
cd backend
"/Users/jennabunescu/Desktop/Class/Serving Humanity w Computing/Hewitt-Chemistry-Games-Portal/.venv/bin/python" run.py
```

If port `5000` is already in use:

```bash
cd backend
PORT=5001 "/Users/jennabunescu/Desktop/Class/Serving Humanity w Computing/Hewitt-Chemistry-Games-Portal/.venv/bin/python" run.py
```

## Quick health check

- URL: `http://127.0.0.1:5000/api/health`
- Expected response: `{"status":"ok","service":"hewitt-games-backend"}`
