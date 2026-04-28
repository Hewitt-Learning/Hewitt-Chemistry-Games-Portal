"""Local entrypoint for running the Flask backend."""

import os

from app import create_app

app = create_app()


if __name__ == "__main__":
    # Debug mode is on for local development only.
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
