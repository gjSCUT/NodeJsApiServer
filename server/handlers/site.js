/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports.loginForm = function(req, res) {
  res.render('login');
};

module.exports.login = passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  });

module.exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}
