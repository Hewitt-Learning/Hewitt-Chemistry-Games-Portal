"""Shared Flask extensions used across the backend."""

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# Initialized in the app factory to avoid circular imports.
db = SQLAlchemy()
migrate = Migrate()
