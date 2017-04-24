const mongoose = require('mongoose');
const restful = require('node-restful');
const passport = require('passport');

var ActivatedCarbonPool = restful.model('ActivatedCarbonPool',
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
    flowOut: {type: Number}
  }, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
  }).index({createTime: -1}))
  .methods(['get', 'post', 'put', 'delete'])
  .before('get', passport.authenticate('bearer', { session: false }))
  .before('get', function(req, res, next) {
    if (ActivatedCarbonPool.lasted != null && req.query.limit === "1" && req.query.sort === "-createTime") {
      return res.status(200).json([ActivatedCarbonPool.lasted]);
    } else {
      return next();
    }
  })
  .before('post', function(req, res, next) {
    return ActivatedCarbonPool
      .create(new ActivatedCarbonPool(req.body))
      .then(model => {
        ActivatedCarbonPool.lasted = model;
        return res.status(201).json(model)
      })
      .catch(error => next(error));
  })
  .before('post', passport.authenticate('bearer', { session: false }))
  .before('put', passport.authenticate('bearer', { session: false }))
  .before('delete', passport.authenticate('bearer', { session: false }));
ActivatedCarbonPool.lasted = null;

module.exports = ActivatedCarbonPool;
