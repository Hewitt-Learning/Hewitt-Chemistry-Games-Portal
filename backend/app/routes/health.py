"""health route used to verify backend availability.
"""

from flask import Blueprint, jsonify

# blueprint for health checks
health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health_check():
    # return a JSON blob so curl or a health probe knows we're awake
    return jsonify({"status": "ok", "service": "hewitt-games-backend"}), 200
