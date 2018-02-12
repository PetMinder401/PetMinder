'use strict';

const errorHandler = require('./error-handler');

module.exports = function (req, res, next) {
  let userModelHeader = req.headers.authorization;
  if(!userModelHeader)
    return errorHandler(new Error('Authorization failed. Headers do not match requirements.'), res);

  let base64 = userModelHeader.split('Basic ')[1];
  if(!base64)
    return errorHandler(new Error('Authorization failed. Username and password required'), res);

  let [username, password] = Buffer.from(base64, 'base64').toString().split(':');
  req.userModelHeader = {username, password};

  if(!req.userModelHeader.username)
    return errorHandler(new Error('Authorization failed. Username required'), res);
  if(!req.userModelHeader.password)
    return errorHandler(new Error('Authorization failed. Password required.'), res);

  next();
};