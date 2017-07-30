# Ledger

A simple ledger to keep track of moneys

## Requirements

* [MongoDB]
* [NodeJS] 7.x or higher

## Setup

1. `git clone https://github.com/ericyd/ledger.git`
2. `cd ledger`
3. `npm install`: install dependencies
4. `npm run build`: build the src files into assets
5. `npm start`: start up the server
6. Open your browser to localhost:5000 and try out the app

## Production use

[Heroku] is a cool way to host.

1. Set up a project
2. Find a mongodb host, such as Mongo Atlas or mlab
3. Set up your `.env` file with the info for your database.  Follow the details in the `.sample.env` included in this repository
4. `npm run build:prod`
5. Push it up to heroku
6. In Heroku, set up your config vars to be the same as your `.env` vars

## Security

This application uses [passportjs] and [JSON web tokens] to handle user authentication.
It uses [bcrypt] for password encryption.

I am not trained in web security.
Any recommendations on authentication or encryption procedures used in this app are appreciated.

## Dev guide

* Front end: [Svelte]
* Back end: [Express]
* Database: [MongoDB]
* Testing: [ava] - note to self: write some tests

<!--References-->
[MongoDB]: https://www.mongodb.com/
[NodeJS]: https://nodejs.org/en/
[Heroku]: https://www.heroku.com
[Svelte]: http://svelte.technology
[Express]: http://expressjs.com/
[ava]: https://github.com/avajs/ava
[passportjs]: http://passportjs.org/
[JSON web tokens]: https://www.npmjs.com/package/passport-jwt
[bcrypt]: https://github.com/kelektiv/node.bcrypt.js