'use strict';

const Reminder = require('../../model/reminder.js');
require('jest');

describe('User Module', function() {
  let newReminder = new Reminder();
  describe('Rider schema', () => {
    it('should create a object', () => {
      expect(newReminder).toBeInstanceOf(Object);
    });
  });
});