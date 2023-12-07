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

        user1 = User(
            username=fake.user_name(),
            accountType="looking"
        )
        user1.password_hash = user1.username + "salty"
        users.append(user1)


        #Animal Seed:
        print("Seeding animals...")
        animals = []

        animal1 = Animal(
            name="Moose",
            species="Dog",
            breed="McNab",
            age=7,
            location="Mammoth Lakes, CA",
            sex="M"
        )
        animals.append(animal1)

        #Message Seed:
        print("Seeding messages...")
        messages = []

        message1 = Message(
            messageBody="Hello!",
            sender="alfa121212"
        )

        messages.append(message1)

        #Post Seed:
        print("Seeding posts...")
        posts = []

        post1 = Post(
            title="Looking for new home",
            postBody="Looking for a new home for this sweet pup!"
        )

        posts.append(post1)

        db.session.add_all(users, animals, messages, posts)
        db.session.commit()

        print("Seeding Complete!")
