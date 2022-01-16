# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: GET: /products
- Show: /products/:id == body parameters (id NUMBER)
- Create [token required]: /products/:id == body parameters (id NUMBER)
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]: GET: /users
- Show [token required]: GET: /users/:id == body parameters (id NUMBER)
- Create N[token required]: POST: /users == body parameters (first_name STRING, last_name STRING, password STRING)

#### Orders

- Current Order by user (args: user id)[token required]: GET: /orders/:id == body parameters (id NUMBER)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

- ### Products schema
- id SERIAL PRIMARY KEY
- name VARCHAR(255)
- price INTEGER

#### User

- id
- firstName
- lastName
- password

- ### Users schema
- id SERIAL PRIMARY KEY
- firstName VARCHAR(255)
- lastName VARCHAR(255)
- password VARCHAR(255)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Splitted into 2 tables:
orders:

- id SERIAL PRIMARY KEY
- user_id INTEGER

order_products:

- order_id BIGINT,
- product_id BIGINT,
- quantity INTEGER,
- FOREIGN KEY(order_id) REFERENCES orders(id),
- FOREIGN KEY(product_id) REFERENCES products(id),
- PRIMARY KEY(order_id, product_id)
