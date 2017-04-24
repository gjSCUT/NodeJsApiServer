const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');
var Types = mongoose.Schema.Types;

var PumpRoomSecond = restful.model('PumpRoomSecond',
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
    pumps: [{
      order: {type: Number, required: true},
      frequency: Number,
      head: Number,
      flow: Number
    }]
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }).index({createTime: -1}))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('get', function(req, res, next) {
    if (PumpRoomSecond.lasted != null && req.query.limit === "1" && req.query.sort === "-createTime") {
      return res.status(200).json([PumpRoomSecond.lasted]);
    } else {
      return next();
    }
  })
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('post', function(req, res, next) {
    return PumpRoomSecond
      .create(new PumpRoomSecond(req.body))
      .then(model => {
        PumpRoomSecond.lasted = model;
        return res.status(201).json(model)
      })
      .catch(error => next(error));
  })
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));
PumpRoomSecond.lasted = null;

module.exports = PumpRoomSecond;
