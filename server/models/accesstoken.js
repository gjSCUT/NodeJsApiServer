// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var AccesstokenSchema   = new mongoose.Schema({
  value: { type: String, unique: true, required: true, index: true},
  clientId: { type: String, required: true },
  created: {type: Date, default: Date.now },
  username: { type: String}
});

module.exports = mongoose.model('Accesstoken', AccesstokenSchema);
