const bcrypt = require('bcrypt');
const User = require('../models/user');
const transactions = require('../model/transaction');

exports.authenticateUser = function(req, res) {
  // TODO: could this be improved?
  User.find({ username: req.body.username }, (err, user) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const reqPass = bcrypt.hashSync(req.body.password, user.salt);
      bcrypt.compare(reqPass, user.password, (err, match) => {
        if (err) return res.sendStatus(500);
        // if it matches return the transactions for that user
        if (match) {
          Transaction.getTransactionsByUserId(user.id, (err, data) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.json(data);
            }
          });
        }
        res.sendStatus(401);
      });
    }
  });
};

exports.addUser = function(req, res) {
  const user = new User();
  // TODO: could this be improved?
  const salt = bcrypt.genSaltSync(10);
  user.salt = salt;
  user.password = bcrypt.hashSync(req.body.password, salt);
  // Add strict validation when you use this in Production.
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.balance = 0;
  user.dateCreated = new Date();
  user.save(function(err) {
    // save() will run insert() command of MongoDB.
    // it will add new data in collection.
    if (err) {
      res.sendStatus(500);
    } else {
      res.json({ error: false, message: 'Data added' });
    }
  });
};
