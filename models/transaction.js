const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//
// Initialize Mongo connection
//
// excellent examples: http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
const dbName = 'ledger';
const port = 27017;
const dbUrl = process.env.NODE_ENV !== 'production'
  ? `mongodb://localhost:${port}/${dbName}`
  : // from mongo atlas
    process.env.MONGO_URL;

const db = mongoose.connect(dbUrl);

//
//  Declare schema
//
const transactionSchema = new Schema({
  userId: String,
  amount: Number,
  location: String,
  archived: Boolean,
  dateModified: Date,
  dateCreated: Date
});

module.exports = mongoose.model('transaction', transactionSchema);