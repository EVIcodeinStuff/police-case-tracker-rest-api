//Dependencies
var dbIDSOffense = require('../models/criminalOffenseObject.js');


var IDSOffense = {

  getAll: function(req, res) {
    dbIDSOffense.CriminalOffenseObject.find({username: name}, function(err, user) {
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
    dbIDSOffense.CriminalOffenseObject.findById(id, function (err, user) {
      if (err) {
        return console.error(err);
      }
      else{
        console.log(user);
        res.json(user);
      }
    });
  },

  update: function(req, res) {
    var id = req.params.id;
    dbIDSOffense.CriminalOffenseObject.findByIdAndUpdate(id, req.body, function(err){
      if(err)
        console.log(err);
      else{
        res.status(200).send("Offense Updated\n");
      }
    });
  },

  delete: function(req, res) {
    var id = req.params.id;
    UserData.findByIdAndRemove(id, function(err){
      if(err)
        console.log(err);
      else{
        res.status(200).send("Offense Deleted\n");
      }
    });
  }
}//end 


module.exports = IDSOffense;
