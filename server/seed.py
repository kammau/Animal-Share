from random import randint, choice as rc

from faker import Faker

from config import app, db
from models import User, Message, Animal, Post

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # db.session.query(animal_post).delete()
        User.query.delete()
        Message.query.delete()
        Animal.query.delete()
        Post.query.delete()

        #User Seed:
        print("Seeding users...")
        users = []

        user1 = User(
            username=fake.user_name(),
            accountType="looking",
        )
        user1.password_hash = user1.username + "salty"
        users.append(user1)

        db.session.add_all(users)


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
        animal1.currentOwner = user1

        animals.append(animal1)

        db.session.add_all(animals)

        #Message Seed:
        print("Seeding messages...")
        messages = []

        message1 = Message(
            messageBody="Hello!",
            sender="purple85555"
        )
        message1.reciever = user1

        messages.append(message1)

        db.session.add_all(messages)

        #Post Seed:
        print("Seeding posts...")
        posts = []

        post1 = Post(
            title="Looking for new home",
            postBody="Looking for a new home for this sweet pup!"
        )
        post1.user = user1

        posts.append(post1)

        db.session.add_all(posts)

        db.session.commit()

        print("Seeding Complete!")
