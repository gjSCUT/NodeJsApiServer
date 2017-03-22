const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');

CoaguSedimen = restful.model('CoaguSedimen',
  new mongoose.Schema({
    created: {type: Date, default: Date.now, index: true },
    ph: {type: Number},
    waterTemperature: {type: Number},
    turbidity: {type: Number},
    amlN2: {type: Number},
    COD: {type: Number},
    TOC: {type: Number},
    flowIn: {type: Number, required: true},
    alumAmount: {type: Number, required: true}
  }))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));

module.exports = CoaguSedimen;
