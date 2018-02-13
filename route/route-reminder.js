'use strict';

const Alert = require('../model/reminder');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = router => {
  router.route('/reminder/:id?')
    //this is working
    // .post(bearerAuthMiddleware, bodyParser, (req, res) => {
    //   req.body.userId = req.user._id;
    //   return new Alert(req.body).save()
    //     .then(createdAlert => res.status(201).json(createdAlert))
    //     .catch(err => errorHandler(err, res));
    // })

    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      req.body.userId = req.user._id;
      let reminder = new Alert(req.body);
      reminder.generateReminderTimes(req.body.nooftimes)
        .then(newreminder => newreminder.save())
        .then(() => res.sendStatus(201))
        .catch(err => errorHandler(err, res));
    })
    // this is working
    .get(bearerAuthMiddleware, (req, res) => {
      if(req.params.id) {
        return Alert.findById(req.params.id)
          .then(alert => res.status(200).json(alert))
          .catch(err => errorHandler(err, res));
      }
      //this is working
      return Alert.find()
        .then(med => {
          let alertIds = med.map(alert => alert._id);

          res.status(200).json(alertIds);
        })
        .catch(err => errorHandler(err, res));
    })

    .put(bearerAuthMiddleware, bodyParser, (req, res) => {
      Alert.findById(req.params.id)
        .then(alert => {
          if(!alert) return Promise.reject(new Error('Authorization error'));
          return alert.set(req.body).save();        
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })
    //this is working
    .delete(bearerAuthMiddleware, (req, res) => {
      return Alert.findById(req.params.id)
        .then(alert => {
          if(!alert) return Promise.reject(new Error('Path error'));
          return alert.remove();
          
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};