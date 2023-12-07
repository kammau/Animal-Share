from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Message, Animal, Post, animal_post

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.session.query(animal_post).delete()
        User.query.delete()
        Message.query.delete()
        Animal.query.delete()
        Post.query.delete()

        #User Seed:
        print("Seeding users...")

        users = []
        user1 = User()


        #Animal Seed:
        print("Seeding animals...")

        animals = []

        #Message Seed:
        print("Seeding messages...")

        messages = []

        #Post Seed:
        print("Seeding posts...")

        posts = []
