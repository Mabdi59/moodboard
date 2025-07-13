BEGIN TRANSACTION;

INSERT INTO users (username, email, password_hash, role)
VALUES
    ('user', 'user@example.com',  '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'ROLE_USER'),
    ('admin', 'admin@example.com', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'ROLE_ADMIN');

INSERT INTO mood_entry (user_id, mood, note, entry_date)
VALUES
    (1, 'Happy', 'Felt amazing after a solid flight lesson.', CURRENT_DATE),
    (1, 'Neutral', 'Just a normal day, nothing much happened.', CURRENT_DATE - INTERVAL '1 day'),
    (1, 'Sad', 'Weather canceled the flight... again.', CURRENT_DATE - INTERVAL '2 day');

COMMIT TRANSACTION;
