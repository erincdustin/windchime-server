CREATE TABLE windchime_users (
  id TEXT PRIMARY KEY NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE windchime_playlists
  ADD COLUMN
    user_id TEXT REFERENCES windchime_users(id)
    ON DELETE SET NULL;