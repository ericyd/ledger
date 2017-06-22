const User = require('../models/user');

exports.getAllUsers = function(req, res) {
  User.find({}, (err, data) => {
    if (err) {
      response = { error: true, message: 'Error fetching data' };
    } else {
      response = { error: false, message: data };
    }
    res.json(response);
  });
};

exports.addUser = function(req, res) {
  const user = new User();
  let response = {};
  // fetch email and password from REST request.
  // Add strict validation when you use this in Production.
  user.name = req.body.name;
  // Hash the password using SHA1 algorithm.
  user.dateCreated = new Date();
  user.save(function(err) {
    // save() will run insert() command of MongoDB.
    // it will add new data in collection.
    if (err) {
      response = { error: true, message: 'Error adding data' };
    } else {
      response = { error: false, message: 'Data added' };
    }
    res.json(response);
  });
};
