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
    
# ANIMAL:
    
class Animals(Resource):
    def get(self):
        animals = [animals.to_dict() for animals in Animal.query.all()]

        return animals, 200
    

api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Signup, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")

api.add_resource(Animals, "/animals", endpoint="animals")

if __name__ == "__main__":
    app.run(port=5555, debug=True)