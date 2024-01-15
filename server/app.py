from flask import request, session
from flask_restful import Resource

from config import app, db, api
from models import User, Message, Animal, Post

@app.route("/")
def index():
    return "<h1>Project Server</h1>"

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
        
        return {"error": "422 Uprocessable Entity"}
    

api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Signup, "/signup", endpoint="signup")

if __name__ == "__main__":
    app.run(port=5555, debug=True)