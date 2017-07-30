const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getTransactionsByUserId = function(req, res) {
  Transaction.getTransactionsByUserId(req.user._id, (err, transactions) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json({
        error: false,
        message: 'found the data',
        transactions: transactions
      });
    }
  });
};

exports.addTransaction = function(req, res) {
  if (req.user) {
    // compute data for transaction and user updates
    const currentBalance = Number(req.user.balance) + Number(req.body.amount);
    const now = new Date();

    // TODO: add validation
    const transactionData = {
      location: req.body.location,
      amount: Number(req.body.amount),
      userId: req.user._id,
      transactionDate: new Date(req.body.transactionDate),
      category: req.body.category,
      notes: req.body.notes,
      currentBalance: currentBalance,
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

      // const user = new User(req.user);
      // update user balance
      req.user.balance = currentBalance;
      req.user.save(function(err) {
        if (err)
          return res.status(500).json({
            error: true,
            errormsgs: ['Database error updating user balance']
          });
        return res.json({ error: false, message: 'Data added successfully' });
      });
    });
  } else {
    return res.json({
      error: true,
      success: false,
      errormsgs: ['Database error finding user']
    });
  }
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
