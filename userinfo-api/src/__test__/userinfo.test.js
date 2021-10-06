const app = require('../app');
const  request =require('supertest');
const mongoose = require('mongoose');

describe('Test the health method', () => {
  beforeAll(() => {
    mongoose.connect('mongodb+srv://admin:admin@residentsconnect-cluste.r0t44.mongodb.net/usersinfo?retryWrites=true&w=majority')

  });
  test("It should response the GET method", done => {
    request(app)
      .get("/api/users/health-status")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the GET method", done => {
    request(app)
      .get("/api/users")
      .then(response => {
        expect(response.statusCode).toBe(200);
        
        done();
      });
  });
  afterAll((done) => {
    mongoose.disconnect(done);
  });
})

