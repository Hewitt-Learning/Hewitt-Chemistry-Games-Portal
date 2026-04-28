"""Central config values for the Flask app."""

import os


class Config:
    """Default backend config.
    """

    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-me")
