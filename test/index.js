import config from '../config.json';
import http from 'http';
import assert from 'assert';

import '../src/index.js';

describe('Example Base Server', () => {
  it('should return 200', done => {
    http.get(`http://localhost:${config.PORT}`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
