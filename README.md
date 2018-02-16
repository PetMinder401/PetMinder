
<h1 align="center">
  <br>
<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/petminderlogo.png" alt="petminder" width="400">
<br>
</h1>

<h5 align="center">PetMinder: medication reminders for your pet via text message</h5>

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#functionality">Functionality</a> •
  <a href="#route-examples">Route Examples</a> •
  <a href="#data-structure">Data Structure</a> •
  <a href="#tests">Tests</a> •
  <a href="#built-with">Built With</a> •
  <a href="#creators">Creators</a>
</p>

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

<br>

[![Build Status](https://travis-ci.org/PetMinder401/PetMinder.svg?branch=master)](https://travis-ci.org/PetMinder401/PetMinder) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Overview
PetMinder is an application designed to send a text message to remind clients when to administer their pet's medications. Their Veterinary physician can fully set up the reminders for the client when the medication is prescribed. Reminders can be set for monthly medication like heartworm or flea/tick prevention or for daily medications. These reminders will increase the quality of life for both the pet and the owner.


## Getting Started
To use this application as a developer:
* Install [NPM](https://www.npmjs.com/get-npm), [HTTPie](https://httpie.org/) and [MongoDB](https://docs.mongodb.com/manual/administration/install-enterprise/)
* Fork and clone this repository [PetMinder](https://github.com/PetMinder401/PetMinder)
* NPM init your project
* Add .gitignore and .travis.yml files
* Add the following dependencies
```
"dependencies": {
    "bcrypt": "^1.0.3",
    "body-parser": "^1.18.2",
    "cors": "^2.8.4",
    "dotenv": "^5.0.0",
    "express": "^4.16.2",
    "jest": "^22.2.2",
    "jsonwebtoken": "^8.1.1",
    "mongoose": "^5.0.4",
    "node-schedule": "^1.3.0",
    "twilio": "^3.11.3"
  },
  "devDependencies": {
    "faker": "^4.1.0",
    "jest-cli": "^22.2.2",
    "superagent": "^3.8.2"
  }
```
* Add the following .env files

.test.env
```
PORT=4000
MONGODB_URI='mongodb://localhost/petminder'
APP_SECRET='<secret>'
ACCOUNTSID=<account sid>
AUTHTOKEN=<auth token>
```
.env
```
PORT=3000
MONGODB_URI='mongodb://localhost/petminder'
APP_SECRET='<secret>'
ACCOUNTSID=<account sid>
AUTHTOKEN=<auth token>
```
* Start your server using nodemon or npm run start:watch
* Connect to your database using npm run start-db
* Open Mongo in the terminal, if needed.


## Functionality
As a user, I want to be able to sign up with the following required information: username, password, email address, and phone number. A user can securely log in to the app after a successful sign up.

In order to keep track of the pets medication needs, a user will enter relevant information about their pets and the medicine they must take.

After pet and medicine information are entered, a user can then create a reminder for each pet that will notify the user as much as they decide.

With the users phone number that is stored on signup, a user can choose to be notified via text message 1-3 times per day (morning, noon, and evening.)

This app will help ensure owners give their pets the medicine they are supposed to take at the correct time.

## Route Examples

Examples using HTTPie

#### POST:
* Create a User, Pet, Medication or Reminder
  * Add appropriate endpoint: signin, pet, medication, or reminder
  * Add schema requirements
  * Then add bearer authorization

* Create a new User
```
http POST :3000/api/v1/signup username=testuser
email='test@test.com' password=password
phoneNumber=+1555-555-555
```
* Create a new Pet
```
http POST :3000/api/v1/pet/ name=buddy species=dog
age=5 weight=10 'Authorization:Bearer {token}'
```
* Create a new Medication
```
http POST :3000/api/v1/medication name=benedryl dosage=5
'Authorization:Bearer {token}'
```
* Create a new Reminder
```
http POST :3000/api/v1/reminder petId={petId} medication={medicationId}
frequency=1 counter=30 numOfTimes=1 'Authorization:Bearer {token}'
```

#### GET:
* Retrieve a User, Pet, Medication or Reminder
  * Add appropriate endpoint: signin, pet, medication, or reminder
  * Then add the corresponding id for to find one and bearer authorization for each
##### Get All
* Example for how to retrieve all the Users in your database
```
http GET :3000/api/v1/signin 'Authorization:Bearer {token}'
```
* Example for how to retrieve all the Medications in your database
```
http GET :3000/api/v1/medication 'Authorization:Bearer {token}'
```
* Example for how to retrieve all the Pets in your database
```
http GET :3000/api/v1/pet 'Authorization:Bearer {token}'
```
* Example for how to retrieve all the Reminders in your database
```
http GET :3000/api/v1/reminder 'Authorization:Bearer {token}'
```
##### Get One
* Example for how to retrieve a User
```
http -a testuser:password :3000/api/v1/signin 'Authorization:Bearer {token}
```
* Example for how to retrieve a Pet
```
http GET :3000/api/v1/pet petId={petId} 'Authorization:Bearer {token}'
```
* Example for how to retrieve a Medication
```
http GET :3000/api/v1/medication medication={medicationId} 'Authorization:Bearer {token}'
```
* Example for how to retrieve a Reminder
```
http GET :3000/api/v1/reminder reminder={reminderId} 'Authorization:Bearer {token}'
```

#### PUT:
* Update a Pet or Medication
  * Add appropriate endpoint: pet or medication
  * Then add the corresponding id, what you'd like to update and bearer authorization

* Update the weight for a Pet
```
http PUT :3000/api/v1/pet petId={petId} weight=20 'Authorization:Bearer {token}
```
* Update the dosage for a Medication
```
http PUT :3000/api/v1/medication medication={medicationId} dosage=20
'Authorization:Bearer {token}'
```
#### DELETE:
* Delete a Pet, Medication or Reminder
  * Add appropriate endpoint: pet, medication or reminder
  * Then add the corresponding id and bearer authorization

* Delete a Pet
```
http DELETE :3000/api/v1/pet petId={petId} 'Authorization:Bearer {token}
```
* Delete a Medication
```
http DELETE :3000/api/v1/medication medication={medication ID}
'Authorization:Bearer {token}'
```
* Delete a Reminder
```
http DELETE :3000/api/v1/reminder reminder={reminder ID}
'Authorization:Bearer {token}'
```
## Tests
This project uses Travis-CI for continuous integration. Every Pull Request to the master branch is initiated will launch travis, which in turn runs Jest tests. Pull requests are not merged until all travis-ci tests pass.

## Data Flow

This schematic is an overview of the request/response cycle that our app relies on. An http request is sent from a client such as postman or HTTPie then taken as an input by the node server - the request may require middleware if data is being updated or posted, and authorization securely transmits the data. The routes that correspond with our four models have CRUD methods, but not all of them have all four. User only has POST and GET, while reminder has all methods but PUT. The routes call upon the respective models to determine how the request is to be handled. The data stored in the database may be manipulated depending on the nature of the request.
<br>
<h1 align="center">
<br>
<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/data-structure.png" alt="crudflow" width="600">
<br>
</h1>


## Built With

* [Javascript](https://www.javascript.com/)
* [npm](https://www.npmjs.com/)
* [Jest](https://www.npmjs.com/package/jest)
* [Body-parser](https://www.npmjs.com/package/body-parser)
* [Cors](https://www.npmjs.com/package/cors)
* [Express](https://www.npmjs.com/package/express)
* [jsonwebtoken](https://www.npmjs.com/package/json-web-token)
* [Mongoose](http://mongoosejs.com/docs/api.html)
* [Faker](https://www.npmjs.com/package/Faker)
* [Superagent](https://www.npmjs.com/package/superagent)
* [Twilio](https://www.twilio.com/)
* [Node-schedule](https://github.com/node-schedule/node-schedule)

## Creators
The Creators of PetMinder!

<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/roger.jpeg" alt="roger" width="200">
<p>Roger Davenport:</p>

<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/dean.jpg" alt="dean" width="200">
<p>Dean Murphy: Dean is a full-stack developer from Florida, based in Seattle. Having always possessed a love for building computers and gaming, he's come to Code Fellows to take that further and become a developer.</p>

<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/liza.jpg" alt="liza" width="400">
<p>Liza Oh: Liza is a full-stack Javascript developer. Her background in Veterinary medicine, management and photography developed her passion for team building, creativity and problem solving.</p>

<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/joe.jpg" alt="joe" width="400">
<p>Joseph Waine: Joseph is a front-end developer based in Seattle. He loves looking at things and thinking about how situations can be improved.</p>
