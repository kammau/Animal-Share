from flask import request, session
from flask_restful import Resource

from config import app, db, api
from models import User, Message, Animal, Post

@app.route("/")
def index():
    return "<h1>Project Server</h1>"

# USER:

class CheckSession(Resource):
    def get(self):
        user_id = session["user_id"]

        if user_id:
            user = User.query.filter_by(id=user_id).first()
            return user.to_dict(), 200
        
        return {}, 401

class Signup(Resource):
    def post(self):
        username = request.get_json().get("username")
        password = request.get_json().get("password")

        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session["user_id"] = new_user.id

            return new_user.to_dict(), 201
        
        return {"error": "422: Uprocessable Entity"}
    
class Login(Resource):
    def post(self):
        username = request.get_json().get("username")
        password = request.get_json().get("password")

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session["user_id"] = user.id

            return user.to_dict(), 200
        
        return {"error": "401: Unauthorized"}, 401
    

class Logout(Resource):
    def delete(self):
        session["user_id"] = None

        return {"message": "204: No Content"}, 204
    

class Users(Resource):
    def get(self):
        users = User.query.all()

        users_serilaized = [user.to_dict() for user in users]

        return users_serilaized, 200


# TAGGED ANIMALS:

class UsersTaggedAnimals(Resource):
    def get(self):
        user = User.query.filter(User.id == session["user_id"]).first()
        taggedAnimals = [taggedAnimals.to_dict() for taggedAnimals in user.taggedAnimals]

        return taggedAnimals, 200
    
class TaggedAnimalByID(Resource):
    def delete(self, id):
        animal = Animal.query.filter(Animal.id == id).first()
        user = User.query.filter(User.id == session["user_id"]).first()

        user.taggedAnimals.remove(animal)

        db.session.add(user)
        db.session.commit()

        return {}, 204

    
# ANIMAL:
    
class Animals(Resource):
    def get(self):
        animals = [animals.to_dict() for animals in Animal.query.all()]

        return animals, 200
    
    def post(self):
        data = request.get_json()

        user = User.query.filter(User.id == session["user_id"]).first()

        new_animal = Animal(
            name=data["name"],
            img=data["img"],
            species=data["species"],
            breed=data["breed"],
            age=data["age"],
            location=data["location"],
            sex=data["sex"],
            currentOwner=user
        )

        user.currentAnimals.append(new_animal)

        db.session.add(new_animal)
        db.session.commit()

        return new_animal.to_dict(), 201
    
    def patch(self):
        data = request.get_json()

        user = User.query.filter(User.id == session["user_id"]).first()
        animal = Animal.query.filter(Animal.id == data).first()

        user.taggedAnimals.append(animal)
        animal.taggedBy.append(user)

        db.session.add(user)
        db.session.add(animal)

        db.session.commit()

# MESSAGES:

class UsersMessages(Resource):
    def get(self):
        messages = Message.query.filter(Message.user_id == session["user_id"]).first()

        return messages.to_dict(), 200
    
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.id == session["user_id"]).first()

        reciever = User.query.filter(User.username == data["reciever"]).first()

        new_message = Message(
            messageTitle=data["messageTitle"],
            messageBody=data["messageBody"],
            sender=user.username
        )

        new_message.reciever = reciever

        db.session.add(new_message)
        db.session.commit()

        return {}, 201

    

api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Users, "/users", endpoint="users")

api.add_resource(UsersTaggedAnimals, "/tagged_animals", endpoint="tagged_animals")
api.add_resource(TaggedAnimalByID, "/tagged_animals/<int:id>", endpoint="tagged_animals_by_id")

api.add_resource(Animals, "/animals", endpoint="animals")

api.add_resource(UsersMessages, "/messages", endpoint="messages")

if __name__ == "__main__":
    app.run(port=5555, debug=True)