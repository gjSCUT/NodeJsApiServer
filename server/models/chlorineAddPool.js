const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');

ChlorineAddPool = restful.model('ChlorineAddPool',
  new mongoose.Schema({
    phIn: {type: Number, required: true},
    waterTemperIn: {type: Number, required: true},
    turbidityIn: {type: Number, required: true},
    amlN2In: {type: Number, required: true},
    codIn: {type: Number, required: true},
    tocIn: {type: Number, required: true},
    flowIn: {type: Number, required: true},
    phOut: {type: Number},
    waterTemperOut: {type: Number},
    turbidityOut: {type: Number},
    amlN2Out: {type: Number},
    codOut: {type: Number},
    tocOut: {type: Number},
    flowOut: {type: Number},
    chlorineAmount: {type: Number, required: true}
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));

module.exports = ChlorineAddPool;
