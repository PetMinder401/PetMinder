'use strict';

const mongoose = require('mongoose');

const Reminder = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'},
  petId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'pet'},
  medication : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'medication'},
  frequency : Number,
  startdate :{type: Date, default: Date.now() },
  // enddate : {type: Date, default: Date.now() + this.frequency*this.counter*24*60*60*1000},
  times: [],
  counter : Number,
}, {timestamps: true});


//create method to set start date
Reminder.methods.generateReminderTimes = function(numberOfReminders) {
  return new Promise((resolve, reject) => {
    console.log('nooftimes',numberOfReminders);
    
    if(!numberOfReminders) return reject(new Error('Authorization failed'));

    if (numberOfReminders === '1') this.times.push('0 7 * * *');
    if (numberOfReminders === '2') {
      console.log('inside 2 value push');
      this.times.push('0 7 * * *');
      this.times.push('0 17 * * *');
    }
    if (numberOfReminders === '3') {
      console.log('inside 3 value');
      this.times.push('0 7 * * *');
      this.times.push('30 12 * * *');
      this.times.push('0 17 * * *');
    }
    resolve(this);



  });
  
};
// create method to set end date
// create method to set times of day for reminders ie how many 1, 2 or 3.










module.exports = mongoose.model('reminder', Reminder);