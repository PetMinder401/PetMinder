'use strict';

const Medication = require('../../model/medication.js');
require('jest');

describe('Medicatioin Module', function() {
  let newMed = new Medication();
  describe('Rider schema', () => {
    it('should create a object', () => {
      expect(newMed).toBeInstanceOf(Object);
    });
  });
});