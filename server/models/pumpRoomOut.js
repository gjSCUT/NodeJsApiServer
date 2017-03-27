const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');
var Types = mongoose.Schema.Types;

PumpRoomOut = restful.model('PumpRoomOut',
  new mongoose.Schema({
    phIn: {type: Number, required: true},
    waterTemperIn: {type: Number, required: true},
    turbidityIn: {type: Number, required: true},
    amlN2In: {type: Number, required: true},
    codIn: {type: Number, required: true},
    tocIn: {type: Number, required: true},
    flowIn: {type: Number, required: true},
    phOut: {type: Number, required: true},
    waterTemperOut: {type: Number, required: true},
    turbidityOut: {type: Number, required: true},
    amlN2Out: {type: Number, required: true},
    codOut: {type: Number, required: true},
    tocOut: {type: Number, required: true},
    flowOut: {type: Number, required: true},
    pumps: [{
      order: {type: Number, required: true},
      frequency: Number,
      head: Number,
      flow: Number
    }]
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));

module.exports = PumpRoomOut;
