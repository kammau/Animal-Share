from sqlalchemy_serializer import SerilaizerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerilaizerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    accountType = db.Column(db.String)

    currentAnimal = db.relationship("Animal", back_populates="user")
    taggedAnimals = db.relationship("Animal", back_populates="user") #Make sure back_populates is correct!

    posts = db.relationship("Post", back_populates="user")

    messages = db.relationship("Message", back_populates="receiver")
    
    def __repr__(self):
        return f"<User {self.username} | {self.id} | {self.accountType}>"

class Animal(db.Model, SerilaizerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    img = db.Column(db.String)
    species = db.Column(db.String, nullable=False)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    location = db.Column(db.String)
    sex = db.Column(db.String, nullable=False)


    #Add __repr__
    

class Message(db.Model, SerilaizerMixin):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    messageBody = db.Column(db.String, nullable=False)

    #Add __repr__

class Post(db.Model, SerilaizerMixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    postBody = db.Column(db.String, nullable=False)
    img = db.Column(db.String)

    #Add __repr__
