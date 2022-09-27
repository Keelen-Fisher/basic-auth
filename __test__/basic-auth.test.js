'use strict';

const { default: test } = require('node:test');
const basicAuth = require('../src/auth/middleware/basic');

// let user = {
//   username: 'testing',
//   password: 'Password123',
// };


describe('Basic Auth Middleware Tests', () => {

  test('testing /signin route if it fails appropriatelty', () => {
    let req = {
      headers: {
        authorization: 'Basic Password that is not it',
      },
    };
    let res = {};
    let next = jest.fn();

    basicAuth(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith('Not Authorized');
      });

  });
  test('passes appropriately', () => {
    let req = {
      headers: {
        authorization: 'Basic dGVzdDpwYXNz',
      },
    };
    let res = {};
    let next = jest.fn();

    basicAuth(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });
  });

});