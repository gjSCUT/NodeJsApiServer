const express = require('express');

const router = new express.Router();

/* app imports */
const DistributeWell = require('../models/distributeWell');
const CombinedWell = require('../models/combinedWell');
const SuctionWell = require('../models/suctionWell');
const ActivatedCarbonPool = require('../models/activatedCarbonPool');
const DepositPool = require('../models/depositPool');
const SandLeachPool = require('../models/sandLeachPool');
const CoagulatePool = require('../models/coagulatePool');
const ChlorineAddPool = require('../models/chlorineAddPool');
const OzonePoolAdvance = require('../models/ozonePoolAdvance');
const OzonePoolMain = require('../models/ozonePoolMain');
const PumpRoomFirst = require('../models/pumpRoomFirst');
const PumpRoomSecond = require('../models/pumpRoomSecond');
const PumpRoomOut = require('../models/pumpRoomOut');

DistributeWell.register(router, '/distributeWell');
CombinedWell.register(router, '/combinedWell');
SuctionWell.register(router, '/suctionWell');
ActivatedCarbonPool.register(router, '/activatedCarbonPool');
SandLeachPool.register(router, '/depositPool');
CoagulatePool.register(router, '/sandLeachPool');
CoagulatePool.register(router, '/coagulatePool');
ChlorineAddPool.register(router, '/chlorineAddPool');
OzonePoolAdvance.register(router, '/ozonePoolAdvance');
OzonePoolMain.register(router, '/ozonePoolMain');
PumpRoomFirst.register(router, '/pumpRoomFirst');
PumpRoomSecond.register(router, '/pumpRoomSecond');
PumpRoomOut.register(router, '/pumpRoomOut');

setInterval(function() {
  new DistributeWell({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random())
  }).save().then(model => {
    var cacheMap = DistributeWell.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new CombinedWell({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random())
  }).save().then(model => {
    var cacheMap = CombinedWell.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new SuctionWell({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random())
  }).save().then(model => {
    var cacheMap = SuctionWell.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new DepositPool({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random())
  }).save().then(model => {
    var cacheMap = DepositPool.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new ActivatedCarbonPool({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random())
  }).save().then(model => {
    var cacheMap = ActivatedCarbonPool.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new SandLeachPool({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random())
  }).save().then(model => {
    var cacheMap = SandLeachPool.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new CoagulatePool({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    alumAmount: 50 * Math.random()
  }).save().then(model => {
    var cacheMap = CoagulatePool.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new ChlorineAddPool({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    chlorineAmount: 50 * Math.random()
  }).save().then(model => {
    var cacheMap = ChlorineAddPool.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new OzonePoolMain({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    zoneAmount: 0.7 * Math.random()
  }).save().then(model => {
    var cacheMap = OzonePoolMain.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new OzonePoolAdvance({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    zoneAmount: 0.7 * Math.random()
  }).save().then(model => {
    var cacheMap = OzonePoolAdvance.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new PumpRoomFirst({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    pumps: [{order: 1, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 2, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 3, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 4, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()}]
  }).save().then(model => {
    var cacheMap = PumpRoomFirst.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new PumpRoomOut({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    pumps: [{order: 1, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 2, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 3, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 4, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()}]
  }).save().then(model => {
    var cacheMap = PumpRoomOut.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
  new PumpRoomSecond({
    phIn: 7 * (1 + Math.random()),
    waterTemperIn: 15 * (1 + Math.random()),
    turbidityIn: 75 * (1 + Math.random()),
    amlN2In: 10 * (1 + Math.random()),
    codIn: 25 * (1 + Math.random()),
    tocIn: 15 * (1 + Math.random()),
    flowIn: 2000 * (1 + Math.random()),
    phOut: 7 * (1 - Math.random()),
    waterTemperOut: 15 * (1 - Math.random()),
    turbidityOut: 75 * (1 - Math.random()),
    amlN2Out: 10 * (1 - Math.random()),
    codOut: 25 * (1 - Math.random()),
    tocOut: 15 * (1 - Math.random()),
    flowOut: 2000 * (1 - Math.random()),
    pumps: [{order: 1, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 2, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 3, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()},
      {order: 4, frequency: 40 + 50 * Math.random(), head: 3 + 4 * Math.random(), flow: 4000 * Math.random()}]
  }).save().then(model => model => {
    var cacheMap = PumpRoomSecond.lasted;
    for(var field in cacheMap) {
      cacheMap[field].pop();
      cacheMap[field].unshift(model.toJSON());
    }
  });
}, 10 * 1000, null);
module.exports = router;
