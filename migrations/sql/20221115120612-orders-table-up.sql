CREATE TABLE orders (id serial primary key,
status VARCHAR(50),
user_id INTEGER REFERENCES users(id));