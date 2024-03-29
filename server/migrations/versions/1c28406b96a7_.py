"""empty message

Revision ID: 1c28406b96a7
Revises: 8dce0a2f00f9
Create Date: 2024-01-22 14:55:03.696956

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c28406b96a7'
down_revision = '8dce0a2f00f9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('messageTitle', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_column('messageTitle')

    # ### end Alembic commands ###
