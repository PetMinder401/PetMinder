'use strict';

const Pet = require('./pet');
const Reminder = require('./reminder');
const Medication = require('./medication');


const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  'username' : { type: String, required: true, unique: true},
  'password' : { type: String, required: true},
  'tokenSeed' : { type: String, unique: true},
  'Pets': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'pet'},
}, {timestamps: true});


userModel.methods.generatePasswordHash = function(password) {
  if(!password) return Promise.reject(new Error('Authorization failed. Password required.'));

  return bcrypt.hash(password, 10)
    .then(hash => this.password = hash)
    .then(() => this)
    .catch(err => err);
};

userModel.methods.comparePasswordHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(new Error('Authorization failed. Password invalid.'));
      resolve(this);
    });
  });
};

userModel.methods.generateTokenSeed = function() {
  this.tokenSeed = crypto.randomBytes(64).toString('hex');
  return this.save()
    .then(() => Promise.resolve(this.tokenSeed))
    .catch(console.error);
};

userModel.methods.generateToken = function() {
  return this.generatetokenSeed()
    .then(tokenSeed => {
      return jwt.sign({token: tokenSeed}, process.env.APP_SECRET);
    })
    .catch(err => err);
};

module.exports = mongoose.model('userModels', userModel);