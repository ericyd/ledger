const mongoose = require('mongoose');

//
// Initialize Mongo connection
// excellent examples: http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
//

function initDb() {
  const dbName = 'ledger';
  const port = 27017;
  const dbUrl = process.env.NODE_ENV !== 'production'
    ? `mongodb://localhost:${port}/${dbName}`
    : // from mongo atlas
      process.env.MONGO_URL;

  mongoose.connection.on('error', console.log.bind(console));
  let db;
  try {
    db = mongoose.connect(dbUrl);
  } catch (err) {
    console.log(err);
    try {
      mongoose.disconnect(() => {
        db = mongoose.connect(dbUrl);
      });
    } catch (err2) {
      console.log(err2);
    }
  }
}

module.exports = initDb;
