from sqlalchemy_serializer import SerilaizerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerilaizerMixin):
    pass


class Animal(db.Model, SerilaizerMixin):
    pass

class Message(db.Model, SerilaizerMixin):
    pass

class Post(db.Model, SerilaizerMixin):
    pass
