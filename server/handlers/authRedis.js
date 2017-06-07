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
  , User = require('../models/user');
const redisModule = require('redis'),
  redis = redisModule.createClient(6379, 'redis');

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  redis.hgetall('user:' + username, function(err, user) {
    if (err || !user) {
      User.findOne({username: username}, function(err, newUser) {
        if (err) { return done(err); }
        if (!newUser) { return done(null, false, { message: 'Unknow User' }); }
        redis.hmset('user:' + newUser.username, {
          username: newUser.username,
          password: newUser.password,
          name: newUser.name
        });
        return done(null, newUser);
      });
    }
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
    redis.hgetall('user:' + username, function(err, user) {
      if (err || !user) {
        User.findOne({username: username}, function(err, newUser) {
          if (err) { return done(err); }
          if (!newUser) { return done(null, false, { message: 'Unknow User' }); }
          if (!utils.validEncrypt(password, newUser.password)) { return done(null, false); }
          redis.hmset('user:' + newUser.username, {
            username: newUser.username,
            password: newUser.password,
            name: newUser.name
          });
          return done(null, newUser);
        });
      }
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
    redis.hgetall('client:' + clientId, function(err, client) {
      if (err) { return done(err); }
      if (!client) { return done(null, false, { message: 'Unknow Client' }); }
      if (client.clientSecret != clientSecret) { return done(null, false); }
      return done(null, client);
    });
  }
));

passport.use(new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    redis.hgetall('client:' + clientId, function(err, client) {
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
    redis.hgetall('accessToken:' + accessToken, function(err, token) {
      if (err) { return done(err); }
      if (!token) { return done(null, false); }
      if( Math.round((Date.now()-token.created) / 1000) > config.get('security').tokenLife ) {
        redis.del('accessToken:' + token.username + token.clientId, function(err){
          if (err) done(err);
        });
        redis.hdel('accessToken:' + token.value, ['value', 'clientId', 'username', 'created'], function(err) {
          if (err) done(err);
        });
        return done(null, false, { message: 'Token expired' });
      }

      if (token.username != null) {
        redis.hgetall('user:' + username, function(err, user) {
          if (err || !user) {
            User.findOne({username: username}, function (err, newUser) {
              if (err) {
                return done(err);
              }
              if (!newUser) {
                return done(null, false, {message: 'Unknow User'});
              }
              redis.hmset('user:' + newUser.username, {
                username: newUser.username,
                password: newUser.password,
                name: newUser.name
              });
              return done(null, newUser, { scope: '*' });
            });
          }
          return done(null, user, { scope: '*' });
        });
      } else {
        redis.hgetall('client:' + token.clientId, function(err, client) {
          if(err) { return done(err); }
          if(!client) { return done(null, false, { message: 'Unknow Client' }); }
          done(null, client, { scope: '*' });
        });
      }
    });
  }
));
