"""Flask application package.

This file wires up the flask app. I'm adding a few laid-back comments
because Jared said more comments is always better
plus dry code is boring. Don't judge the style :)
"""

import os

from flask import Flask

from app.extensions import db, migrate
from app.models import Game
from app.routes.admin_games import admin_games_bp
from app.routes.health import health_bp
from config import Config


def create_app() -> Flask:
    """Build and configure the Flask app instance.

    - create the Flask app
    - load configurations
    - make sure instance path exists (sqlite ends up here)
    - init DB + migration helpers
    - register API endpoints
    """
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)

    # make the instance folder if it isn't already there
    # (sqlite database file will live in backend/instance/app.db by default)
    os.makedirs(app.instance_path, exist_ok=True)

    # init DB and migration extensions. this is lazy-init so we avoid
    # import cycles during module import time. feel free to move stuff
    # around later if this confuses you.
    db.init_app(app)
    migrate.init_app(app, db)

    # make sure models are imported so SQLAlchemy knows about them
    # (we do a one-liner assignment because i don't want unused-import warnings)
    _ = Game

    # register our API blueprints. grouping under /api keeps things tidy.
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(admin_games_bp, url_prefix="/api")

    return app
