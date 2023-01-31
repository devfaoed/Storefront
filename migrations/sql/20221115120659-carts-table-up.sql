CREATE TABLE carts (id SERIAL PRIMARY KEY,
quantity INTEGER DEFAULT 1 NOT NULL,
product_id INTEGER NOT NULL,
order_id INTEGER NOT NULL,
   CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
   CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)  
);
