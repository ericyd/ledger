const Transaction = require('../models/transaction');

exports.getTransactionsByUserId = function(req, res) {
  Transaction.getTransactionsByUserId(req.params.userId, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json({ error: false, message: data });
    }
  });
};

exports.addTransaction = function(req, res) {
  const transaction = new Transaction();
  // Add strict validation when you use this in Production.
  transaction.location = req.body.location;
  transaction.amount = req.body.amount;
  transaction.userId = req.params.userId;
  const now = new Date();
  transaction.dateCreated = now;
  transaction.dateModified = now;
  transaction.archived = false;

  transaction.save(function(err) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json({ error: false, message: 'Data added' });
    }
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
