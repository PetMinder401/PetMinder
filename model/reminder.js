'use strict';

const mongoose = require('mongoose');

const Reminder = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userModel'},
  petId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'pet'},
  medication : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'medication'},
  frequency : Number,
  counter : Number,
}, {timestamps: true});

module.exports = mongoose.model('reminder', Reminder);