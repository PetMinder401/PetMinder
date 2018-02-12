'use strict';

const errorHandler = require('./error-handler');
const userModel = require('../model/userModel');
const jsonWebToken = require('jsonwebtoken');

const ERROR_MESSAGE = 'Authorization Failed';

module.exports = function (req, res, next){

  let userModelHeader = req.headers.authorization;

  if(!userModelHeader)
    return errorHandler(new Error(ERROR_MESSAGE), res);

  let token = userModelHeader.split('Bearer ')[1];

  if(!token)
    return errorHandler(new Error(ERROR_MESSAGE), res);

  return jsonWebToken.verify(token, process.env.APP_SECRET,(error, decodedValue) => {
    if(error){
      error.message = ERROR_MESSAGE;
      return errorHandler(error, res);
    }

    return userModel.findOne({tokenSeed: decodedValue.token})
      .then (user => {
        if(!user)
          return errorHandler(new Error(ERROR_MESSAGE), res);
        req.user = user;
        next();
      })
      .catch(error=> errorHandler(error,res));
  });
};