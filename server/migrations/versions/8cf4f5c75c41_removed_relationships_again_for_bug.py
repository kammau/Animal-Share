"""removed relationships again for bug

Revision ID: 8cf4f5c75c41
Revises: 0bacf4a1d339
Create Date: 2023-12-11 14:40:42.073735

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8cf4f5c75c41'
down_revision = '0bacf4a1d339'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('animal_post')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('animal_post',
    sa.Column('animal_id', sa.INTEGER(), nullable=True),
    sa.Column('post_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['animal_id'], ['animals.id'], name='fk_animal_post_animal_id_animals'),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name='fk_animal_post_post_id_posts')
    )
    # ### end Alembic commands ###
