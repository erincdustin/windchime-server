'use strict';

const PlaylistService = {
  getAllPlaylists(db) {
    return db
      .from('windchime_playlists')
      .select('*');
  },

  getById(db, id) {
    return PlaylistService.getAllPlaylists(db)
      .where('user_id', id)
      .first();
  },

  insertPlaylist(db, newPlaylist) {
    return db
      .insert(newPlaylist)
      .into('windchime_playlists')
      .returning('*')
      .then(([playlist]) => playlist);
  },

  serializeUsers(things) {
    return things.map(this.serializeUser);
  },

  serializeUser(user) {

    return {
      id: user.id,
      date_created: new Date(user.date_created)
    };
  },

  serializePlaylists(playlists) {
    return playlists.map(this.serializePlaylist);
  },

  serializePlaylist(playlist) {
    
    return {
      playlist_id: playlist.playlist_id,
      user_id: playlist.user_id,
      energy: playlist.energy,
      valence: playlist.valence,
      tempo: playlist.tempo,
      popularity: playlist.popularity,
      date_created: new Date(playlist.date_created)
    };
  },
};

module.exports = PlaylistService;