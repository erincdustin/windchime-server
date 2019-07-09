'use strict';
/* global supertest*/

const app = require('../src/app');

describe.only('App', ()=> {
  describe('GET /', () => {
    it('responds with 200 containing "Hello World"', () => {
      return supertest(app)
        .get('/')
        .expect(200, 'Hello, world');
    });
  });
  
  describe('GET /api/weather', () => {
    it('responds with 200 and weather results', () => {
      const postalCode = JSON.stringify({'postalCode': '34292'});
      return supertest(app)
        .post('/api/weather')
        .send(postalCode)
        .expect(200);
    });
  });

});

