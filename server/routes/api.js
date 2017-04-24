const express = require('express');

const router = new express.Router();

/* app imports */
const thing = require('../models/thing');
const distributeWell = require('../models/distributeWell');
const combinedWell = require('../models/combinedWell');
const suctionWell = require('../models/suctionWell');
const activatedCarbonPool = require('../models/activatedCarbonPool');
const depositPool = require('../models/depositPool');
const sandLeachPool = require('../models/sandLeachPool');
const coagulatePool = require('../models/coagulatePool');
const chlorineAddPool = require('../models/chlorineAddPool');
const ozonePoolAdvance = require('../models/ozonePoolAdvance');
const ozonePoolMain = require('../models/ozonePoolMain');
const pumpRoomFirst = require('../models/pumpRoomFirst');
const pumpRoomSecond = require('../models/pumpRoomSecond');
const pumpRoomOut = require('../models/pumpRoomOut');

thing.register(router, '/things');
distributeWell.register(router, '/distributeWell');
combinedWell.register(router, '/combinedWell');
suctionWell.register(router, '/suctionWell');
activatedCarbonPool.register(router, '/activatedCarbonPool');
depositPool.register(router, '/depositPool');
sandLeachPool.register(router, '/sandLeachPool');
coagulatePool.register(router, '/coagulatePool');
chlorineAddPool.register(router, '/chlorineAddPool');
ozonePoolAdvance.register(router, '/ozonePoolAdvance');
ozonePoolMain.register(router, '/ozonePoolMain');
pumpRoomFirst.register(router, '/pumpRoomFirst');
pumpRoomSecond.register(router, '/pumpRoomSecond');
pumpRoomOut.register(router, '/pumpRoomOut');

setInterval(function() {
  new distributeWell({
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
  }).save();
  new combinedWell({
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
  }).save();
  new suctionWell({
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
  }).save();
  new activatedCarbonPool({
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
  }).save();
  new depositPool({
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
  }).save();
  new activatedCarbonPool({
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
  }).save();
  new sandLeachPool({
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
  }).save();
  new coagulatePool({
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
  }).save();
  new chlorineAddPool({
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
  }).save();
  new ozonePoolMain({
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
  }).save();
  new ozonePoolAdvance({
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
  }).save();
  new pumpRoomFirst({
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
  }).save();
  new pumpRoomOut({
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
  }).save();
  new pumpRoomSecond({
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
  }).save();
}, 10 * 1000, null);
module.exports = router;
