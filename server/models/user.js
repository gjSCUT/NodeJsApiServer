/* npm packages */
const mongoose = require('mongoose');

/* global constants */
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
});

/** Ensure MongoDB Indices **/
userSchema.index({username: 1});
module.exports = mongoose.model('User', userSchema);
