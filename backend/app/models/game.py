"""Game model used by both admin and public endpoints.

This is the data shape for games.
"""

from sqlalchemy import func

from app.extensions import db


class Game(db.Model):
    """Stores editable game metadata for the portal.
    
    Notes fore reference:
    - `slug` is the unique id used in URLs, like "element-decoder".
    - `title` is the display name shown on the card.
    - `description` shows up under the title (generally try to keep it short).
    - `subject` and `age_group` are used by the filter panel.
    - `is_hidden` is a toggle so admins can hide a game without
      deleting it.
    """

    __tablename__ = "games"

    # primary key (autoincrement)
    id = db.Column(db.Integer, primary_key=True)
    # human-readable unique id used in the UI
    slug = db.Column(db.String(80), unique=True, nullable=False)
    # display fields
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    # filter fields (optional)
    subject = db.Column(db.String(40), nullable=True)
    age_group = db.Column(db.String(10), nullable=True)
    # link + image for the portal card
    href = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    # quick toggle for public visibility
    is_hidden = db.Column(db.Boolean, nullable=False, default=False)
    # timestamps (simple defaults)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    def to_dict(self) -> dict:
        """Serialize for API responses.

        Keep the shape predictable for the front-end; if you add fields,
        add them here.
        """
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
