"""Flask application package.

The app factory keeps setup centralized and makes testing easier later.
"""

from flask import Flask

from app.routes.health import health_bp
from config import Config


def create_app() -> Flask:
    """Build and configure the Flask app instance."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register API routes in one place so new blueprints are easy to add.
    app.register_blueprint(health_bp, url_prefix="/api")

    return app
