/* Replace with your SQL commands */
CREATE TABLE orders(
    id INT SERIAL PRIMARY,
    user_id INT,
    status VARCHAR(40),
    FOREIGN KEY(user_id) REFERENCES users(id)
);