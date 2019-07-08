'use strict';

const express = require('express');
const PlaylistService = require('./playlist-service');

const playlistRouter = express.Router();
const jsonBodyParser = express.json();


playlistRouter
  .route('/')
  .get((req,res,next) => {
    PlaylistService.getAllPlaylists(req.app.get('db'))
      .then(playlists => {
        res.json(PlaylistService.serializePlaylists(playlists));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { playlist_id, user_id } = req.body;
    const newPlaylist = { playlist_id, user_id };

    for (const [key, value] of Object.entries(newPlaylist))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newPlaylist.energy = req.body.energy;
    newPlaylist.valence = req.body.valence;
    newPlaylist.tempo = req.body.tempo;
    newPlaylist.popularity = req.body.popularity;

    PlaylistService.insertPlaylist(
      req.app.get('db'),
      newPlaylist
    )
      .then(playlist => {
        res
          .status(201)
          .json(PlaylistService.serializePlaylist(playlist));
      })
      .catch(next);
  });

module.exports = playlistRouter;