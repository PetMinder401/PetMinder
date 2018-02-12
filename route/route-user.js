'use strict';

const User = require('../model/userModel');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const basicAuth = require('../lib/basic-auth-middleware');

module.exports = function(router) {
  router.post('/signup', bodyParser, (req, res) => {
    let pw = req.body.password;
    delete req.body.password;

    let user = new User(req.body);

    user.generateTokenSeed(pw)
      .then(newUser => newUser.save())
      .then(userRes => userRes.generateToken())
      .then(token => res.status(201).json(token))
      .catch(err => errorHandler(err, res));
  });

  router.get('/signin', basicAuth, (req, res) => {
    
    User.findOne({ username: req.userModelHeader.username })
      .then(user => 
        user
<<<<<<< HEAD
          ? user.compareTokenSeed(req.user.password)
=======
          ? user.comparePasswordHash(req.userModelHeader.password)
>>>>>>> 0f996bc9888720911a9b4a548c1d750b13cd20e1
          : Promise.reject(new Error('Authorization Failed. Username required.'))
      )
      .then(user => user.generateToken())
      .then(token => res.status(200).json(token))
      .catch(err => errorHandler(err, res));
  });
};