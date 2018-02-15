'use strict';

const schedulejob = require('../../lib/schedulejob.js');
require('jest');

describe('Schedule Job Module', function() {
  describe('', () => {
    it('should return new Error with No new reminder', () => {
      return schedulejob()
        .catch(err => {
          this.error = err;
          expect(err.message).toMatch(/No new reminder/);
        });
    });
  });
});