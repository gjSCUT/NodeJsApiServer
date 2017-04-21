/**
 * Module dependencies.
 */
const oauth2orize = require('oauth2orize')
  , passport = require('passport')
  , login = require('connect-ensure-login')
  , utils = require('../helpers/utils')
  , config = require('config')
  , User = require('../models/user')
  , Accesstoken = require('../models/accesstoken')
  , Refreshtoken = require('../models/refreshtoken')
  , Client = require('../models/client')
  , Code = require('../models/code');

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTP request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.

new Client({
  clientId: "admin",
  clientSecret: '123456',
  name: 'test',
  isTrust: true
}).save();
new Client({
  clientId: "android",
  clientSecret: '123456',
  name: 'android client',
  isTrust: true
}).save();
new Client({
  clientId: "c#",
  clientSecret: '123456',
  name: 'c# client',
  isTrust: true
}).save();
new Client({
  clientId: "web",
  clientSecret: '123456',
  name: 'web client',
  isTrust: true
}).save();


server.serializeClient(function(client, done) {
  return done(null, client._id);
});

server.deserializeClient(function(id, done) {
  Client.findOne({_id: id}, function(err, client) {
    if (err) { return done(err); }
    return done(null, client);
  });
});

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access accesstoken.

// Grant authorization codes.  The callback takes the `client` requesting
// authorization, the `redirectURI` (which is used as a verifier in the
// subsequent exchange), the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a code, which is bound to these
// values, and will be exchanged for an access accesstoken.

server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
  // clear this user token
  Accesstoken.remove({ username: user.username, clientId: client._id }, function (err) {
    if (err) return done(err);
  });
  Refreshtoken.remove({ username: user.username, clientId: client._id }, function (err) {
    if (err) return done(err);
  });
  var code = new Code({
    value: utils.uid(16),
    clientId: client._id,
    username: user.username,
    redirectUri: redirectURI
  });
  code.save(function(err) {
    if (err) { return done(err); }
    done(null, code.value);
  });
}));

// Grant implicit authorization.  The callback takes the `client` requesting
// authorization, the authenticated `user` granting access, and
// their response, which contains approved scope, duration, etc. as parsed by
// the application.  The application issues a accesstoken, which is bound to these
// values.

server.grant(oauth2orize.grant.token(function(client, user, ares, done) {
  // clear this user token
  removeAndCreateToken(user.username, client._id, done);
}));

// Exchange authorization codes for access accesstokens.  The callback accepts the
// `client`, which is exchanging `code` and any `redirectURI` from the
// authorization request for verification.  If these values are validated, the
// application issues an access accesstoken on behalf of the user who authorized the
// code.

server.exchange(oauth2orize.exchange.code(function(client, codeValue, redirectURI, done) {
  Code.findOne({value: codeValue}, function(err, code) {
    if (err) { return done(err); }
    if (code === null) { return done(null, false, { message: 'Code wrong' }); }
    if (client._id !== code.clientId) { return done(null, false, { message: 'Client not match' }); }
    if (redirectURI !== code.redirectURI) { return done(null, false, { message: 'RedirectUri not match' }); }
    // Delete auth code now that it has been used
    code.remove(function (err) {
      if(err) { return done(err); }
      removeAndCreateToken(code.username, code.clientId, done);
    });
  });
}));

// Exchange user id and password for access accesstokens.  The callback accepts the
// `client`, which is exchanging the user's name and password from the
// authorization request for verification. If these values are validated, the
// application issues an access accesstoken on behalf of the user who authorized the code.

server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
  //Validate the client
  Client.findOne({ _id: client._id}, function(err, localClient) {
    if (err) { return done(err); }
    if (!localClient) { return done(null, false, { message: 'Unknow Client' }); }
    if (localClient.clientSecret !== client.clientSecret) {
      return done(null, false, { message: 'Client Secret Wrong' });
    }
    //Validate the user
    User.findOne({username: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknow User' }); }
      if (!utils.validEncrypt(password, user.password)) { return done(null, false, { message: 'User password wrong' }); }//Everything validated, return the accesstoken
      removeAndCreateToken(user.username, client._id, done);
    });
  });
}));

// Exchange the client id and password/secret for an access accesstoken.  The callback accepts the
// `client`, which is exchanging the client's id and password/secret from the
// authorization request for verification. If these values are validated, the
// application issues an access accesstoken on behalf of the client who authorized the code.

server.exchange(oauth2orize.exchange.clientCredentials(function(client, scope, done) {
  //Validate the client
  Client.findOne({ _id: client._id}, function(err, localClient) {
    if (err) { return done(err); }
    if (!localClient) { return done(null, false, { message: 'Unknow Client' }); }
    if (localClient.clientSecret !== client.clientSecret) {
      return done(null, false, { message: 'Client Secret Wrong' });
    }
    createTokenWithoutUser(client._id, done);
  });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
  Refreshtoken.findOne({ value: refreshToken }, function(err, token) {
    if (err) { return done(err); }
    if (!token) { return done(null, false, { message: 'Refreshtoken wrong' }); }
    if( Math.round((Date.now()-token.created) / 1000) > config.get('security').tokenLife * 24) {
      Accesstoken.remove({ value: accessToken }, function (err) {
        if (err) return done(err);
      });
      return done(null, false, { message: 'Refreshtoken expired' });
    }
    if (token.username != null) {
      User.findOne({username: token.username}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Unknow user'});
        }
        removeAndCreateToken(user.username, client._id, done);
      });
    } else if (client.isTrust) {
      createTokenWithoutUser(client._id, done);
    } else {
      return done(null, false, {message: 'Wrong refreshtoken'});
    }
  });
 }));

var removeAndCreateToken = function(username, clientId, done) {
  Refreshtoken.remove({username: username, clientId: clientId}, function(err) {
    if (err) return done(err);
  });
  Accesstoken.remove({username: username, clientId: clientId}, function(err) {
    if (err) return done(err);
  });

  var accesstoken = new Accesstoken({
    value: utils.uid(256),
    clientId: clientId,
    username: username
  });
  accesstoken.save(function(err) {
    if (err) {
      return done(err);
    }
    var refreshToken = new Refreshtoken({
      value: utils.uid(256),
      clientId: clientId,
      username: username
    });
    refreshToken.save(function(err) {
      if (err) {
        return done(err);
      }
      done(null, accesstoken.value, refreshToken.value, {'expires_in': config.get('security').tokenLife});
    });
  });
}

var createTokenWithoutUser = function(clientId, done) {
  var accesstoken = new Accesstoken({
    value: utils.uid(256),
    clientId: clientId
  });
  accesstoken.save(function(err) {
    if (err) { return done(err); }
    var refreshToken = new Refreshtoken({
      value: utils.uid(256),
      clientId: clientId
    });
    refreshToken.save(function (err) {
      if (err) { return done(err); }
      done(null, accesstoken.value, refreshToken.value, { 'expires_in': config.get('security').tokenLife });
    });
  });
}

// user authorization endpoint
//
// `authorization` middleware accepts a `validate` callback which is
// responsible for validating the client making the authorization request.  In
// doing so, is recommended that the `redirectURI` be checked against a
// registered value, although security requirements may vary accross
// implementations.  Once validated, the `done` callback must be invoked with
// a `client` instance, as well as the `redirectURI` to which the user will be
// redirected after an authorization decision is obtained.
//
// This middleware simply initializes a new authorization transaction.  It is
// the application's responsibility to authenticate the user and render a dialog
// to obtain their approval (displaying details about the client requesting
// authorization).  We accomplish that here by routing through `ensureLoggedIn()`
// first, and rendering the `dialog` view.

module.exports.authorization = [
  login.ensureLoggedIn(),
  server.authorization(function(clientId, redirectURI, done) {
    Client.findOne({clientId: clientId}, function(err, client) {
      if (err) { return done(err); }
      //TODO check redirectURI
      return done(null, client, redirectURI);
    });
  }, function(client, user, done) {
    // Check if grant request qualifies for immediate approval
    if (user.has_token(client)) {
      // Auto-approve
      return done(null, true);
    }
    if (client.isTrust) {
      // Auto-approve
      return done(null, true);
    }
    // Otherwise ask user
    done(null, false);
  }),
  function(req, res) {
    res.render('dialog', {transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client});
  }
]

// user decision endpoint
//
// `decision` middleware processes a user's decision to allow or deny access
// requested by a client application.  Based on the grant type requested by the
// client, the above grant middleware configured above will be invoked to send
// a response.

module.exports.decision = [
  login.ensureLoggedIn(),
  server.decision()
]


// accesstoken endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access accesstokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

module.exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
  server.token(),
  server.errorHandler()
]

