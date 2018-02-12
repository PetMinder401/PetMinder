'use strict';

const Reminder = require('./reminder');

const mongoose = require('mongoose');

const Pet = mongoose.Schema({
  Name : { type: String, required: true },
  Species : { type: String, required: true },
  Age : { type: Number, required: true },
  Weight : { type: Number, required: true },
  Reminders: {type: mongoose.Schema.Types.ObjectId, ref: 'reminder'},
}, {timestamps: true});

module.exports = mongoose.model('pets', Pet);