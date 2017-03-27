/**
 * Module dependencies.
 */
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , BasicStrategy = require('passport-http').BasicStrategy
  , ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
  , BearerStrategy = require('passport-http-bearer').Strategy
  , utils = require('../helpers/utils')
  , config = require('config')
  , User = require('../models/user')
  , Accesstoken = require('../models/accesstoken')
  , Client = require('../models/client');


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknow User' }); }
    return done(null, user);
  });
});

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknow User' }); }
      if (!utils.validEncrypt(password, user.password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(
  function(clientId, clientSecret, done) {
    Client.findOne({clientId: clientId}, function(err, client) {
      if (err) { return done(err); }
      if (!client) { return done(null, false, { message: 'Unknow Client' }); }
      if (client.clientSecret != clientSecret) { return done(null, false); }
      return done(null, client);
    });
  }
));

passport.use(new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    Client.findOne({clientId: clientId}, function(err, client) {
      if (err) { return done(err); }
      if (!client) { return done(null, false, { message: 'Unknow Client' }); }
      if (client.clientSecret != clientSecret) { return done(null, false); }
      return done(null, client);
    });
  }
));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
  function(accessToken, done) {
    Accesstoken.findOne({value: accessToken }, function (err, token) {
      if (err) { return done(err); }
      if (!token) { return done(null, false); }
      if( Math.round((Date.now()-token.created) / 1000) > config.get('security').tokenLife ) {
        Accesstoken.remove({ value: accessToken }, function (err) {
          if (err) return done(err);
        });
        return done(null, false, { message: 'Token expired' });
      }

      if (token.username != null) {
        User.findOne({username: token.username}, function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Unknow User' }); }
          return done(null, user, { scope: '*' });
        });
      } else {
        Client.findOne({_id: token.clientId}, function(err, client) {
          if(err) { return done(err); }
          if(!client) { return done(null, false, { message: 'Unknow Client' }); }
          done(null, client, { scope: '*' });
        });
      }
    });
  }
));
