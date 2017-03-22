const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');
var Types = mongoose.Schema.Types;

PumpRoomSecond = restful.model('PumpRoomSecond',
  new mongoose.Schema({
    created: {type: Date, default: Date.now, index: true },
    ph: {type: Number},
    waterTemperature: {type: Number},
    turbidity: {type: Number},
    amlN2: {type: Number},
    COD: {type: Number},
    TOC: {type: Number},
    flowIn: {type: Number, required: true},
    pumps: [{
      _id: {type:Types.ObjectId, required: true},
      frequency: Number,
      head: Number,
      flow: Number
    }]
  }))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));

module.exports = PumpRoomSecond;
