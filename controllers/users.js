const User = require('../models/user');

exports.getAllUsers = function(req, res) {
  User.find({}, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json({ error: false, message: data });
    }
  });
};

exports.addUser = function(req, res) {
  const user = new User();
  // fetch email and password from REST request.
  // Add strict validation when you use this in Production.
  user.name = req.body.name;
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
