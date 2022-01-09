/* Replace with your SQL commands */
CREATE TABLE order_products(
    order_id BIGINT,
    product_id BIGINT,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    PRIMARY KEY(order_id, product_id)
);