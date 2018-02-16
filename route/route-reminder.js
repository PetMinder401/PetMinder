'use strict';

const Alert = require('../model/reminder');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const scheduleJob = require('../lib/schedulejob');
const schedule = require('node-schedule');
require('dotenv').config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);
const jobsArray = [];

exports.jobs = jobsArray;

module.exports = router => {
  router.route('/reminder/:id?')
   
    .post(bearerAuthMiddleware, bodyParser, (req, res) => {
      req.body.userId = req.user._id;
      let reminder = new Alert(req.body);

      reminder.generateReminderTimes(req.body.numOfTimes)
        .then(() => reminder.createEndDate())
        .then(newreminder => {
          newreminder.save();
          if(process.env.STATUS === 'production') {
            scheduleJob(newreminder)
              .then(reminderObject => {
                jobsArray.push(reminderObject);
              });
          } 
        })
        .then(() => {
          res.sendStatus(201);
        })
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