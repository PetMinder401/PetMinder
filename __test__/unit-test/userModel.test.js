'use strict';

const UserModel = require('../../model/userModel.js');
require('jest');

describe('User Module', function() {
  let newUser = new UserModel();
  describe('userModel schema', () => {
    it('should create a object', () => {
      expect(newUser).toBeInstanceOf(Object);
    });
    it('should have a property of username', () =>{
      expect(newUser).toHaveProperty('username');
    });
    it('should have a property of email', () => {
      expect(newUser).toHaveProperty('email');
    })
    
    it('should should fail if no password passed to generatePasswordHash ', () =>{
      return newUser.generatePasswordHash()
        .catch(response => {
          expect(response.message).toMatch(/Authorization failed\. Password required\./);
        });
    });
    it('should should fail if no password password to comparePasswordHash', () =>{
      return newUser.comparePasswordHash()
        .catch(response => {
          expect(response.message).toMatch(/data and hash arguments required/);
        });
    });
  });

});