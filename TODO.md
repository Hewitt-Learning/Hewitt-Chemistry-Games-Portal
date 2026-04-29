# TODO

This doc lists everything remaining to complete the project to make it mostly production ready.


## HIGHEST PRIORITY

- Add unit tests, even if small/basic ones!!
- Highest priority securty tasks
- Connect backend & frontend
- Move games out of this repo into their own repo
- Deployment (I'd recommend only deploying once above steps are completed)

## Repo-level

- Move games out of this repo into their own repo

## Security

See `Security_Tasks.md`.

## Backend

- Auth endpoints to add 
  - `POST /api/admin/login` (returns token) or token-based static token management.
  - `POST /api/admin/logout`

- Public APIs
  - `GET /api/games/<slug>` (optional)
  - `GET /api/games/filters`
  - `GET /api/games/search` if you want query-based search
  - `GET /api/games?page=` for pagination, also optional

- Add a consistent JSON error shape for 400/404/500 responses so the UI knows how to handle failures.

- Data & queries
  - Add pagination or a limit to admin/public game listings once the dataset grows.
  - Optimize search if needed (not necessary with a small dataset though)

- Making it production-ready
  - Keep the SQLite setup for local dev, but consider making it easy to switch to PostgreSQL for staging and production
  - Make debug mode environment-driven so the server behaves differently in development versus production.
  - Get deployment ready (azure and other tools require quite a bit of config, make sure to *follow best practices*)

- Testing!!!!!!!! 
  - Add backend unit tests for the game routes, especially the update paths and public filtering behavior. Use pytest and flask-testing or test client.

---

## Frontend
- Make sure UI is accessibility-friendly. I'd recommend setting up a markdown file to take care of this.
- Replace hardcoded `GAMES` with dynamic fetches from `GET /api/games`. Gracefully fallback for missing metadata. Do this dynamic fetch for other things like filters too.
- Admin UI!
- Unit tests. Component tests with Jest + React Testing Library. I personally really like playwright tests for testing components.

---

## CI/CD & Deployment
- Consult with Jared first, but consider using GitHub actions if your team is bigger than 2 people. Having a CI pipeline and setting that up would be really useful for Ceiba connections, but would also help you get familiar with industry practices. 
- Add deployment guide document
---

## Observability
- Add structured logging and detailed exceptions