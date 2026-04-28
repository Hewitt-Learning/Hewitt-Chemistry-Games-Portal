"""Flask application package.

The app factory keeps setup centralized and makes testing easier later.
"""

import os

from flask import Flask

from app.extensions import db, migrate
from app.models import Game
from app.routes.admin_games import admin_games_bp
from app.routes.health import health_bp
from config import Config


def create_app() -> Flask:
    """Build and configure the Flask app instance."""
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)
    os.makedirs(app.instance_path, exist_ok=True)

    db.init_app(app)
    migrate.init_app(app, db)

    # Import to ensure SQLAlchemy metadata includes all models.
    _ = Game

    # Register API routes in one place so new blueprints are easy to add.
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(admin_games_bp, url_prefix="/api")

    return app
