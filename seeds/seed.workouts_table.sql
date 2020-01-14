TRUNCATE
    workouts,
    one_more_users
    RESTART IDENTITY CASCADE;

INSERT INTO one_more_users (user_name, full_name, password)
VALUES
  ('dunder', 'Dunder Mifflin', '$2a$12$u0piEGpxTzUYRhYsv4LWUeWY3Cyj6UO5aUj1c5bN8Kh6tPIK/LwNK'),
  ('b.deboop', 'Bodeep Deboop','$2a$12$u0piEGpxTzUYRhYsv4LWUeWY3Cyj6UO5aUj1c5bN8Kh6tPIK/LwNK'),
  ('c.bloggs', 'Charlie Bloggs','$2a$12$u0piEGpxTzUYRhYsv4LWUeWY3Cyj6UO5aUj1c5bN8Kh6tPIK/LwNK'),
  ('s.smith', 'Sam Smith', '$2a$12$u0piEGpxTzUYRhYsv4LWUeWY3Cyj6UO5aUj1c5bN8Kh6tPIK/LwNK');

INSERT INTO workouts (title, workout1,lbs,set1,set2,set3, user_id) 
VALUES 
(
    'Lats',
    'seated cable rows',
    160,
    8,
    8,
    8,
    1
),
(
    'Biceps',
    'dumbell curls',
    35,
    12,
    12,
    12,
    2
),
(
    'lower back',
    'good mornings',
    40,
    8,
    8,
    8,
    3
),
(
    'legs',
    'lunges',
    60,
    12,
    12,
    12,
    4
);

