from random import randint, choice as rc

from faker import Faker

from config import app, db
from models import User, Message, Animal, Post, user_animal, animal_post

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        db.session.query(animal_post).delete()
        db.session.query(user_animal).delete()
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
            img="https://rawznaturalpetfood.com/wp-content/uploads/tuxedo-cats.jpg",
            species="Cat",
            breed="Tuxedo",
            age=7,
            location="San Diego, CA",
            sex="M",
            bio="Moose has been with my family for over 5 years but we have recently lost our home and are in need of a new loving one for him! He is very energetic and always ready for an adventure. He is healthy and knows how to walk with leash."
        )
        animal1.currentOwner = user1

        animals.append(animal1)

        animal2 = Animal(
            name="Cera",
            img="https://lh3.googleusercontent.com/pw/ABLVV86s-I6o8Pu3-iijYFn238BTkmV0bu853OBA-eKymxwgoj5Pw4-kW8RTJV5rbJ00s7nBV0FnhYJ6ne6tNzaua64O_oXD3TcbgH1pokkYU3eDpFaaXszdyC6LPksmUKjrrTfZYADbwPeaoyYoUS9ZriY5Bw=w567-h756-s-no-gm?authuser=0",
            species="Dog",
            breed="Scotch Collie",
            age=8,
            location="Riverside, CA",
            sex="F",
            bio="Cera is an amazing pup and her previous owner just passed. She does have a lot of health issues, but with medicine she should live a long happy life!"
        )
        animal2.currentOwner = user1

        animals.append(animal2)

        db.session.add_all(animals)

        #Message Seed:
        print("Seeding messages...")
        messages = []

        message1 = Message(
            messageBody="Hello!",
            sender="purple85555",
            messageTitle="Greetings!"
        )
        message1.reciever = user1

        messages.append(message1)

        db.session.add_all(messages)

        #Post Seed:
        print("Seeding posts...")
        posts = []

        post1 = Post(
            title="Moose needs a new home!",
            postBody="Looking for a new home for this sweet kitty!",
            imgOne="https://rawznaturalpetfood.com/wp-content/uploads/tuxedo-cats.jpg",
            imgTwo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtbKuCIz3gNgbmILS03gMPNcZVPiNU2QNIw&usqp=CAU",
            imgThree="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhjDvW5YBNNJgdxqp-Vjq8FQELTDy0SQSLsg&usqp=CAU",
            numOfAnimals=1
        )
        post1.user = user1

        posts.append(post1)

        db.session.add_all(posts)

        # Many-to-Many's:
        post1.animals.append(animal1)

        user1.taggedAnimals.append(animal1)
        user1.taggedAnimals.append(animal2)

        db.session.commit()

        print("Seeding Complete!")
