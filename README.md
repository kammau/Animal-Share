# phase-5-project

## What Is Petify?
Petify is a interactive full stack project taht incorporates languages and technologys such as python3, flask-sqlalchemy, react, js, and redux. This web application is for pet owners looking to re-home their pets more easily and effeciently. It also allows people that may be looking for a new companion to be able to look into adopting a pet in an easier fasion without being overwhelming.

## Setup
To begin setup, fork and clone this repository and head over to it's directory in your terminal. To install the dependencies for the front end, in the /client directory type `npm install`. After that is complete, open a new termial in this repos main directory and enter the pipenv virtual environment by typing `pipenv shell`. Head over to the /server directory and type `python seed.py`, to begin seeding the database. Once that has completed you can lauch the backend by typing `python app.py`. Back in your original terminal window type `npm start` in the /client directory to lauch the front end. You are now ready to use this web application!

## Login and Signup
On opening this web application, you will be brought to the Signup page. You can toggle between the Login page and Signup page with the two buttons at the bottom of the form. To Login or Signup type in a username and password, which will be stored in the database for future logins.

## Animals
Selecting Animals in the NavBar will take you to the Animals page. You should see two animal cards rendered with the seed data. To tag an animal click on the tag icon this will store the animal in your Tagged Animals section for later. To message an animals current owner press the message icon to fill out and send a mesage. 

### Search Animals
If you want to narrow your animal search down, you can do so by selecting the select box next to the search bar and selecting a specific search filter. The search filters go by breed, age, species, and sex. After selecting a filter, you can then use the search bar to enter a specifc attribute. For example, if I had the species filter on I may type Cat to find all the cat animals. If a filter is not selected, the search will automaticalaly default to breed.

### New Animal
You can also add your own animal to this collection by pressing the `+` button in the right hand corner. You will be directed to fill out specifc information about your animal, such as name, age, species, etc. It should be noted that location is optional. Pressing the `Add` button in the right bottom corner will add the animal to the database.

## Tagged Animals
Selecting the Tagged Animals option in the NavBar will take you to the Tagged Animals page. This page shows all of the animals you have tagged to look at later. You can delete the animal from your tag's by pressing the `x` button. You can also message the animal's current owner by pressing the message icon and filling out the respective information.

## Messages
Chooseing the Messages option in the NavBar will take you to your messages. You can create a new message by pressing the `+` icon on the right. You will be required to enter a message title, message body, and whom to send the message to. The message will be sent after pressing "Send". If you have any messages, they will appear with a reply and trash icon. To reply, press the reply button and enter your reply message. To delete the message press the trash icon.

## Posts