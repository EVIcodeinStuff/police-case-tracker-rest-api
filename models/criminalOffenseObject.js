
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var CriminalOffenseObjectSchema = new mongoose.Schema({
  offenseId: { type: String, required: true },
  caseId: { type: String, required: true },
  infractionType: { type: String },
  charge: { type: String },
  hasMultipleCounts: { type: Boolean },
	createdOn: { type: Date },
	lastModifedOn:{ type: Date, default: Date.now }
});

// Return model
module.exports = restful.model('CriminalOffenseObject', CriminalOffenseObjectSchema);
