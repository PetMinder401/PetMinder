'use strict';

const UserModel = require('../../model/userModel.js');
require('jest');

describe('User Module', function() {
  let newUser = new UserModel();
  describe('Rider schema', () => {
    it('should create a object', () => {
      expect(newUser).toBeInstanceOf(Object);
    });
  });
});