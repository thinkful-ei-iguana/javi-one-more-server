TRUNCATE
    workouts,
    one_more_users
    RESTART IDENTITY CASCADE;

INSERT INTO one_more_users (user_name, full_name, password)
VALUES
  ('dunder', 'Dunder Mifflin', '123'),
  ('b.deboop', 'Bodeep Deboop','123'),
  ('c.bloggs', 'Charlie Bloggs','123'),
  ('s.smith', 'Sam Smith', '123');

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

