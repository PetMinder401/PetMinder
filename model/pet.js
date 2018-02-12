'use strict'


const User = require('./user')
const Reminder = require('./Reminder')
const Medication = require('./medication')


const mongoose = require('mongoose')

const Pet = mongoose.Schema({
'Name' : { type: String, required: true },
'Species' : { type: String, required: true },
'Age' : { type: Number, required: true },
'Weight' : { type: Number, required: true },
"Reminders": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'reminder'},
}, {timestamps: true})

module.exports = mongoose.model('pets', Pet)