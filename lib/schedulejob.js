
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
var rule = new schedule.RecurrenceRule();
var textContent = {};


module.exports = function (newreminder) {
  
  var greetingName;
  var petName;
  var meds;
  var times;
  var phoneNumber;
  
  


  
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
        textContent.to = phoneNumber;
        textContent.from = '+12062073458';
        textContent.body = `Hi ${greetingName}, this is a reminder that ${petName} needs their ${meds}`;
        if(newreminder.times === 1) rule.hour = 7;
        if(newreminder.times === 2) rule.hour = [7, 17];
        if(newreminder.times === 3) rule.hour = [7,12,17];
        if(newreminder.frequency === 30) rule.date = newreminder.startdate.getDate();
        if(rule.date === 29 || rule.date === 30 || rule.date === 31) rule.date = 28;
        rule.start = newreminder.startdate;
        rule.end = newreminder.enddate;
        console.log('rule in schedulejob', rule);
        console.log('text content',textContent);

        

      }));
      
    };
    
    // console.log('meds', meds);
    // console.log('petName', petName);
    // console.log('greetingName', greetingName);
    // console.log('phonenumber', phoneNumber);
    // console.log('times', newreminder.times);