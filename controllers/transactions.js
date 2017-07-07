const Transaction = require('../models/transaction');
const User = require('../models/user');
const Balance = require('../models/balance');

exports.getTransactionsByUserId = function(req, res) {
  Transaction.getTransactionsByUserId(
    req.params.userId,
    (err, transactions) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({
          error: false,
          message: 'found the data',
          transactions: transactions
        });
      }
    }
  );
};

exports.addTransaction = function(req, res) {
  // TODO: add validation
  const now = new Date();

  const transactionData = {
    location: req.body.location,
    amount: Number(req.body.amount),
    userId: req.params.userId,
    transactionDate: new Date(req.body.transactionDate),
    category: req.body.category,
    dateCreated: now,
    dateModified: now,
    archived: req.body.archived ? req.body.archived : false
  };
  const transaction = new Transaction(transactionData);

  transaction.save(function(err, data) {
    if (err)
      return res.status(500).json({
        error: true,
        errormsgs: ['Database error saving the transaction', err]
      });

    // update user balance
    User.findById(req.params.userId, function(err, user) {
      if (err)
        return res
          .status(500)
          .json({ error: true, errormsgs: ['Database error finding user'] });
      user.balance = Number(user.balance) + transactionData.amount;
      user.save(function(err) {
        if (err)
          return res.status(500).json({
            error: true,
            errormsgs: ['Database error updating user balance']
          });

        // add record to balances
        const balance = new Balance({
          userId: transactionData.userId,
          amount: transactionData.amount,
          date: transactionData.transactionDate
        });
        balance.save(function(err) {
          if (err)
            return res.status(500).json({
              error: true,
              errormsgs: ['Database error adding record to balances document']
            });
          return res.json({ error: false, message: 'Data added successfully' });
        });
      });
    });
  });
};

exports.updateTransaction = function(req, res) {
  Transaction.findById(req.body.id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (!data.id) {
        res.sendStatus(404);
      } else {
        data = req.body;
        data.save(err => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.json({ message: 'successfully updated' });
          }
        });
      }
    }
  });
};
