//Dependencies
var dbUser = require('../models/user');
var pwd = require('../pass');

var users = {

  getAll: function(req, res) {
    dbUser.User.find({username: name}, function(err, user) {
      if (err) {
        return console.error(err);
      }
      else{
        console.log(user);
        res.json(user);
      }
    });
  },

  getOne: function(req, res) {
    var id = req.params.id;
    dbUser.User.findById(id, function (err, user) {
      if (err) {
        return console.error(err);
      }
      else{
        console.log(user);
        res.json(user);
      }
    });
  },

  create: function(req, res) {
    createNewUser(req.body.username, req.body.password, req.body.accessRights);
  },

  update: function(req, res) {
    var id = req.params.id;
    dbUser.User.findByIdAndUpdate(id, req.body, function(err){
      if(err)
        console.log(err);
      else{
        res.status(200).send("User Updated\n");
      }
    });
  },

  delete: function(req, res) {
    var id = req.params.id;
    UserData.findByIdAndRemove(id, function(err){
      if(err)
        console.log(err);
      else{
        res.status(200).send("User Deleted\n");
      }
    });
  }
}//end Users Var

//Private Methods
function createNewUser (userName, passWord, accessRights){
  var user = new dbUser.User();
  user.username = userName;
  pwd.hash(passWord, function(err, salt, hash) {
    if (err) {
      console.log(err);
    }
    user.salt = salt;
    user.hash = hash;
    user.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to Create User\n");
      } else {
        console.log("User Created");
        res.status(200).send("New User Added!\n");
      }
    });
  });
}

module.exports = users;
