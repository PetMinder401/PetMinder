'use strict';

const Med = require('../model/medication');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/medication/:id?')
    // this is working
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {

      req.body.userId = req.user._id;

      return new Med(req.body).save()
        .then(createdMed => res.status(201).json(createdMed))
        .catch(err => errorHandler(err, res));
    })
    // this is working
    .get(bearerAuthMiddleware, (req, res) => {
      if(req.params._id) {
        return Med.findById(req.params._id)
          .then(med => res.status(200).json(med))
          .catch(err => errorHandler(err, res));
      }

      return Med.find()
        .then(med => {
          let medIds = med.map(med => med._id);

          res.status(200).json(medIds);
        })
        .catch(err => errorHandler(err, res));
    })
  // this works
    .put(bearerAuthMiddleware, bodyParser, (req, res) => {
      Med.findById(req.params.id)
        .then(med => {
          if(!med) return Promise.reject(new Error('objectid failed'));
          return med.set(req.body).save();
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
  // this works
    .delete(bearerAuthMiddleware, (req, res) => {
      
      return Med.findById(req.params.id)
        .then(Med => {
          
          if(Med._id.toString() === req.params.id.toString())
            return Med.remove();
          Promise.reject(new Error('objectid failed'));
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};