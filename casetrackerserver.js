// NODE JS REST API
// Author: EVI

//Dependencies
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

//Log Client IP on Every Request
app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', ip);
  next();
});

//Defined Header Controls
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Replace * with Restricted Domain URL
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middleware/validateUserRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Hey Listen! Could Not Find the Page!');
  err.status = 404;
  next(err);
});

//Connect to MongoDB
mongoose.connect('mongodb://localhost/test');

// Start the Server
app.set('port', process.env.PORT || 3010);

var server = app.listen(app.get('port'), function() {
  console.log('NodeJS with Express Server is Up and Listening on Port ' + server.address().port);
});



//CODE FOR HTTPS SSL/TLS
//Load in key and cert file for HTTPS
/*

//Place with Dependencies
var filescanner = require('fs');
var imokey = filescanner.readFileSync('imokey.pem');
var imocert = filescanner.readFileSync('imocert.pem');

var httpsOptions = {
  key: imokey,
  cert: imocert
};

//Place where Server Starts
var server = app.createServer(httpsOptions);
*/
