'use strict';

const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/pet`;

describe('PUT /api/v1/pet/:_id?', function() {
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
      console.log('put mock data', this.mockData);
      return superagent.put(`${api}/${this.mockData.pet._id}`)
        .set('Authorization', `Bearer ${this.mockData.user.token}`)
        .send({name: 'sprinkles'})
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`${api}/${this.mockData.pet._id}`)
            .set('Authorization', `Bearer ${this.mockData.user.token}`)
            .then(res => this.updated = res);
        });
    });
    it('Should respond with a status code of 204', () => {
      expect(this.response.status).toBe(204);
    });
    it('Should respond with a valid token', () => {
      expect(Array.isArray(this.updated.body)).toBeTruthy();
    }); 
  });

  describe('Invalid request and response', () => {
    it('Should respond an Authorization Error', () => {
      return superagent.put(`${api}/${this.mockData.pet._id}`)
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