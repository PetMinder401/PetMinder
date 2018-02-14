
'use strict';

const schedule = require('node-schedule');
require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const userModel = require('../model/userModel');
const pet = require('../model/pet');
const medication = require('../model/medication');
const reminder = require('../model/reminder');
let testArray = [];
const errorHandler = require('../lib/error-handler');

module.exports = function (newreminder) {
  
  var greetingName;
  var petName;
  var meds;
  var times;
  var phoneNumber;
  




  // console.log('new reminder in schedulejob', newreminder);
  medication.findById(newreminder.medication, (err, data) => {
    if (err) console.error(err);
    meds = data.name;
  })
    .then(() =>  pet.findById(newreminder.petId, (err, data) => {
      if (err) console.error(err);
      petName = data.name;
    }))
    .then(() => userModel.findById(newreminder.userId, (err, data) => {
      if (err) console.error(err);
      greetingName = data.username;
      phoneNumber = data.phoneNumber;
    })
      .then(() => {
        console.log('meds', meds);
        console.log('petName', petName);
        console.log('greetingName', greetingName);
        console.log('phonenumber', userCell)
        console.log('times', newreminder.times);
      }));

};
