const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');
var Types = mongoose.Schema.Types;

var PumpRoomOut = restful.model('PumpRoomOut',
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
  }).index({createTime: -1}))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('get', function(req, res, next) {
    if (req.query.sort === "-createTime" && isNaN(req.query.skip)) {
      var cache = PumpRoomOut.lasted[req.query.limit];
      if (cache) {
        res.status(200).json(cache);
      } else {
        PumpRoomOut.find()
          .limit(Number(req.query.limit))
          .sort(req.query.sort)
          .then(users => {
            PumpRoomOut.lasted[req.query.limit] = users;
            res.status(200).json(users);
          })
          .catch(error => next(error));
      }
    } else {
      next();
    }
  })
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('post', function(req, res, next) {
    return PumpRoomOut
      .create(new PumpRoomOut(req.body))
      .then(model => {
        var cacheMap = PumpRoomOut.lasted;
        for(var field in cacheMap) {
          cacheMap[field].pop();
          cacheMap[field].unshift(model.toJSON());
        }
        res.status(201).json(model);
      })
      .catch(error => next(error));
  })
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));

PumpRoomOut.lasted = {};

module.exports = PumpRoomOut;
