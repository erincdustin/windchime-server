ALTER TABLE windchime_playlists
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS windchime_users;