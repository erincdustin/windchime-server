'use strict';
/* global supertest*/

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('User Router', ()=> {
  let db;

  const { testUsers } = helpers.makePlaylistFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/users', () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers
      )
    );

    it('responds with 200 containing list of users', () => {
      const expectedUsers = testUsers.map(user => 
        helpers.makeExpectedUser(
          user
        ));

      return supertest(app)
        .get('/api/users')
        .expect(200, expectedUsers);
    });
  });

  describe('POST /api/users', () => {
    beforeEach('insert users', () =>
      helpers.seedUsers(
        db,
        testUsers
      )
    );

    it('responds with 400 and error message', () => {
      const newUser = {
      };

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(400, { error: 'Missing ID in request body' });
    });

    it('responds with 201 containing the created user', () => {
      const newUser = {
        id: '123456ABC'
      };

      return supertest(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect(res => {
          expect(res.body.id).to.eql(newUser.id);
          const expectedDate = new Date().toLocaleString();
          const actualDate = new Date(res.body.date_created).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect(res =>
          db
            .from('windchime_users')
            .select('*')
            .where({ playlist_id: res.body.playlist_id })
            .first()
            .then(row => {
              expect(row.id).to.eql(newUser.id);
              const expectedDate = new Date().toLocaleString();
              const actualDate = new Date(row.date_created).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });
  });
});
