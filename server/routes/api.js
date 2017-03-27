const express = require('express');

const router = new express.Router();

/* app imports */
const thing = require('../models/thing');
const activatedCarbonPool = require('../models/activatedCarbonPool');
const chlorineAddPool = require('../models/chlorineAddPool');
const coaguSedimen = require('../models/coaguSedimen');
const ozonePoolAdvance = require('../models/ozonePoolAdvance');
const ozonePoolMain = require('../models/ozonePoolMain');
const pumpRoomFirst = require('../models/pumpRoomFirst');
const pumpRoomSecond = require('../models/pumpRoomSecond');
const pumpRoomOut = require('../models/pumpRoomOut');

thing.register(router, '/things');
activatedCarbonPool.register(router, '/activatedCarbonPool');
chlorineAddPool.register(router, '/chlorineAddPool');
coaguSedimen.register(router, '/coaguSedimen');
ozonePoolAdvance.register(router, '/ozonePoolAdvance');
ozonePoolMain.register(router, '/ozonePoolMain');
pumpRoomFirst.register(router, '/pumpRoomFirst');
pumpRoomSecond.register(router, '/pumpRoomSecond');
pumpRoomOut.register(router, '/pumpRoomOut');

module.exports = router;
