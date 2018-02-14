
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
const errorHandler = require('../lib/error-handler');



module.exports = function (newreminder) {
  return new Promise((resolve, reject) => {
    if(!newreminder) return reject(new Error('No newreminder'));
  
    var greetingName;
    var petName;
    var meds;
    var times;
    var phoneNumber;
    var rule = new schedule.RecurrenceRule();
    let textContent = {};
  
  
    medication.findById(newreminder.medication, (err, data) => {
      if (err) console.error(err);
      textContent.meds = data.name;
    })
      .then(() =>  pet.findById(newreminder.petId, (err, data) => {
        if (err) console.error(err);
        textContent.petName = data.name;
      }))
      .then(() => userModel.findById(newreminder.userId, (err, data) => {
        if (err) console.error(err);
        greetingName = data.username;
        phoneNumber = data.phoneNumber;
        console.log('data.phoneNumber', data.phoneNumber);
        
      }))
      .then(() => {
        console.log('in last then');

        textContent.to = phoneNumber;
        textContent.from = '+12062073458';
        textContent.body = `Hi ${greetingName}, this is a reminder that ${petName} needs their ${meds}`;
        if(newreminder.times === 1) rule.minute = [57,59];
        if(newreminder.times === 2) rule.hour = [7, 17];
        // if(newreminder.times === 3) rule.hour = [7,12,17];
        if(newreminder.times === 3) rule.minute =[58,2];

        if(newreminder.frequency === 30) rule.date = newreminder.startdate.getDate();
        if(rule.date === 29 || rule.date === 30 || rule.date === 31) rule.date = 28;
        rule.start = newreminder.startdate;
        rule.end = newreminder.enddate;
        console.log('content', textContent);

        let j = schedule.scheduleJob(rule, function() {
          
          client.messages
            .create(textContent)
            .then((message) => console.log(message.sid));
          
        }); 
        console.log('j in schedulejob', j);
        return resolve(j);       

      });
  







  });
  // .catch(err => errorHandler(err, res));
      
};
    
