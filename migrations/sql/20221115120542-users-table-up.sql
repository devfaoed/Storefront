CREATE TABLE users (id serial primary key,
"firstName" VARCHAR(50) NOT NULL,
"lastName" VARCHAR(50),
email VARCHAR(50) NOT NULL UNIQUE,
password  VARCHAR(255) NOT NULL) ;
