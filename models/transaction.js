const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Declare schema
//
const transactionSchema = new Schema({
  userId: String,
  amount: Number,
  location: String,
  archived: Boolean,
  category: String,
  transactionDate: Date,
  notes: String,
  currentBalance: Number,
  dateModified: Date,
  dateCreated: Date
});

transactionSchema.statics.getTransactionsByUserId = function(userId, cb) {
  this.find({ userId: userId }, cb);
};

module.exports = mongoose.model('transaction', transactionSchema);
