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
coagulatePool.register(router, '/coaguSedimen');
chlorineAddPool.register(router, '/chlorineAddPool');
ozonePoolAdvance.register(router, '/ozonePoolAdvance');
ozonePoolMain.register(router, '/ozonePoolMain');
pumpRoomFirst.register(router, '/pumpRoomFirst');
pumpRoomSecond.register(router, '/pumpRoomSecond');
pumpRoomOut.register(router, '/pumpRoomOut');

module.exports = router;
