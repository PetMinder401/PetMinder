'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/pet`;

describe('POST /api/v1/pets', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => mocks.userModel.removeAll());
  afterAll(() => mocks.pet.removeAll());

  describe('Valid Request and Response', () => {
    beforeAll(() => {
      return mocks.pet.createOne()
        .then(mock => {
          this.mockData = mock;
        });
    });

    it('Should return a status code of 201', () => {
      // console.log('scott was here', this.mockData);

      return superagent.post(`${api}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send({
          name: faker.name.firstName(),
          species: faker.random.words(1),
          age: faker.random.number({min:1, max:15}),
          weight: faker.random.number({min:5, max:100}), 
          userId: this.mockData.user.user._id,
        })
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('Invalid Request and Response', () => {
    beforeAll(() => {
      return mocks.pet.createOne()
        .then(mock => {
          this.mockDataTwo = mock;
        });
    });

    it('Should respond with a status code of 401 when given a bad token', () => {
      return superagent.post(`${api}`)
        .set('Authorization', `Bearer BADTOKEN`)
        .send({
          name: faker.name.firstName(),
          species: faker.random.words(1),
          age: faker.random.number({min:1, max:15}),
          weight: faker.random.number({min:5, max:100}), 
          userId: this.mockDataTwo.user.user._id,
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(401);
        });
    });
    it('Should respond with a status code of 401 when given a bad token', () => {
      return superagent.post(`${api}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send({
          weight: faker.random.number({min:5, max:100}), 
          userId: this.mockDataTwo.user.user._id,
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });
  });
});