// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var RefreshtokenSchema   = new mongoose.Schema({
  value: { type: String, unique: true, required: true },
  clientId: { type: String, required: true },
  created: {type: Date, default: Date.now },
  username: { type: String}
});

// Export the Mongoose model
RefreshtokenSchema.index({accesstoken: 1});
module.exports = mongoose.model('Refreshtoken', RefreshtokenSchema);
