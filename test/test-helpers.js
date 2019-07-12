'use strict';

function makeUsersArray() {
  return [
    {
      id: '1',
      date_created: '2029-01-22T21:28:32.615Z',
    },
    {
      id: '2',
      date_created: '2029-01-22T21:28:32.615Z',
    },
    {
      id: '3',
      date_created: '2029-01-22T21:28:32.615Z',
    },
    {
      id: '4',
      date_created: '2029-01-22T21:28:32.615Z',
    },
  ]
}

function makePlaylistArray(users) {
  return [
    {
      playlist_id: '1234',
      energy: '0.55',
      valence: '0.45',
      tempo: null,
      popularity: null,
      date_created: '2029-01-22T21:28:32.615Z',
      user_id: users[0].id,
      },
    {
      playlist_id: '1235',
      energy: '0.60',
      valence: '0.70',
      tempo: '0.80',
      popularity: 10,
      date_created: '2029-01-22T21:28:32.615Z',
      user_id: users[0].id,
      },
    {
      playlist_id: '1236',
      energy: '0.55',
      valence: null,
      tempo: '0.55',
      popularity: 30,
      date_created: '2029-01-22T21:28:32.615Z',
      user_id: users[1].id,
      },
    {
      playlist_id: '1237',
      energy: null,
      valence: null,
      tempo: null,
      popularity: null,
      date_created: '2029-01-22T21:28:32.615Z',
      user_id: users[2].id,
      },
  ]
}

function makeExpectedPlaylist(users, playlist) {
  const user = users
    .find(user => user.id === playlist.user_id)

  return {
    playlist_id: playlist.playlist_id,
    energy: playlist.energy,
    valence: playlist.valence,
    tempo: playlist.tempo,
    popularity: playlist.popularity,
    date_created: playlist.date_created,
    user_id: user.id
  }
}

function makeExpectedUser(user) {
  return {
    id: user.id,
    date_created: user.date_created,
  }
}

function makePlaylistFixtures() {
  const testUsers = makeUsersArray()
  const testPlaylists = makePlaylistArray(testUsers)
  return { testUsers, testPlaylists }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      windchime_playlists,
      windchime_users
      RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  return db.into('windchime_users').insert(users)
}

function seedPlaylistTables(db, users, playlists) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('windchime_playlists').insert(playlists)
  })
}

module.exports = {
  makeUsersArray,
  makePlaylistArray,
  makeExpectedPlaylist,
  makeExpectedUser,

  makePlaylistFixtures,
  cleanTables,
  seedPlaylistTables,
  seedUsers
}