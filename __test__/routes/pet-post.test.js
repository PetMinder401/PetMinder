'use strict';

const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('dotenv').config({path: `${__dirname}/../lib/.test.env`});

describe('POST /api/v1/pets', function() {
  beforeAll(server.start);
  beforeAll(mocks.userModel.createOne().then(data => this.mockUser = data));
  afterAll(() => server.stop);
  afterAll(mocks.userModel.removeAll);
  afterAll(mocks.pet.removeAll);

  describe('Valid Request and Response', function() {
    it.only('Should return a status code of 201', () => {
      let petMock = null;
      return mocks.pet.createOne()
        .then(mocks => {
          petMock = mocks;
          return superagent.post(`${process.env.PORT}/api/v1/pet/`)
            .set('Authorization', `Bearer ${mocks.token}`)
            .send({petMock});
        })
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('species');
          expect(res.body).toHaveProperty('age');
          expect(res.body).toHaveProperty('weight');
        });
    });
  });

  describe('Invalid Request and Response', function() {
    it('Should return a status code of 401 when given a bad token', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/pet`)
        .set('Authorization', `Bearer TORITORITORI`)
        .catch(err => expect(err.status).toEqual(401));
    });
    it('Should return a status code of 404 when given a bad body', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/pet`)
        .set('Authorzation', `Bearer ${mocks.token}`)
        .send({})
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});