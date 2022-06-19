# Simple CRUD API

## How to run

Clone and install

```npm i```

#### Run the application in development mode
`npm run start:dev`

#### Run the application in production mode
`npm run start:prod`

#### Run test API
`npm test`

#### Run cluster mode with default load balancer and one in-memory-database for all workers
`npm run start:multi`

## API

Implemented endpoint: `api/users`

`GET api/users` is used to get all users

`GET api/users/${userId}` is used to get user by id (uuid)

`POST api/users` is used to create record about new user and store it in database

`PUT api/users/${userId}` is used to update existing user (all fields required)

`DELETE api/users/${userId}` is used to delete existing user from database

## User's fields

`username` — user's name (string, **required**)

`age` — user's age (number, **required**)

`hobbies` — user's hobbies (array of strings or empty array, **required**)


