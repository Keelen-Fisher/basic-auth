'use strict';
const { server } = require('../src/server.js');
const supertest = require('supertest');
const { describe } = require('yargs');
const mockRequest = supertest(server);

describe('Testing Auth', () => {
  test('allows user to signup with a POST to /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'testing',
      password: 'Password123',
    });

    console.log('Response Body', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('testing');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('Password123');
  });
});