const express = require('express');

const router = new express.Router();

/* app imports */
const Thing = require('../models/thing');
Thing.register(router, '/things');

module.exports = router;
