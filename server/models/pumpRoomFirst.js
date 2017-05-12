const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');
var Types = mongoose.Schema.Types;

var PumpRoomFirst = restful.model('PumpRoomFirst', new mongoose.Schema({
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
    var time1 = new Date().getTime();
    if (req.query.sort === "-createTime" && isNaN(req.query.skip)) {
      var cache = PumpRoomFirst.lasted[req.query.limit];
      if (cache) {
        res.status(200).json(cache);
        var time2 = new Date().getTime();
        console.info("cache time2 - time1 = " + (time2 - time1));
      } else {
        PumpRoomFirst.find()
          .limit(Number(req.query.limit))
          .sort(req.query.sort)
          .then(users => {
            var time2 = new Date().getTime();
            PumpRoomFirst.lasted[req.query.limit] = users;
            res.status(200).json(users);
            var time3 = new Date().getTime();
            console.info("time2 - time1 = " + (time2 - time1));
            console.info("time3 - time2 = " + (time3 - time2));
          })
          .catch(error => next(error));
      }
    } else {
      next();
    }
  })
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('post', function(req, res, next) {
    return PumpRoomFirst
      .create(new PumpRoomFirst(req.body))
      .then(model => {
        var cacheMap = PumpRoomFirst.lasted;
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
PumpRoomFirst.lasted = {};

module.exports = PumpRoomFirst;
