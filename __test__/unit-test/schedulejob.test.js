'use strict';
const mocks = require('../lib/mocks');
const scheduleJob = require('../../lib/schedulejob');
const server = require('../../lib/server');
const schedule  =require('node-schedule');
require('jest');


describe('Schedule Job', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => mocks.reminder.removeAll());

  beforeAll(() => {
   
    return mocks.reminder.createOne()
      .then(data => {
        this.reminder = data.reminder;    
      });
  }
  );
  it('Should schedule a job with required properties', () =>{
    return scheduleJob(this.reminder)
      .then(objectBack =>{
        expect(objectBack).toHaveProperty('callback');
        expect(objectBack).toHaveProperty('cancelNext');
        objectBack.cancel();
      });
      

    // expect(true).toBeTruthy();
  });





});