"""seed initial games

Revision ID: 0c25f98fa769
Revises: dee1a16885b3
Create Date: 2026-04-27 18:09:40.773945

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c25f98fa769'
down_revision = 'dee1a16885b3'
branch_labels = None
depends_on = None


def upgrade():
    games_table = sa.table(
        "games",
        sa.column("slug", sa.String(length=80)),
        sa.column("title", sa.String(length=120)),
        sa.column("description", sa.Text()),
        sa.column("subject", sa.String(length=40)),
        sa.column("age_group", sa.String(length=10)),
        sa.column("href", sa.String(length=255)),
        sa.column("image_url", sa.String(length=255)),
        sa.column("is_hidden", sa.Boolean()),
    )

    # TODO: update this with the proper games at the end, but currently keep the test games
    op.bulk_insert(
        games_table,
        [
            {
                "slug": "element-decoder",
                "title": "Element Decoder",
                "description": "Build familiarity with the periodic table through a word-discovery challenge that reveals hidden answers as you progress.",
                "subject": "CHEMISTRY",
                "age_group": "12+",
                "href": "/element-decoder/",
                "image_url": "/images/element-decoder-new.png",
                "is_hidden": False,
            },
            {
                "slug": "compound-decoder",
                "title": "Compound Decoder",
                "description": "Practice compounds and chemistry naming patterns with clue-driven rounds designed for repetition and mastery.",
                "subject": "CHEMISTRY",
                "age_group": "12+",
                "href": "/compound-decoder/",
                "image_url": "/images/compound-decoder.png",
                "is_hidden": False,
            },
            {
                "slug": "ionic-tetris",
                "title": "Ionic Tetris",
                "description": "Guide ions into valid compounds in a fast-paced strategy challenge that reinforces ionic bonding logic.",
                "subject": "CHEMISTRY",
                "age_group": "5-7",
                "href": "/ionic-tetris/",
                "image_url": "/images/ionic-tetris.png",
                "is_hidden": False,
            },
            {
                "slug": "word-quest",
                "title": "Word Quest",
                "description": "Develop language and literacy with vocabulary clues, context practice, and progression-based challenges.",
                "subject": "LANGUAGE",
                "age_group": "0-5",
                "href": "#",
                "image_url": None,
                "is_hidden": False,
            },
            {
                "slug": "rhythm-lab",
                "title": "Rhythm Lab",
                "description": "Blend chemistry with creative rhythm activities that build pattern recognition and musical expression.",
                "subject": "ARTS & MUSIC",
                "age_group": "9-12",
                "href": "#",
                "image_url": None,
                "is_hidden": False,
            },
            {
                "slug": "timeline-trek",
                "title": "Timeline Trek",
                "description": "Explore social studies and history through timeline clues, sequencing, and logic-driven mini games.",
                "subject": "HISTORY",
                "age_group": "7-9",
                "href": "#",
                "image_url": None,
                "is_hidden": False,
            },
        ],
    )


def downgrade():
    op.execute(
        """
        DELETE FROM games
        WHERE slug IN (
            'element-decoder',
            'compound-decoder',
            'ionic-tetris',
            'word-quest',
            'rhythm-lab',
            'timeline-trek'
        )
        """
    )
