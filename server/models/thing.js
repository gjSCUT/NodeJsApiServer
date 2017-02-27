const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');

Thing = restful.model('Thing',
  new mongoose.Schema({
    title: String
  }))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));

module.exports = Thing;
