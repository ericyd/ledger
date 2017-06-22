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
    `mongodb://${process.env.MONGO_ATLAS_UN}:${process.env
      .MONGO_ATLAS_PW}@ericyd-shard-00-00-zcxzt.mongodb.net:${port},ericyd-shard-00-01-zcxzt.mongodb.net:${port},ericyd-shard-00-02-zcxzt.mongodb.net:${port}/${dbName}?ssl=true&replicaSet=ericyd-shard-0&authSource=admin`;

const db = mongoose.connect(dbUrl);

//
//  Declare schema
//
const userSchema = new Schema({
  name: String,
  dateCreated: Date
});

//
//  Add static methods to models
//

userSchema.statics.getAllUsers = function() {
  const self = this;
  return new Promise((resolve, reject) => {
    // Mongo command to fetch all data from collection.
    // https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
    self.find(
      {}, // Search Filters, e.g. "theater_id": 2481 (blank returns all)
      [], // Columns to Return (blank returns all)
      {
        skip: 0, // Starting Row
        limit: 0, // Ending Row
        sort: {
          dateCreated: -1 //Sort by dateCreated DESC
        }
      },
      function(err, data) {
        if (err) {
          reject({ error: true, message: 'Error fetching data' });
        } else {
          resolve({ error: false, message: data });
        }
      }
    );
  });
};

module.exports = mongoose.model('user', userSchema);
