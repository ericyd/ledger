//
// Dependencies
//
require('dotenv').config();
require('./models/initDb')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const users = require('./controllers/users');
const transactions = require('./controllers/transactions');


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const User = require('./models/user')
const MyStrategy = require('./config/passport.js')

//
// Set up server
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 5000);
// serve all files in public as static files.
// since public/index.html looks for ../dist/index.js,
// giving the dist files the path prefix of dist ensures that they can be found.
app.use(express.static(__dirname + '/public'));
app.use('/dist', express.static('dist'));

// Use the passport package in our application
app.use(passport.initialize());

MyStrategy(passport)


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));



// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {

//   }
// );



//
// Define JSON routes
//
router.route('/users').post(users.addUser);
router.route('/login').post(users.authenticateUser);
router.route('/users/getNameAndBalance').get(passport.authenticate('jwt', {session: false}), users.getNameAndBalance);
router
  .route('/transactions/:userId')
  .get(transactions.getTransactionsByUserId)
  .post(transactions.addTransaction)
  .put(transactions.updateTransaction);

//
// Assume client side routing
//
router.route('*').get(function(req, res) {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

//
// Use the router as the default
//
app.use('/', router);

if (process.env.NODE_ENV === 'production')
  console.log('Running with production database');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
