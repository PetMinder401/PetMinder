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
      return superagent.post(`${api}`)
        .send(this.mockData)
        .then(res => this.response = res)
        .then(() => {
          return superagent.put(`${api}/${this.mockData.pet._id}`)
            .set('Authorization', `Bearer ${this.mockData.user.token}`)
            .send({name: 'sprinkles'})
            .then(res => this.sent = res);   
        });
    });
  
    it('Should respond with a status code of 204', () => {
      console.log('put mock token', this.mockData.user.token);
      // return superagent.get(`${api}/${this.mockData.pet._id}`)
      //   .set('Authorization', `Bearer ${this.mockData.user.token}`)
      //   .then(res => {
      //     expect(res.status).toBe(204);
        });
    });
  });
});