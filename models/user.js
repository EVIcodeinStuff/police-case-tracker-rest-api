//Dependencies
var mongoose = require('mongoose');

// Schema for DB
var userAuthSchema = new mongoose.Schema({
	 userID: {type: String, required: true},
	 username: String,
	 hash: String,
   salt: String,
   accessRights: String,
   sessionID: String,
   lastAccessOn:{ type: Date, default: Date.now }
});

exports.User = mongoose.model('user', userAuthSchema);
