# Animal Share
[Video Demo Link](https://youtu.be/EO8meVOSSrY)

## What Is Animal Share?
Animal Share is an interactive full-stack project that incorporates languages and technologies such as python3, flask-sqlalchemy, react, js, and redux. This web application is for pet owners looking to re-home their pets more easily and efficiently. It also allows people who may be looking for a new companion to be able to in an easier fashion without being overwhelmed.

## Setup
To begin setup, fork, and clone this repository and head over to its directory in your terminal. To install the dependencies for the front end, in the `/client` directory type `npm install`. After that is complete, open a new terminal in this repos main directory and enter the pipenv virtual environment by typing `pipenv shell`. Head over to the `/server` directory and type `python seed.py`, to begin seeding the database. Once that has been completed you can launch the backend by typing `python app.py`. Back in your original terminal window type `npm start` in the `/client` directory to launch the front end. You are now ready to use this web application!

## Login and Signup
On opening this web application, you will be brought to the Signup page. You can toggle between the Login page and the Signup page with the two buttons at the bottom of the form. To Login or Signup type in a username and password, which will be stored in the database for future logins.

## Animals
Selecting Animals in the NavBar will take you to the Animals page. You should see two animal cards rendered with the seed data. To tag an animal click on the tag icon this will store the animal in your Tagged Animals section for later. To message an animal's current owner press the message icon to fill out and send a message. To find more information about the animal, press the More button. This will take you to that animal-specific page where you can find their bio, information card, and any posts they may appear in.

### Search Animals
If you want to narrow your animal search down, you can do so by using the select box next to the search bar and selecting a specific search filter. The search filters go by breed, age, species, and sex. After selecting a filter, you can then use the search bar to enter a specific attribute. For example, if I had the species filter on I may type Cat to find all the cat animals. If a filter is not selected, the search will automatically default to breed.

### New Animal
You can also add your own animal to this collection by pressing the `+` button in the right-hand corner. You will be directed to fill out specific information about your animal, such as name, age, species, etc. It should be noted that location is optional. Pressing the `Add` button in the right bottom corner will add the animal to the database.

## Tagged Animals
Selecting the Tagged Animals option in the NavBar will take you to the Tagged Animals page. This page shows all of the animals you have tagged to look at later. You can delete the animal from your tags by pressing the `x` button. You can also message the animal's current owner by pressing the message icon and filling out the respective information.

## Messages
Choosing the Messages option in the NavBar will take you to your messages. You can create a new message by pressing the `+` icon on the right. You will be required to enter a message title, message body, and whom to send the message to. The message will be sent after pressing `Send`. If you have any messages, they will appear with a reply and trash icon. To reply, press the reply button and enter your message. To delete the message press the trash icon.

## Posts
The Post page is where users can post information, updates, etc, on their animal or animals. To tag an animal mentioned in the post, press the tag icon associated with the card. To message the poster, click the message icon and fill out the respective information. If the poster created the post with multiple images you can click through them by pressing the arrow next to the post image. To create a new post click the `+` button on the right and fill out the respective information, images two and three are optional. To keep things simple a user is recommended to post only three animals at a time, but can post more if desired.

## My Account
The My Account page allows users to look at their animals and posts, as well as edit and delete them. 

### My Posts
To look at your posts click the `POSTS` tab on the `My Account` page. To Edit a post, click the edit icon, and edit the field you would like to change. To delete the post simply press the delete icon.

### My Animals
To look at your animals click the `ANIMALS` tab. To Edit an animal, click the edit icon, and change the field you would like. To delete an animal press the trash icon.

## Logout
To log out of the application, press the `>` icon in the NavBar at the far right.
