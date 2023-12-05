from sqlalchemy_serializer import SerilaizerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerilaizerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    accountType = db.Column(db.String)


class Animal(db.Model, SerilaizerMixin):
    pass

class Message(db.Model, SerilaizerMixin):
    pass

class Post(db.Model, SerilaizerMixin):
    pass
