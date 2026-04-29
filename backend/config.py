"""Central config values for the Flask app.

This is intentionally tiny. For now we keep things simple—env overrides
work fine and sqlite is the default for fast local dev.
"""

import os
from pathlib import Path


class Config:
    """Default backend config.

    Edit or extend if you want to add auth tokens, CORS, or other settings.
    """

    # keep this secret in production; .env.example shows how to set it
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-me")

    # simple local sqlite default (placed in backend/instance/app.db)
    _BASE_DIR = Path(__file__).resolve().parent
    _DEFAULT_DB_PATH = _BASE_DIR / "instance" / "app.db"
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", f"sqlite:///{_DEFAULT_DB_PATH}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
