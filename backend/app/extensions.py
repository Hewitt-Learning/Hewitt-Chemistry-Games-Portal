"""Shared Flask extensions used across the backend.

This file just declares the extension objects so the rest of the app can
import them without triggering app creation. 
"""

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# these are initialized later in the app factory (see app/__init__.py)
db = SQLAlchemy()
migrate = Migrate()
