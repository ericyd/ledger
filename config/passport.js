/**
 * PassportJS configuration
 * This code adds the JwtStrategy to our passport.
 * This strategy is run every time authentication occurs, and if a user is found it will be
 * accessible to the callback via req.user
 */

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const secret = process.env.JWT_SECRET;

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findById(jwt_payload._id, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
