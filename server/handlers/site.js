/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports.loginForm = function(req, res) {
  res.render('login');
};

module.exports.login = passport.authenticate('local', {
    successReturnToOrRedirect: '/login/status/success',
    failureRedirect: '/login/status/failure'
  });

module.exports.logout = function(req, res) {
  req.logout();
  res.status(200).json('logout success');
}

module.exports.loginStatus = function(req, res) {
  const { status } = req.params;
  if (status === 'current') {
    if (req.session.passport) {
      res.status(230).json('logining');
    } else {
      res.status(403).json('no login');
    }
  } else if (status === 'success'){
    res.status(200).json('login success');
  } else {
    res.status(403).json('login failure');
  }
}

