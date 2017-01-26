// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var CodeSchema   = new mongoose.Schema({
  value: { type: String, unique: true, required: true },
  redirectUri: { type: String, required: true },
  username: { type: String, required: true },
  clientId: { type: String, required: true }
});

// Export the Mongoose model
CodeSchema.index({value: 1});
module.exports = mongoose.model('Code', CodeSchema);
