'use strict'

const Pet = require('./pet')
const Reminder = require('./reminder')
const Medication = require('./medication')


const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = mongoose.Schema({
'username' : { type: String, required: true, unique: true},
'password' : { type: String, required: true},
'TokenSeed' : { type: String, unique: true},
'Pets': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'pet'},
}, {timestamps: true})

module.exports = mongoose.model('users', User)