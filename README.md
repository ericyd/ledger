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

## Security

Please note that I am not trained in web security, and even *I* know this app is not very secure.  It uses a simple authentication scheme, and doesn't really do any verification of that later.  So, implement your own authentication before using this with sensitive data.

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