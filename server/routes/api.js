/* npm packages */
const express = require('express')
  , login = require('connect-ensure-login')
  , passport = require('passport');

/* app imports */
const thing = require('../handlers/thing');


/* global constants */
const router = new express.Router();

/* All the Things Route */
router.route('/things')
  .all(passport.authenticate('bearer', { session: false }))
  .get(thing.list)
  .post(thing.create)
  .delete(thing.clear);

/* Single Thing by Name Route */
router.route('/things/:name')
  .all(passport.authenticate('bearer', { session: false }))
  .get(thing.get)
  .patch(thing.update)
  .delete(thing.delete);

module.exports = router;
