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

        testingUser = User.query.filter(User.username == username).first()
        
        if bool(testingUser) == True:
            return {}, 409

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
    

class UserAccount(Resource):
    def get(self):
        user = User.query.filter(User.id == session["user_id"]).first()

        return user.to_dict(), 200


# TAGGED ANIMALS:

class UsersTaggedAnimals(Resource):
    def get(self):
        user = User.query.filter(User.id == session["user_id"]).first()
        taggedAnimals = [taggedAnimals.to_dict() for taggedAnimals in user.taggedAnimals]
        
        if bool(taggedAnimals) == False:
            return {}, 204
        else:
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
        animals = [animal.to_dict() for animal in Animal.query.all()]

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
            bio=data["bio"],
            currentOwner = user
        )
        
        user.currentAnimals.append(new_animal)

        db.session.add(new_animal)
        db.session.commit()

        return new_animal.to_dict(), 201
    


class AnimalById(Resource):
    def patch(self, id):
        animal = Animal.query.filter(Animal.id == id).first()
        user = User.query.filter(User.id == session["user_id"]).first()

        user.taggedAnimals.append(animal)
        animal.taggedBy.append(user)

        db.session.add(user)
        db.session.add(animal)

        db.session.commit()

        return {}, 202
        

# MESSAGES:

class UsersMessages(Resource):
    def get(self):
        messages = Message.query.filter(Message.user_id == session["user_id"]).all()

        if bool(messages) == False:
            return {}, 204
        else:
            messages_serialized = [message.to_dict() for message in messages]
            return messages_serialized, 200
    
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
        new_message.user_id = reciever.id

        db.session.add(new_message)
        db.session.commit()

        return {}, 201

class MessageByID(Resource):
    def delete(self, id):
        messageToDelete = Message.query.filter(Message.id == id).first()
        
        db.session.delete(messageToDelete)
        db.session.commit()

        return {}, 204


# POSTS:

class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]

        return posts, 200
    
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.id == session["user_id"]).first()
        animals_list = data["animals"]
        

        new_post = Post(
            title=data["title"],
            postBody=data["postBody"],
            imgOne=data["imgOne"],
            imgTwo=data["imgTwo"],
            imgThree=data["imgThree"],
            numOfAnimals=data["numOfAnimals"],
            user_id=session["user_id"],
        )

        new_post.user = user

        db.session.add(new_post)
        db.session.commit()

        for animal in animals_list:
            a = Animal.query.filter(Animal.name == animal["name"]).first()
            new_post.animals.append(a)

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict(), 201
    

# MY ACCOUNT:
    
class UserPosts(Resource):
    def get(self):
        user = User.query.filter(User.id == session["user_id"]).first()
        posts = Post.query.filter(Post.user == user).all()

        posts_serialized = [post.to_dict() for post in posts]

        if bool(posts_serialized) == False:
            return {}, 204
        else:
            return posts_serialized, 200
        
class PostById(Resource):
    def patch(self, id):
        data = request.get_json()
        post = Post.query.filter(Post.id == id).first()
        animals_list = data["animals"]

        post.title=data["title"]
        post.postBody=data["postBody"]
        post.imgOne=data["imgOne"]
        post.imgTwo=data["imgTwo"]
        post.imgThree=data["imgThree"]
        post.numOfAnimals=data["numOfAnimals"]
        post.animals = []

        db.session.add(post)
        db.session.commit()

        for animal in animals_list:
            a = Animal.query.filter(Animal.id == animal["id"]).first()
            post.animals.append(a)

        db.session.add(post)
        db.session.commit()

        return post.to_dict(), 202
    
    def delete(self, id):
        post = Post.query.filter(Post.id == id).first()

        db.session.delete(post)
        db.session.commit()

        return {}, 204
        
class AnimalById(Resource):
    def get(self, id):
        animal = Animal.query.filter(Animal.id == id).first()

        return animal.to_dict(), 200

    def patch(self, id):
        animal = Animal.query.filter(Animal.id == id).first()
        user = User.query.filter(User.id == session["user_id"]).first()

        animal.taggedBy.append(user)

        db.session.add(animal)
        db.session.commit()

        return animal.to_dict(), 200
    
    def delete(self, id):
        animal = Animal.query.filter(Animal.id == id).first()

        db.session.delete(animal)
        db.session.commit()

        return {}, 202

    
class UserAnimals(Resource):
    def get(self):
        user = User.query.filter(User.id == session["user_id"]).first()
        animals = Animal.query.filter(Animal.currentOwner == user).all()

        animals_serialized = [animal.to_dict() for animal in animals]

        if bool(animals_serialized) == False:
            return {}, 204
        else:
            return animals_serialized, 200
        
class UserAnimalById(Resource):
    def patch(self, id):
        data = request.get_json()
        animal = Animal.query.filter(Animal.id == id).first()

        for attr in data:
            setattr(animal, attr, data[attr])
        
        db.session.add(animal)
        db.session.commit()

        return animal.to_dict(), 202
    
    def delete(self, id):
        animal = Animal.query.filter(Animal.id == id).first()

        db.session.delete(animal)
        db.session.commit()

        return {}, 202



api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(Users, "/users", endpoint="users")

api.add_resource(UserAccount, "/my_account", endpoint="my_account")
api.add_resource(UserPosts, "/my_account/posts", endpoint="my_account_posts")
api.add_resource(UserAnimals, "/my_account/animals", endpoint="my_account_animals")

api.add_resource(UserAnimalById, "/my_account/animals/<int:id>", endpoint="my_account_animal_update")
api.add_resource(PostById, "/my_account/posts/<int:id>", endpoint="my_account_post_by_id")

api.add_resource(UsersTaggedAnimals, "/tagged_animals", endpoint="tagged_animals")
api.add_resource(TaggedAnimalByID, "/tagged_animals/<int:id>", endpoint="tagged_animals_by_id")

api.add_resource(Animals, "/animals", endpoint="animals")
api.add_resource(AnimalById, "/animals/<int:id>", endpoint="animals_by_id")

api.add_resource(UsersMessages, "/messages", endpoint="messages")
api.add_resource(MessageByID, "/messages/<int:id>", endpoint="message_by_id")

api.add_resource(Posts, "/posts", endpoint="posts")

if __name__ == "__main__":
    app.run(port=5555, debug=True)