const request = require('supertest');
const faker = require('faker');
const httpMocks = require('node-mocks-http');
const httpStatus = require('http-status');
const app = require('../../src/app');

describe('Location routes', () => {
  describe('POST /v1/location', () => {
    test('should return 201 and successfully create new user if data is ok', async () => {
      const res = await request(app)
        .post('/v1/users')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: false,
      });
    });

    test('should return 400 error if email is invalid', async () => {
      await request(app)
        .post('/v1/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
