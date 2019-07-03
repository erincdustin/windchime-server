CREATE TABLE windchime_playlists (
  playlist_id TEXT PRIMARY KEY NOT NULL,
  energy DECIMAL(3,1),
  valence DECIMAL(3,1),
  tempo DECIMAL(3,1),
  popularity INTEGER,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);
