const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');
var Types = mongoose.Schema.Types;

PumpRoomFirst = restful.model('PumpRoomFirst',
  new mongoose.Schema({
    created: {type: Date, default: Date.now, index: true },
    phIn: {type: Number},
    waterTempIn: {type: Number},
    turbidityIn: {type: Number},
    amlN2In: {type: Number},
    CODIn: {type: Number},
    TOCIn: {type: Number},
    phIn: {type: Number},
    flowIn: {type: Number},
    waterTempOut: {type: Number},
    turbidityOut: {type: Number},
    amlN2Out: {type: Number},
    CODOut: {type: Number},
    TOCOut: {type: Number},
    flowOut: {type: Number},
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

module.exports = PumpRoomFirst;
