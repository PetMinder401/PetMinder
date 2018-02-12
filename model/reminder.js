'use strict'


const Pet = require('./pet')
const User = require('./user')
const Medication = require('./medication')



const mongoose = require('mongoose')

const Reminder = mongoose.Schema({
'reminder' : Boolean,
"Medications": {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'medication'},
'Frequency' : Number,
'Counter' : Number,
'Time' : Mixed
}, {timestamps: true})

module.exports = mongoose.model('reminders', Reminder)