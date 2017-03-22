// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var CodeSchema   = new mongoose.Schema({
  value: { type: String, unique: true, required: true, index: true },
  redirectUri: { type: String, required: true },
  username: { type: String, required: true },
  clientId: { type: String, required: true }
});

module.exports = mongoose.model('Code', CodeSchema);
