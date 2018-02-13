'use strict';

const Alert = require('../model/reminder');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/reminder/:id?')
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {

      req.body.userId = req.user._id;

      return new Alert(req.body).save()
        .then(createdAlert => res.status(201).json(createdAlert))
        .catch(err => errorHandler(err, res));
    })

    .get(bearerAuthMiddleware, (req, res) => {
      if(req.params._id) {
        return Alert.findById(req.params._id)
          .then(alert => res.status(200).json(alert))
          .catch(err => errorHandler(err, res));
      }

      return Alert.find()
        .then(med => {
          let alertIds = med.map(alert => alert._id);

          res.status(200).json(alertIds);
        })
        .catch(err => errorHandler(err, res));
    })

    .put(bearerAuthMiddleware, bodyParser, (req, res) => {
      Alert.findById(req.params.id, req.body)
        .then(alert => {
          if(alert.user.id === req.user._id) {
            alert.frequency = req.body.frequency || alert.frequency;
            alert.counter = req.body.counter || alert.counter;
            return Alert.save();
          }
          return new Error('validation');
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete(bearerAuthMiddleware, (req, res) => {
      return Alert.findById(req.params.id)
        .then(alert => {
          if(alert.userId.toString() === req.user._id.toString())
            return alert.remove();
          return errorHandler(new Error(ERROR_MESSAGE), res);
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};