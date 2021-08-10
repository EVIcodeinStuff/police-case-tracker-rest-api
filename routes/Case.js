//Dependencies
var dbIDSCase = require('../models/policeCaseModel.js');


var idscase = {

  getAll: function(req, res) {
    dbIDSCase.PoliceCaseObject.find({username: name}, function(err, user) {
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
    dbIDSCase.PoliceCaseObject.findById(id, function (err, user) {
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
    dbIDSCase.PoliceCaseObject.findByIdAndUpdate(id, req.body, function(err){
      if(err)
        console.log(err);
      else{
        res.status(200).send("Case Updated\n");
      }
    });
  },

  delete: function(req, res) {
    var id = req.params.id;
    UserData.findByIdAndRemove(id, function(err){
      if(err)
        console.log(err);
      else{
        res.status(200).send("Case Deleted\n");
      }
    });
  }
}//end idscase Var


module.exports = idscase;
