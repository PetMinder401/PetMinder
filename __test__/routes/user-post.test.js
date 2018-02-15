'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/signup`;

describe('POST /api/v1/signup', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => mocks.auth.removeAll());

  describe('Valid Request and Response', () => {
    beforeAll(() => {
      return mocks.auth.createOne()
        .then(mock => {
          this.mockData = mock;
        });
    });

    it('Should return a status code of 201', () => {
      return superagent.post(`${api}`)
    
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: faker.phone.phoneNumber(),
        })
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('Invalid Request and Response', () => {
    beforeAll(() => {
      return mocks.auth.createOne()
        .then(mock => {
          this.mockDataTwo = mock;
        });
    });

    it('Should respond with a status code of 401 when given a bad token', () => {
      return superagent.post(`${api}`)
        .set('Authorization', `Bearer BADTOKEN`)
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: faker.phone.phoneNumber(),
        })
        .catch(res => {
          // console.log('response', res);
          expect(res.status).toBe(401);
        });
    });
  });
});