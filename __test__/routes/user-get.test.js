'use strict';

const faker = require('faker');
const mocks = require('../lib/mocks');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

let port = process.env.PORT;
let api = `:${port}/api/v1`;

describe('GET /api/v1/signin', () => {
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => mocks.userModel.removeAll());
  
  this.mockData = { username: faker.internet.userName(), password: faker.internet.password(), email: faker.internet.email(), phoneNumber: faker.phone.phoneNumber() };
  this.invalid = { username: faker.internet.userName(), email: faker.internet.email() };
 
  describe('Valid Request and Response', () => {
    
    beforeAll(() => {
      return superagent.post(`${api}/signup`)
        .send(this.mockData)
        .then(res => this.response = res);
    });

    beforeAll(() => {
      return superagent.get(`${api}/signin`)
        .auth(this.mockData.username, this.mockData.password)
        .then(res => this.response = res);
    });

    it('Should respond with a status code of 201', () => {
      expect(this.response.status).toBe(200);
    });
  });

  describe('Invalid request and response', () => {
    it('Should respond with an authentication when not provided a token', () => {
      return superagent.get(`${api}/signin`)
        .catch(err => {
          this.error = err;
          expect(err.response.text).toMatch(/Authorization/);
        });
    });
    it('Should respond a 401 bad path when not given a path', () => {
      expect(this.error.status).toBe(401);
    });
  });
});