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
  afterAll(() => server.stop());
  afterAll(() => mocks.userModel.removeAll());
  afterAll(() => mocks.pet.removeAll());

  describe('Valid Request and Response', () => {
    beforeAll(() => {
      return mocks.reminder.createOne()
        .then(mock => {
          this.mockData = mock;
        });
    });

    it('Should return a status code of 201', () => {
      console.log('scott was here', this.mockData);

      return superagent.post(`${api}/${this.mockData.userId}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send({
          userId: this.mockData.user._id,
          petId: this.mockData.pet._id,
          medication : this.mockData.medication._id,
          frequency : 1,
          startdate : faker.date.recent(),
          enddate : faker.date.future(),
          times: faker.random.number({min:1, max:3}),
          counter : faker.random.number({min:1, max:3}),
        })
        .then(res => {
          expect(res.status).toEqual(201);
        });
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
      return superagent.post(`${api}/${this.mockDataTwo.userId}`)
        .set('Authorization', `Bearer BADTOKEN`)
        .send({
          userId: this.mockDataTwo.user._id,
          petId: this.mockDataTwo.pet._id,
          medication : this.mockDataTwo.medication._id,
          frequency : 1,
          startdate : faker.date.recent(),
          enddate : faker.date.future(),
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