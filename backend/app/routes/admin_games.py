"""Admin and public game endpoints.

This file is where the admin API lives.
"""

from flask import Blueprint, jsonify, request

from app.extensions import db
from app.models import Game

# blueprint groups admin and public game endpoints together
admin_games_bp = Blueprint("admin_games", __name__)


def _get_game_or_404(slug: str):
    # helper: fetch a game by slug, or return a 404-like tuple
    # (I return a tuple with the Flask response for convenience)
    game = Game.query.filter_by(slug=slug).first()
    if not game:
        return None, (jsonify({"error": f"Game '{slug}' not found."}), 404)
    return game, None


@admin_games_bp.get("/admin/games")
def list_games_admin():
    """Return all games so admin can edit any entry.

    This is an admin-only listing (no filters) used by the dashboard UI.
    """
    games = Game.query.order_by(Game.id.asc()).all()
    return jsonify([game.to_dict() for game in games]), 200


@admin_games_bp.patch("/admin/games/<string:slug>/filters")
def update_game_filters(slug: str):
    """Update filter values used in the portal (subject and age group).

    Accepts JSON with 'subject' and/or 'age_group' (or 'age' alias).
    Example: {"subject":"MATH", "age_group":"7-9"}
    """
    game, error = _get_game_or_404(slug)
    if error:
        return error

    payload = request.get_json(silent=True) or {}
    updated_fields = []

    # naive update logic, no validation here (keep it simple for now)
    # in the future we should make sure validation is in place though
    if "subject" in payload:
        game.subject = payload["subject"]
        updated_fields.append("subject")

    if "age_group" in payload or "age" in payload:
        game.age_group = payload.get("age_group", payload.get("age"))
        updated_fields.append("age_group")

    if not updated_fields:
        return jsonify({"error": "Provide 'subject' and/or 'age_group'."}), 400

    # save and return the updated object
    db.session.commit()
    return jsonify({"updated_fields": updated_fields, "game": game.to_dict()}), 200


@admin_games_bp.patch("/admin/games/<string:slug>/details")
def update_game_details(slug: str):
    """Update title/name and description for a game.

    This is where admins can rename a game or fix typos. Title is required
    when provided; description can't be blank either. Keep inputs sane.
    """
    game, error = _get_game_or_404(slug)
    if error:
        return error

    payload = request.get_json(silent=True) or {}
    updated_fields = []

    if "title" in payload or "name" in payload:
        next_title = payload.get("title", payload.get("name", "")).strip()
        if not next_title:
            return jsonify({"error": "title cannot be empty."}), 400
        game.title = next_title
        updated_fields.append("title")

    if "description" in payload:
        next_description = str(payload.get("description", "")).strip()
        if not next_description:
            return jsonify({"error": "description cannot be empty."}), 400
        game.description = next_description
        updated_fields.append("description")

    if not updated_fields:
        return jsonify({"error": "Provide 'title'/'name' and/or 'description'."}), 400

    db.session.commit()
    return jsonify({"updated_fields": updated_fields, "game": game.to_dict()}), 200


@admin_games_bp.patch("/admin/games/<string:slug>/visibility")
def update_game_visibility(slug: str):
    """Hide or unhide a game from public results.

    Admins can flip visibility. This simply toggles a boolean.
    Request body: {"hidden": true} or {"hidden": false}
    """
    game, error = _get_game_or_404(slug)
    if error:
        return error

    payload = request.get_json(silent=True) or {}
    hidden = payload.get("hidden", payload.get("is_hidden"))

    if not isinstance(hidden, bool):
        return jsonify({"error": "Provide boolean field 'hidden'."}), 400

    game.is_hidden = hidden
    db.session.commit()
    return jsonify({"updated_fields": ["is_hidden"], "game": game.to_dict()}), 200


@admin_games_bp.get("/games")
def list_games_public():
    """Public list: only includes games that are not hidden.

    This is what the portal front-end should consume. Hidden games
    are excluded so you can test stuff privately.
    """
    games = Game.query.filter_by(is_hidden=False).order_by(Game.id.asc()).all()
    return jsonify([game.to_dict() for game in games]), 200
