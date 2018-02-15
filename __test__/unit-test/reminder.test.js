'use strict';

const Reminder = require('../../model/reminder.js');
require('jest');


describe('Reminder Module', function() {
  let newReminder = new Reminder();
  describe('Reminder schema', () => {
    it('should create a object', () => {
      expect(newReminder).toBeInstanceOf(Object);
    });
    it('should have a property of start date', () =>{
      expect(newReminder).toHaveProperty('startdate');
    });
    
    it('should should fail of no numOfTimes passed to generate generateReminderTimes ', () =>{
      return newReminder.generateReminderTimes()
        .catch(response => {
          expect(response.message).toMatch(/Authorization failed in reminder js no number/);
        });
    });
  });

});