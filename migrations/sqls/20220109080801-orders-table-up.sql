/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    status VARCHAR(40),
    FOREIGN KEY(user_id) REFERENCES users(id)
);