// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ClientSchema = new mongoose.Schema({
  clientId: { type: String, unique: true, required: true },
  clientSecret: { type: String, required: true },
  name: { type: String, required: true },
  isTrust: { type: Boolean, default: false }
});

// Export the Mongoose model
ClientSchema.index({clientId: 1});
module.exports = mongoose.model('Client', ClientSchema);
