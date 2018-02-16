'use strict';

const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/reminder`;

describe('DELETE /api/v1/reminder', function() {
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

    beforeAll(() => {
      return superagent.del(`${api}/${this.mockData.reminder._id}`)
        .set('Authorization', `Bearer ${this.mockData.pet.user.token}`)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`${api}/${this.mockData.reminder._id}`)
            .set('Authorization', `Bearer ${this.mockData.pet.user.token}`)
            .then(res => this.updated = res);
        });
    });
    it('Should respond with a status code of 204', () => {
      expect(this.response.status).toBe(204);
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
    it('Should respond with a cast error Error', () => {
      return superagent.del(`${api}/66666666666`)
        .set('Authorization', `Bearer ${this.mockData.pet.user.token}`)
        .catch(err => {
          this.error = err;
          expect(err.response.text).toMatch(/CastError/);
        });
      
    });
  });
});