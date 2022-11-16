CREATE DATABASE android_api;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(100),
    password VARCHAR(30),
    CONSTRAINT email UNIQUE (email)
);

INSERT INTO users (name, email, password)
    VALUES ('Joe', 'joe@gmail.com', '123456'),
    ('Ryan', 'ryan@gmail.com', 'secret');

SELECT * FROM users;