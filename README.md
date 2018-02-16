
<h1 align="center">
  <br>
<img src="https://github.com/PetMinder401/PetMinder/blob/dev_test/images/petminderlogo.png" alt="petminder" width="400">
<br>
</h1>

<h5 align="center">PetMinder is a service to help you remember when to give medication to your pets via text message</h5>

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#functionality">Functionality</a> •
  <a href="#route-examples">Route Examples</a> •
  <a href="#data-structure">Data Structure</a> •
  <a href="#tests">Tests</a> •
  <a href="#credit">Credits</a> •
  <a href="#creators">Creators</a>
</p>

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)


## Getting Started

When you set up your PetMinder account to get started you will first want to put in your pets information (name, species, age, weight.) And then you may set up reminders for your pets by choosing the medication and setting how often the medication must be taken and for how many days.

The app will text or e-mail you the reminders 1-3 times a day depending on how often it must be taken and will stop sending reminders once your pet has been sent it's final reminder.

To get started with this app, first fork the clone the repo to your machine. Having ```HTTPie``` or ```Postman``` installed are recommended to run routing functionality. Once cloned navigate inside of the PetMinder folder to continue. Once in the PetMinder folder type ```npm i``` to install all dependencies needed to run the app. When done you should have the following dependencies:

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

## Functionality

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
<br>

#### GET:
* Retrieve a User, Pet, Medication or Reminder
  * Add appropriate endpoint: signin, pet, medication, or reminder
  * Then add the corresponding id for to find one and bearer authorization for each
##### Get All
* Example for how to retrieve all the pets in your database
```
http GET :3000/api/v1/pet 'Authorization:Bearer {token}'
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

## Data Structure


## Tests


## Credits


## Creators
