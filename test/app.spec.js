'use strict';
/* global supertest*/

const app = require('../src/app');

describe('App', ()=> {  
  describe('POST /api/weather', () => {
    it('responds with 200 and weather results', () => {
      const postalCode = { 'postalCode': '34292' };
      return supertest(app)
        .post('/api/weather')
        .send(postalCode)
        .expect(200);
    });

    it('responds with 500', () => {
      return supertest(app)
        .post('/api/weather')
        .send()
        .expect(500, { error: 'Internal server error'} );
    });
  });

});

