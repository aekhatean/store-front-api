/* Replace with your SQL commands */
CREATE TABLE users(
    id INT SERIAL PRIMARY,
    username VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    password VARCHAR(255)
);