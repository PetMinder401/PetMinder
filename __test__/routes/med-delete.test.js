'use strict';

const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/medication`;


describe('DELETE /api/v1/medication/:id?', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => mocks.userModel.removeAll());
  afterAll(() => mocks.medication.removeAll());

  describe('Valid delete', () => {
    beforeAll(() => {
      return mocks.medication.createOne()
        .then(mock => {
          this.mockData = mock;
        });
    });

    beforeAll(() => {
      return superagent.del(`${api}/${this.mockData.medication._id}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`${api}/${this.mockData.medication._id}`)
            .set('Authorization', `Bearer ${this.mockData.user.token}`)
            .then(res => this.updated = res);
        });
    });
    it('Should respond with a status code of 204', () => {
      expect(this.response.status).toBe(204);
    });
  });

  describe('Invalid request and response', () => {
    it('Should respond an Authorization Error', () => {
      return superagent.del(`${api}/${this.mockData.medication._id}`)
        .catch(err => {
          this.error = err;
          expect(err.response.text).toMatch(/Authorization/);
        });
    });
    it('Should respond a 401 bad path when given an incorrect path', () => {
      expect(this.error.status).toBe(401);
    });
  });
});

