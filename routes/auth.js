//Dependencies
var jwt = require('jwt-simple');
var dbUser = require('../models/user');
var pwd = require('../pass');
var dbUserObj;

//Auth Definition
var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    // Shoot a query to DB and check if the credentials are valid
    auth.validate(username, password, function(response){
      //console.log(response + "\n");
      dbUserObj = response;

      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "No Credentials"
        });
        return;
      }

      if (!dbUserObj) {
        // If authentication fails, we send a 401 back
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid Credentials!"
        });
        return;
      }

      if (dbUserObj) {
        // If authentication is success, we will generate a token
        // and dispatch it to the client
        res.status(200);
        res.json(genToken(dbUserObj));
      }
    });
  },

  validate: function(username, password, callback) {
    authenticate(username,password, function(err, user){
      if (user) {
        console.log("Login Successful\n");
        return callback(user);
      }
      else {
        console.log("Login Failed...Good\n");
        return callback(null);
      }
    });
  },

  validateUser: function(username) {
    findAUser(username, function(err, user){
      if(!user){
        return fn(new Error('Cannot Find User\n'));
      }
      else{
        return user;
      }
    });
  },
} //end auth var



//Private methods
function genToken(user) {
  var expires = tokenExpiresIn(1);
  var token = jwt.encode({
    exp: expires
  }, require('../config/tokenSecret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function tokenExpiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

//Checks password and authenticates user
function authenticate(name, pass, fn) {
  dbUser.User.findOne ({username: name}, function(err, user) {
    if (!user){
      return fn(new Error('Cannot Find User\n'));
    }
    pwd.hash(pass, user.salt, function(err, hash){
      if (err) {
        return fn(err);
      }
      if (hash == user.hash) {
        return fn(null, user);
      }
      fn(new Error('Invalid Password\n'));
    })
  })
}

//Find a User and Return True or False
function findAUser(name, fn) {
  dbUser.User.findOne({username: name}, function(err, user){
    if(!user){
      return false;
    }
    else{
      return fn(null, user);
    }
  })
}

module.exports = auth;
