'use strict';

const mongoose = require('mongoose');

const Pet = mongoose.Schema({
  name : { type: String, required: true },
  species : { type: String, required: true },
  age : { type: Number, required: true },
  weight : { type: Number, required: true },
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
  // Reminders: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'reminder'},
}, {timestamps: true});

module.exports = mongoose.model('pet', Pet);