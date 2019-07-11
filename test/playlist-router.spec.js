'use strict';
/* global supertest*/

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Playlist Router', ()=> {
  let db;

  const {
    testUsers,
    testPlaylists
  } = helpers.makePlaylistFixtures();

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

  describe('GET /api/playlists', () => {
    beforeEach('get playlists', () =>
      helpers.seedPlaylistTables(
        db,
        testUsers,
        testPlaylists
      )
    );

    it('responds with 200 containing list of playlists', () => {
      const expectedPlaylists = testPlaylists.map(playlist => 
        helpers.makeExpectedPlaylist(
          testUsers,
          playlist
        ));

      return supertest(app)
        .get('/api/playlists')
        .expect(200, expectedPlaylists);
    });
  });
  describe('POST /api/playlists', () => {
    beforeEach('insert playlists', () =>
      helpers.seedPlaylistTables(
        db,
        testUsers,
        testPlaylists
      )
    );

    it('responds with 400 nd missing playlist_id message', () => {
      const testUser = testUsers[0];
      const newPlaylistNoId = {
        energy: '0.50',
        valence: '0.30',
        tempo: null,
        popularity: null,
        user_id: testUser.id
      };

      return supertest(app)
        .post('/api/playlists')
        .send(newPlaylistNoId)
        .expect(400, {error: `Missing 'playlist_id' in request body`});
    });

    it('responds with 400 nd missing user_id message', () => {
      const newPlaylistNoUser = {
        playlist_id: '43291',
        energy: '0.50',
        valence: '0.30',
        tempo: null,
        popularity: null,
      };

      return supertest(app)
        .post('/api/playlists')
        .send(newPlaylistNoUser)
        .expect(400, {error: `Missing 'user_id' in request body`});
    });

    it('responds with 201 containing the created playlist', () => {
      const testUser = testUsers[0];
      const newPlaylist = {
        playlist_id: '43291',
        energy: '0.50',
        valence: '0.30',
        tempo: null,
        popularity: null,
        user_id: testUser.id
      };

      return supertest(app)
        .post('/api/playlists')
        .send(newPlaylist)
        .expect(201)
        .expect(res => {
          expect(res.body.playlist_id).to.eql(newPlaylist.playlist_id);
          expect(res.body.energy).to.eql(newPlaylist.energy);
          expect(res.body.valence).to.eql(newPlaylist.valence);
          expect(res.body.user_id).to.eql(testUser.id);
          expect(res.body.tempo).to.eql(newPlaylist.tempo);
          expect(res.body.popularity).to.eql(newPlaylist.popularity);
          const expectedDate = new Date().toLocaleString();
          const actualDate = new Date(res.body.date_created).toLocaleString();
          expect(actualDate).to.eql(expectedDate);
        })
        .expect(res =>
          db
            .from('windchime_playlists')
            .select('*')
            .where({ playlist_id: res.body.playlist_id })
            .first()
            .then(row => {
              expect(row.playlist_id).to.eql(newPlaylist.playlist_id);
              expect(row.energy).to.eql(newPlaylist.energy);
              expect(row.valence).to.eql(newPlaylist.valence);
              expect(row.user_id).to.eql(testUser.id);
              expect(row.tempo).to.eql(newPlaylist.tempo);
              expect(row.popularity).to.eql(newPlaylist.popularity);
              const expectedDate = new Date().toLocaleString();
              const actualDate = new Date(row.date_created).toLocaleString();
              expect(actualDate).to.eql(expectedDate);
            })
        );
    });
  });
});

