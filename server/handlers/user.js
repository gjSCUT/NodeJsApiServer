/* app imports */
var User = require('../models/user')
  , utils = require('../helpers/utils');
const redisModule = require("redis"),
  redis = redisModule.createClient(6379, 'redis');

/**
 * Get a single thing
 * @param {string} name - the name of the Thing to retrieve
 */
module.exports.get = function(request, response, next) {
  const { username } = request.params;
  return User
    .findOne({username:username})
    .then(user => response.json(user))
    .catch(error => next(error));
}


/**
 * Validate the POST request body and create a new Thing
 */
module.exports.create = function(request, response, next) {
  const newUser = new User(request.body);
  newUser.password = utils.encrypt(newUser.password);
  return User
    .create(newUser)
    .then(user => {
      redis.hmset('user:' + newUser.username, {
        username: newUser.username,
        password: newUser.password,
        name: newUser.name
      }, function(err) {
        if (err) { return next(err); }
      });
      return response.status(201).json(user)
    })
    .catch(error => next(error));
}


/**
 * Validate the POST request body and create a new Thing
 */
module.exports.changePassword = function(request, response, next) {
  const oldUser = new User(request.body);
  const newPassword = utils.encrypt(request.body.newPassword);
  User.findOne({username: oldUser.username}, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(null, false, { message: 'Unknow User' }); }
    if (!utils.validEncrypt(oldUser.password, user.password)) { return next(null, false); }
    user.password = newPassword;
    return user
      .save()
      .then(updatedUser => {
        redis.hmset('user:' + user.username, {
          username: user.username,
          password: user.password
        }, function(err) {
          if (err) { return next(err); }
        });
        return response.status(200).json(updatedUser);
      })
      .catch(error => next(error));
  });
}


/**
 * Validate the POST request body and create a new Thing
 */
module.exports.delete = function(request, response, next) {
  const { username } = request.params;
  return User
    .remove({username: username})
    .then(user => {
      redis.hdel('user:' + username, ['username', 'password', 'name'], function(err) {
        if (err) { return next(err); }
      });
      return response.status(200).json(user);
    })
    .catch(error => next(error));
}

