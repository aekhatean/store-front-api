# Image Processing API

An api for store-front, where you can perform CRUD operaions on users, products, and orders.

## Description

This API utilizes express.js, Jasmine js testing framework and node file system.

## Getting Started

### Dependencies

- This program requires node.js
- it also uses multible node dependencies, such as:
  - Express.js
  - TypeScrips
  - Jasmine
  - Supertest
  - Eslint
  - Prettier
  - Sharp
  - nodemon
  - pg
  - db-migrate
  - jsonwebtoken (JWT)
  - bcrypt

### Installing

To use this API on your local machine, follow these steps:

- Run the following command in your terminal to clone this repo:

```
git clone https://github.com/aekhatean/store-front-api.git
```

- After this repo is cloned to your device, enter the project directory and enter the following command:

```
npm install
```

create two databases one for development and another one for testing, then create a file called ".env", and enter your database and encryption info like this:

```
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

POSTGRES_DB_TEST=

ENV=dev

BCRYPT_PASSWORD=
SALT_ROUNDS=

TOKEN_SECRET=
```

###where:

- POSTGRES_USER -> Is your postgresql username
- POSTGRES_PASSWORD -> Is your postgresql database password
- POSTGRES_HOST -> is the ip where your are hosting this app (127.0.0.1 if your are hosting it locally)
- POSTGRES_DB -> The name of the database you created for your development database
- POSTGRES_DB_TEST ->The name of the database you created for your testing database
- ENV -> Is the environment you are running your app on which detmines your database (development or testing) and it is dev by default
- BCRYPT_PASSWORD -> The password bcrypt is going to combine with to hash passwords. (can be string you wish)
- SALT_ROUNDS -> The number of encryption rounds (can be any number, ex: 10)
- TOKEN_SECRET -> The password jwt is going to combine with to create tokens. (can be string you wish)

Now, this project with all of the necessary dependancies can be run from your local device.

### Executing program

Ways to use this API through terminal

- To run this code for production:

```
npm run build
```

- To run this project for development

```
npm run start
```

- To format the code using Prettier

```
npm run prettier
```

- To lint the code using eslint

```
npm run lint
```

- To test and build the code for production

```
npm run build
```

## API Endpoints

#### Products

- GET: /products -> to list all products
- GET: /products/:id -> to list a specific products by id == body parameters (id NUMBER)
- POST: /products -> To create a new product == body parameters (name STRING, price NUMBER)

#### Users

- GET: /users -> to list all users
- GET: /users/:id -> to list a specific user by id == body parameters (id NUMBER)
- POST: /users -> To create a new product == body parameters (username STRING, first_name STRING, last_name STRING, password STRING)

#### Orders

- GET: /orders/:id -> to list the current order by id == body parameters (id NUMBER)
- POST: /orders -> to create an order == body parameters (userId NUMBER, status STRING enter "open" for this parameter)
- POST: /orders/:id -> To add a new product to an order == body parameters (userId NUMBER, productId NUMBER, quantity NUMBER)

## Authors

Contributors names and contact info

Adham Khatean

- Github:[@aekhatean](https://github.com/aekhatean)
- Linkedin: [@Adhamkhatean](https://www.linkedin.com/in/adhamkhatean/)

## Version History

- 1.0.0
  - Initial Release
