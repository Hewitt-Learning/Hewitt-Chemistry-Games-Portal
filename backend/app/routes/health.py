"""Simple health route used to verify backend availability."""

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    """Return a minimal OK response for uptime checks."""
    return jsonify({"status": "ok", "service": "hewitt-games-backend"}), 200
