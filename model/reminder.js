'use strict';

const mongoose = require('mongoose');

const Reminder = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'},
  petId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'pet'},
  medication : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'medication'},
  frequency : Number,
  startdate :{type: Date, default: Date.now() },
  enddate : {type: Date, default: Date.now()},
  times: Number,
  counter : Number,
}, {timestamps: true});


//create method to set start date
Reminder.methods.generateReminderTimes = function(numberOfReminders) {
  return new Promise((resolve, reject) => {
    if(!numberOfReminders) return reject(new Error('Authorization failed in reminder js no number'));

    if (numberOfReminders === '1') this.times = 1;
    if (numberOfReminders === '2') this.times = 2;
    if (numberOfReminders === '3') this.times = 3;
     
    resolve(this);
  });
};
Reminder.methods.createEndDate = function () {
  return new Promise((resolve, reject) => {
   
    
    if(!this.frequency || !this.counter) return reject(new Error('Authorization failed in reminder.js no freq or counter'));
    let milliseconds = Date.now();
    milliseconds =  milliseconds + (this.frequency*this.counter*24*60*60*1000);
    this.enddate = new Date(milliseconds);
    resolve(this);
  });
};

module.exports = mongoose.model('reminder', Reminder);