// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ClientSchema = new mongoose.Schema({
  clientId: { type: String, unique: true, required: true, index: true },
  clientSecret: { type: String, required: true },
  name: { type: String, required: true },
  isTrust: { type: Boolean, default: false }
});

module.exports = mongoose.model('Client', ClientSchema);
