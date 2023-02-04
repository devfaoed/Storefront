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
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5433
POSTGRES_DB=storefront
POSTGRES_USER=###
POSTGRES_PASSWORD=###
BCRYPT_PASSWORD=###
SALT_ROUNDS=10
TOKEN_SECRET=###
```

## Set up

- `docker-compose up` to start the docker container
- `npm install` to install all dependencies
- `npm run db-up` to set up the database and get access via http://127.0.0.1:5432
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app and get access via http://127.0.0.1:3000


## Test the app
- add a `database.json` file in the root directory and set the missing `###` parameters
```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5432,
    "database": "storefront",
    "user": "###",
    "password": "###"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5433,
    "database": "storefront",
    "user": "###",
    "password": "###"
  }
}
```
- `npm run test` to run all tests
