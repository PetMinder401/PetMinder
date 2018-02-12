'use strict';

const server = require('../../lib/server');
require('jest');

describe('Server Unit Test', () => {
  beforeEach(server.start);
  afterEach(server.stop);

  it('should return a promise rejection if the server is already running when started', () => {
    server.start()
      .catch(err => expect(err.message).toMatch(/Server Running/i));
  });
  //TODO: Fix this so it doesn't hang - liza
  // it('should return a promise rejection if the server is not currently running', () => {
  //   server.stop()
  //     .then(server.stop)
  //     .catch(err => expect(err.message).toMatch(/Server Error/i));
  // });
});