'use strict'


const Pet = require('./pet')
const User = require('./user')
const Reminder = require('./reminder')


const mongoose = require('mongoose')

const Medication = mongoose.Schema({
'Name' : {type: String, required: true }
'Dosage' : {type: Number, required: true }
}, {timestamps: true})

module.exports = mongoose.model('medications', Medication)