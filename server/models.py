from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

animal_post = db.Table(
    "animal_post",
    db.Column("animal_id", db.Integer, db.ForeignKey("animals.id")),
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id"))
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    # serialize_rules = (

    # )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    accountType = db.Column(db.String)

    currentAnimal = db.relationship("Animal", back_populates="currentOwner")
    taggedAnimals = db.relationship("Animal", back_populates="taggedBy")

    posts = db.relationship("Post", back_populates="user")

    messages = db.relationship("Message", back_populates="receiver")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes cannot be viewed!")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )
    
    def __repr__(self):
        return f"<User {self.username} | {self.id} | {self.accountType}>"

class Animal(db.Model, SerializerMixin):
    __tablename__ = "animals"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    img = db.Column(db.String)
    species = db.Column(db.String, nullable=False)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    location = db.Column(db.String)
    sex = db.Column(db.String, nullable=False)

    currentOwner = db.relationship("User", back_populates="currentAnimal")
    taggedBy = db.relationship("User", back_populates="taggedAnimals")

    posts = db.relationship("Post", secondary=animal_post, back_populates="animals")


    def __repr__(self):
        return f"<Animal {self.name} | {self.species} | {self.id}>"
    

class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    messageBody = db.Column(db.String, nullable=False)
    sender = db.Column(db.String)

    # sender = db.relationship("User", back_populates="username")
    reciever = db.relationship("User", back_populates="messages")

    def __repr__(self):
        return f"<Message {self.id} | {self.sender}>"

class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    postBody = db.Column(db.String, nullable=False)
    img = db.Column(db.String)

    user = db.relationship("User", back_populates="posts")

    animals = db.relationship("Animal", secondary=animal_post, back_populates="posts")

    def __repr__(self):
        return f"<Post {self.id} | {self.title} | {self.user}>"
