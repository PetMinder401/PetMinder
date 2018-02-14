'use strict';

const Pet = require('../../model/pet.js');
require('jest');

describe('User Module', function() {
  let newPet = new Pet();
  describe('Rider schema', () => {
    it('should create a object', () => {
      expect(newPet).toBeInstanceOf(Object);
    });
  });
});