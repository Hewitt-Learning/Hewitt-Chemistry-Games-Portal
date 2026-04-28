"""Central config values for the Flask app."""

import os
from pathlib import Path


class Config:
    """Default backend config.
    """

    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
    _BASE_DIR = Path(__file__).resolve().parent
    _DEFAULT_DB_PATH = _BASE_DIR / "instance" / "app.db"
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", f"sqlite:///{_DEFAULT_DB_PATH}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
