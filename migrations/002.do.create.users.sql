CREATE TABLE one_more_users (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT now(),
    date_modifided TIMESTAMP
);

ALTER TABLE workouts
    ADD COLUMN
      user_id INTEGER REFERENCES one_more_users(id)
      ON DELETE SET NULL;