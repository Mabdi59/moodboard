BEGIN TRANSACTION;

DROP TABLE IF EXISTS mood_entry;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) UNIQUE,
                       password_hash VARCHAR(200) NOT NULL,
                       role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mood_entry (
                            entry_id SERIAL PRIMARY KEY,
                            user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                            mood VARCHAR(20) NOT NULL,
                            note TEXT,
                            entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT TRANSACTION;
