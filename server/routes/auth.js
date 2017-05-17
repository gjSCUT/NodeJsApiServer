/* npm packages */
const express = require('express')
  , config = require('config');

/* app imports */
const site = require('../handlers/site')
  , user = require('../handlers/user')
  , oauth2 = require('../handlers/oauth2Redis');
require('../handlers/authRedis');

/* global constants */
const router = new express.Router();

router.route('/')
  .get(function(req, res, next){
    return res.status(200).json({
      content: 'Welcome to API server',
      copyright: 'Yang Sixuan'
    });
  });

router.route('/user')
  .post(user.create)
  .patch(user.changePassword);

router.route('/user/:username')
  .get(user.get)
  .delete(user.delete);

router.route('/login')
  .post(site.login);
router.route('/logout')
  .get(site.logout);
router.route('/login/status/:status')
  .get(site.loginStatus)


router.get('/dialog/authorize', oauth2.authorization);
router.post('/dialog/authorize/decision', oauth2.decision);
router.post('/oauth/token', oauth2.token);


module.exports = router;
