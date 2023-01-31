## Task 2: Build A Storefront Backend

Udacity Advanced Full-stack nano degree second project

## Tech

* Runtime: Node.js (JavaScript)
* Web application framework: Express
* Language: TypeScript
* Database: Postgres
* Testing: Jasmine and Supertest

## Dependancies: you can find them in package.json

* bcrypt
* body-parser
* cors
* db-migrate
* db-migrate-pg
* dotenv
* express
* jsonwebtoken
* pg : using postgresql
* typescript

## DevDependancies

* @types/bcrypt
* @types/express
* @types/jasmine
* @types/jsonwebtoken
* @types/pg
* @types/supertest
* @typescript-eslint/eslint-plugin
* @typescript-eslint/parser
* eslint
* jasmine
* jasmine-spec-reporter
* jasmine-ts
* supertest
* ts-node
* tsc-watch

## The Ports

### APP

This App RUNS port PORT 3000 [http://localhost:4000](http://localhost:4000)

* BUT YOU CAN CHANGE THIS IN THE SERVER FILE IF NEEDED

### DATABASE

RUNS ON PORT 5432 [http://localhost:5432](http://localhost:5432) (LOCAL HOST)

* POSTGRES HOST IS AN ENVIRONMENT VARIABLE

## Setup

### databse runs on localhost:5432

First you need install all packages from the terminal. since package.json contains them all, you just need to run this command

```bash
npm install
```

then open the psql terminal and Create the database

```bash
CREATE DATABASE <db_name>;
```

Create a user and grant access to this database

```bash
CREATE USER <user_name> WITH PASSWORD '<password>';

GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <username>;
```

Now you can connect to create your production database.

```bash
\c <db_name>
```

open the second terminal and start the migration using db-migrate :

```bash
db-migrate up
```

undo migration

```bash
db-migrate down
```

If you get an assertion error : permission denied for schema public, the you should give the created user a super user role like that

* But beware with this option because it's not recommended due to security cautions.

```bash
ALTER USER <user_name> WITH SUPERUSER;
```

## Notes

* If you don't find .env file in the repo, create one that includes the environment variables needed.
* Requirements file is also included in this repo


