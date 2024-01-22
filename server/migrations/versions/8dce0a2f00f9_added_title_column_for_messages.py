"""added title column for messages

Revision ID: 8dce0a2f00f9
Revises: 56097dd07e6b
Create Date: 2024-01-22 14:51:10.558925

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8dce0a2f00f9'
down_revision = '56097dd07e6b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('messageTitle', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_column('messageTitle')

    # ### end Alembic commands ###
