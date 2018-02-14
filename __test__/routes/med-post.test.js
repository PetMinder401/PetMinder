'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/medication`;


describe('POST /api/v1/medication', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => mocks.userModel.removeAll());
  afterAll(() => mocks.medication.removeAll());

  describe('Request and Response Validation', () => {
    beforeAll(() => {
      return mocks.medication.createOne()
        .then(mock => {
          this.mockData = mock;
        });
    });

    it('Should return a status code of 201', () => {
      return superagent.post(`${api}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send({
          name: faker.internet.userName(),
          dosage: faker.random.number({min:1, max:3}),
          userId: this.mockData.user.user._id
        })
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });

    it('Should return an authorization error status code of 401', () => {
      return superagent.post(`${api}`)
        .set('Authorization', `Bearer shit`)
        .send({
          name: faker.internet.userName(),
          dosage: faker.random.number({min:1, max:3}),
          userId: this.mockData.user.user._id
        })
        .then(res => {
          expect(res.status).toEqual(401);
        })
        .catch(err => expect(err.status).toEqual(401));
    });

    it('Should return a status code of - validation error 400', () => {
      return superagent.post(`${api}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send()
        .catch(err => expect(err.status).toEqual(400));
    });


  });





});








