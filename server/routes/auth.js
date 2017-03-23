/* npm packages */
const express = require('express')
  , config = require('config');

/* app imports */
const site = require('../handlers/site')
  , user = require('../handlers/user')
  , oauth2 = require('../handlers/oauth2');

/* global constants */
const router = new express.Router();

router.route('/')
  .get(function(req, res, next){
    console.log('Welcome to API server');
    return res.status(200).json({
      content: 'Welcome to API server',
      copyright: 'Yang Sixuan'
    });
  });

router.route('/user')
  .post(user.create);

router.route('/user/:username')
  .get(user.get);

router.route('/user/login')
  .get(site.loginForm)
  .post(site.login);

router.route('/user/logout')
  .get(site.logout);

router.get('/dialog/authorize', oauth2.authorization);
router.post('/dialog/authorize/decision', oauth2.decision);
router.post('/oauth/token', oauth2.token);


module.exports = router;
