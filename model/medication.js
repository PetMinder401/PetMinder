'use strict';

const mongoose = require('mongoose');

const Medication = mongoose.Schema({
  name : {type: String, required: true },
  dosage : {type: Number, required: true },
}, {timestamps: true});

module.exports = mongoose.model('medications', Medication);