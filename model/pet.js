'use strict';

const Reminder = require('./reminder');

const mongoose = require('mongoose');

const Pet = mongoose.Schema({
<<<<<<< HEAD
  Name : { type: String, required: true },
  Species : { type: String, required: true },
  Age : { type: Number, required: true },
  Weight : { type: Number, required: true },
  Reminders: {type: mongoose.Schema.Types.ObjectId, ref: 'reminder'},
=======
  name : { type: String, required: true },
  species : { type: String, required: true },
  age : { type: Number, required: true },
  weight : { type: Number, required: true },
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
  // Reminders: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'reminder'},
>>>>>>> 0f996bc9888720911a9b4a548c1d750b13cd20e1
}, {timestamps: true});

module.exports = mongoose.model('pet', Pet);