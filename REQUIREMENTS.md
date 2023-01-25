# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

- Index (GET `/products` )
- Show  (GET `/products/:id` )
- Create [token required] (POST `/products` )

#### Users

- Index [token required] (GET `/users`)
- Show [token required] (GET `/users/:id`)
- Create [token required] (POST `/users`)

### Orders

- Create an order [token required] (POST `/orders`) also with authToken & orderByUSer
- Current Order by user (args: user id) [token required] (GET `/orders`) also with authToken & orderByUSer

### Carts

- Create  [token required](POST `/carts`) also with authToken
- Create  [token required](GET `/carts`) also with authToken

## Data Shapes

### Product

- id
- name
- price

```bash
CREATE TABLE products (
id serial primary key,
 name VARCHAR(100) NOT NULL,
  price FLOAT NOT NULL);
```

### User

- id
- firstName
- lastName
- email
- password

```bash

CREATE TABLE users (
id serial primary key,
"firstName" VARCHAR(50) NOT NULL,
"lastName" VARCHAR(50),
email VARCHAR(50) NOT NULL UNIQUE,
password  VARCHAR(255) NOT NULL) ;


```

### Order

- id
- user_id
- status of order (active or complete)

```bash
CREATE TABLE orders (
id serial primary key,
status VARCHAR(50),
user_id INTEGER REFERENCES users(id)
);  
```

### Cart

- id
- quantity
- product_id (note : relates to table products)
- order_id (note : relates to table orders)

```bash
CREATE TABLE carts (id SERIAL PRIMARY KEY,
quantity INTEGER DEFAULT 1 NOT NULL,
product_id INTEGER NOT NULL,
order_id INTEGER NOT NULL,
   CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
   CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)  
);

```
