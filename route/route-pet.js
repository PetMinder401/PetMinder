'use strict';

const Pet = require('../model/pet');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/pet/:id?')
  // this is working
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      // console.log(req.headers);
      req.body.userId = req.user._id;
      return new Pet(req.body).save()
        .then(createdPet => res.status(201).json(createdPet))
        .catch(err => errorHandler(err, res));
    })
  // this is working
    .get(bearerAuthMiddleware, (req, res) => {
      if(req.params._id) {
        return Pet.findById(req.params._id)
          .then(pet => res.status(200).json(pet))
          .catch(err => errorHandler(err, res));
      }

      return Pet.find()
        .then(pet => {
          let petIds = pet.map(pet => pet._id);

          res.status(200).json(petIds);
        })
        .catch(err => errorHandler(err, res));
    })
  //this is working 
    .put(bearerAuthMiddleware, bodyParser, (req, res) => {

      Pet.findById(req.params.id)
        .then(pet => {
          if(!pet) return Promise.reject(new Error('Authorization error'));
          return pet.set(req.body).save();        
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
  //  this is working
    .delete(bearerAuthMiddleware, (req, res) => {
      return Pet.findById(req.params.id)
        .then(pet => {
          if(pet.userId.toString() === req.user._id.toString())
            return pet.remove();
          return errorHandler(new Error(ERROR_MESSAGE), res);
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};