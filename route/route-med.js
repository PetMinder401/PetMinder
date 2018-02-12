'use strict';

const Med = require('../model/medication');
const bodyParser = require('body-parser');
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/medication/:id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {

      req.body.userId = req.user._id;

      return new Med(req.body).save()
        .then(createdMed => res.status(201).json(createdMed))
        .catch(err => errorHandler(err, res));
    })

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

    .put(bearerAuthMiddleware, bodyParser, (req, res) => {
      Med.findById(req.params.id, req.body)
        .then(med => {
          if(med.user.id === req.user._id) {
            med.name = req.body.name || med.name;
            med.dosage = req.body.species || med.dosage;
            return Med.save();
          }
          if(req.body.name === undefined || req.body.dosage === undefined) {
            throw new Error('validation');
          }
          return new Error('validation');
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete(bearerAuthMiddleware, (req, res) => {
      return Med.findById(req.params.id)
        .then(med => {
          if(med.userId.toString() === req.user._id.toString())
            return med.remove();
          return errorHandler(new Error(ERROR_MESSAGE), res);
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};