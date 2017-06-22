//
// Dependencies
//
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

//
// Set up server
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 5000);
// serves all files in public as static files
app.use(express.static(__dirname + '/public'));
// since public/index.html looks for ../dist/index.js,
// giving the dist files the path prefix of dist ensures that they can be found.
app.use('/dist', express.static('dist'));

//
// Set up routes
//
// route() will allow you to use same path for different HTTP operation.
// So if you have same URL but with different HTTP OP such as POST,GET etc
// Then use route() to remove redundant code.

app.get('/', function(request, response) {
  response.render('index.html');
});

// get all theaters
router.route('/example').get(function(req, res) {
  res.json({ example: 'example' });
});

app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
