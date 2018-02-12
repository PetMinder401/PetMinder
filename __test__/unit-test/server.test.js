'use strict';

const server = require('../../lib/server');
require('jest');

describe('Server Unit Test', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  it('should return a promise rejection if the server is already running when started', () => {
    server.start()
      .catch(err => expect(err.message).toMatch(/Server Running/i));
  });
  it('should return a promise rejection if the server is not currently running', () => {
    server.stop()
      .then(server.stop)
      .catch(err => expect(err.message).toMatch(/Server Error/i));
  });
});