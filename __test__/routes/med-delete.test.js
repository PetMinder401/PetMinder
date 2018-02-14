'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1/medication`;


describe('POST /api/v1/medication/:id?', function() {
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
});







