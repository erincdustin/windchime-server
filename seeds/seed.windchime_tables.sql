BEGIN;

TRUNCATE
  windchime_playlists,
  windchime_users
  RESTART IDENTITY CASCADE;

INSERT INTO windchime_users (id)
VALUES
  ('1219850180');

INSERT INTO windchime_playlists (playlist_id, user_id, energy, valence, tempo, popularity)
VALUES
  ('0zFcCHJA9TuXRgLQxwa4WF', '1219850180', .3 , .4, null, null),
  ('7qj1bfaSutvfu8QEMxeAqr', '1219850180', .8 , .8, null, 20);

COMMIT;
  