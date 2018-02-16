'use strict';

const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/reminder`;

describe('GET /api/v1/reminder', function() {
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
      return superagent.get(`${api}/${this.mockData.reminder._id}`)
        .set('Authorization', `Bearer ${this.mockData.pet.user.token}`)
        .then(res => this.response = res);
    });

    it('Should respond with a status code of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('Should respond with a valid reminder object', () => {
      expect(this.response.body).toBeTruthy();
    });
  });

  describe('Invalid request and response', () => {
    beforeAll(() => {
      return mocks.reminder.createOne()
        .then(mock => {
          this.mockDataTwo = mock;
        });
    });

    it('Should respond with an authorization error when not given a token', () => {
      return superagent.get(`${api}`)
        .catch(err => {
          this.error = err;
          expect(err.response.text).toMatch(/Authorization/);
        });
    });
    it('Should respond a 401 bad path when given an incorrect path', () => {
      expect(this.error.status).toBe(401);
    });
    // it('Should respond with an objectid error if provided an invalid ID', () => {
    //   return superagent.get(`${api}/4832820`)
    //     .set('Authorization', `Bearer ${this.mockData.pet.user.token}`)
    //     .catch(err => {
    //       this.error = err;
    //       console.log('reminder get err', err);
    //       expect(err.text).toMatch(/not found/);
    //     });
    // });
  });
});