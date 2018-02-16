'use strict';

const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/pet`;

describe('GET /api/v1/pets', function() {
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

    beforeAll(() => {
      return superagent.get(`${api}/${this.mockData.pet._id}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .then(res => this.response = res);
    });

    it('Should respond with a status code of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('Should respond with a valid token', () => {
      expect(Array.isArray(this.response.body)).toBeTruthy();
    });
  });

  describe('Invalid request and response', () => {
    it('Should respond a not found or path error when given an incorrect path', () => {
      return superagent.get(`${api}`)
        .catch(err => {
          this.error = err;
          expect(err.response.text).toMatch(/Authorization/);
        });
    });
    it('Should respond a 401 bad path when given an incorrect path', () => {
      expect(this.error.status).toBe(401);
    });
    it('Should respond an object id error Error', () => {
      return superagent.get(`${api}/66666666666`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .catch(err => {
          this.error = err;
          expect(err.response.text).toMatch(/CastError/);
        });
      
    });
  });
});