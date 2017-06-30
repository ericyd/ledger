const bcrypt = require('bcrypt');
const User = require('../models/user');
const Transaction = require('../models/transaction');

// TODO: find a way to refactor the call back. Everytime I get an error, I have the same pattern

exports.authenticateUser = function(req, res) {
  // TODO: could this be improved?
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (user) {
        bcrypt.compare(
          user.salt + req.body.password,
          user.password,
          (err, match) => {
            if (err) return res.sendStatus(500);
            // if it matches return the transactions for that user
            if (match) {
              Transaction.getTransactionsByUserId(
                user.id,
                (err, transactions) => {
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.json({
                      message: 'look at you, loggin in like a pro',
                      balance: user.balance,
                      transactions: transactions
                    });
                  }
                }
              );
            } else {
              res.sendStatus(401);
            }
          }
        );
      } else {
        res.json({ error: 'wrong credentials, try again' });
      }
    }
  });
};

exports.addUser = function(req, res) {
  // make sure the username doesn't already exist
  User.find({ username: req.body.username }, (err, user) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (user.length > 0) {
        res.json({ error: 'this username already exists' });
      } else {
        // if no username exists, create user
        const user = new User();
        // TODO: could this be improved?
        const salt = bcrypt.genSaltSync(10);
        // not really sure this is necessary
        const userSalt = bcrypt.genSaltSync(10);
        user.salt = userSalt;
        user.password = bcrypt.hashSync(userSalt + req.body.password, salt);
        // Add strict validation when you use this in Production.
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.balance = 0;
        user.dateCreated = new Date();
        user.save(function(err, user) {
          // save() will run insert() command of MongoDB.
          // it will add new data in collection.
          if (err) {
            res.sendStatus(500);
          } else {
            res.json({ error: false, message: 'Data added', id: user.id });
          }
        });
      }
    }
  });
};
