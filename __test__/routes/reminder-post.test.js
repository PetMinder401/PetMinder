'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/reminder`;

describe('POST /api/v1/reminder', function() {
  beforeAll(() => server.start());
  afterAll(() => mocks.userModel.removeAll());
  afterAll(() => mocks.reminder.removeAll());
  afterAll(() => server.stop());

  describe('Valid Request and Response', () => {
    beforeAll(() => {
      return mocks.reminder.createOne()
        .then(mock => {
          this.mockData = mock;
        });
    });

    it('Should return a status code of 201', () => {
      // console.log('dean was here', this.mockData);

      return superagent.post(`${api}`)
        .set('Authorization', `Bearer ${this.mockData.pet.user.token}`)
        .send({
          userId: this.mockData.pet.pet.userId,
          petId: this.mockData.pet.pet._id,
          medication: this.mockData.med._id,
          frequency: 1,
          numOfTimes: faker.random.number({min:1, max:3}),
          counter: faker.random.number({min:1, max:3}),
        })
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });
    it('Should return a valid reminder object', () => {
      expect(this.mockData.reminder).toHaveProperty('startdate');
      expect(this.mockData.reminder).toHaveProperty('enddate');
      expect(this.mockData.reminder).toHaveProperty('frequency');
    });
  });

  describe('Invalid Request and Response', () => {
    beforeAll(() => {
      return mocks.reminder.createOne()
        .then(mock => {
          this.mockDataTwo = mock;
        });
    });

    it('Should respond with a status code of 401 when given a bad token', () => {
      return superagent.post(`${api}/${this.mockDataTwo.pet.userId}`)
        .set('Authorization', `Bearer BADTOKEN`)
        .send({
          userId: this.mockDataTwo.pet.userId,
          petId: this.mockDataTwo.pet._id,
          medication : this.mockDataTwo.medication,
          frequency : 1,
          startdate : this.mockDataTwo.startdate,
          enddate : this.mockDataTwo.enddate,
          times: faker.random.number({min:1, max:3}),
          counter : faker.random.number({min:1, max:3}),
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(401);
        });
    });
  });
});