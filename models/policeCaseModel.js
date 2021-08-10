//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var PoliceCaseObjectSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
	userEmail: { type: String, required: true },
  taskforce: { type: String, required: true },
  caseNumber: { type: String, required: true },
  referralDate: {type: Date},
  referringAgency: {type: String},
  agencyType: {type: String},
  repeatReferral: {type: Boolean},
  uniqueIdentifier: {type: String},
  adult: {type: Boolean},
  prosecutingAgency: {type: String},
  action: {type: String},
  disposition: {type: String},
  sexOffenderReg: {type: String},
  incarceration: {type: String},
  numMonthsIncarceration: {type: Number},
  probation: {type: Boolean},
  numMonthsProbation: {type: Number},
  otherOutcomes: {type: String},
  notes: {type: String},
	createdOn: { type: Date },
	lastModifedOn:{ type: Date, default: Date.now }
});

// Return model
module.exports = restful.model('PoliceCaseObject', PoliceCaseObjectSchema);
