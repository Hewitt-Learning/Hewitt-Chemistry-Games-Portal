"""Game model used by both admin and public endpoints."""

from sqlalchemy import func

from app.extensions import db


class Game(db.Model):
    """Stores editable game metadata for the portal."""

    __tablename__ = "games"

    # for the game data, which would be filterable
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    subject = db.Column(db.String(40), nullable=True)
    age_group = db.Column(db.String(10), nullable=True)
    href = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    is_hidden = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    def to_dict(self) -> dict:
        """Serialize for API responses."""
        return {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "description": self.description,
            "subject": self.subject,
            "age_group": self.age_group,
            "href": self.href,
            "image_url": self.image_url,
            "is_hidden": self.is_hidden,
        }
