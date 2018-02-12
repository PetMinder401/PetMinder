'use strict';



const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  username : { type: String, required: true, unique: true},
  email : { type: String, required: true, unique: true},
  password : { type: String, required: true},
  tokenSeed : { type: String, unique: true},
<<<<<<< HEAD
  Pets: {type: mongoose.Schema.Types.ObjectId, ref: 'pet'},
=======
>>>>>>> 0f996bc9888720911a9b4a548c1d750b13cd20e1
}, {timestamps: true});

// This hashes the password and stores it in hashed form
userModel.methods.generatePasswordHash = function(password) {
  if(!password) return Promise.reject(new Error('Authorization failed. Password required.'));

  return bcrypt.hash(password, 10)
    .then(hash => this.password = hash)
    .then(() => this)
    .catch(err => err);
};
<<<<<<< HEAD

userModel.methods.compareTokenSeed = function(password) {
=======
//this takes the password from the request and hashes it to compare to hased password
userModel.methods.comparePasswordHash = function(password) {
>>>>>>> 0f996bc9888720911a9b4a548c1d750b13cd20e1
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(err);
      if(!valid) return reject(new Error('Authorization failed. Password invalid.'));
      resolve(this);
    });
  });
};
// generates the token seed to create user tokens
userModel.methods.generateTokenSeed = function() {
  this.tokenSeed = crypto.randomBytes(64).toString('hex');
  return this.save()
    .then(() => Promise.resolve(this.tokenSeed))
    .catch(console.error);
};
// generates a token to send back to the client
userModel.methods.generateToken = function() {
  return this.generateTokenSeed()
    .then(tokenSeed => {
      return jwt.sign({token: tokenSeed}, process.env.APP_SECRET);
    })
    .catch(err => err);
};

module.exports = mongoose.model('userModel', userModel);