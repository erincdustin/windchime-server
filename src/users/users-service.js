'use strict';

// const xss = require('xss');
// const Treeize = require('treeize');

const UserService = {
  getAllUsers(db) {
    return db
      .from('windchime_users')
      .select('*');
  },

  getById(db, id) {
    return UserService.getAllUsers(db)
      .where('id', id)
      .first();
  },

  // getReviewsForThing(db, thing_id) {
  //   return db
  //     .from('thingful_reviews AS rev')
  //     .select(
  //       'rev.id',
  //       'rev.rating',
  //       'rev.text',
  //       'rev.date_created',
  //       ...userFields,
  //     )
  //     .where('rev.thing_id', thing_id)
  //     .leftJoin(
  //       'thingful_users AS usr',
  //       'rev.user_id',
  //       'usr.id',
  //     )
  //     .groupBy('rev.id', 'usr.id')
  // },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('windchime_users')
      .returning('*')
      .then(([user]) => user);
  },

  serializeUsers(users) {
    return users.map(this.serializeUser);
  },

  serializeUser(user) {

    return {
      id: user.id,
      date_created: new Date(user.date_created)
    };
  },

  // serializePlaylists(playlists) {
  //   return playlists.map(this.serializePlaylist);
  // },

  // serializePlaylist(playlist) {
    
  //   return {
  //     playlist_id: playlist.playlist_id,
  //     user_id: playlist.user_id,
  //     energy: playlist.energy,
  //     valence: playlist.valence,
  //     tempo: playlist.tempo,
  //     popularity: playlist.popularity,
  //     date_created: new Date(playlist.date_created)
  //   };
  // },
};

// const userFields = [
//   'usr.id AS user:id',
//   'usr.date_created AS user:date_created',
// ];

module.exports = UserService;