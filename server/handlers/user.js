/* app imports */
var User = require('../models/user')
  , utils = require('../helpers/utils');

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
  var newUser = new User(request.body);
  newUser.password = utils.encrypt(newUser.password);
  return User
    .create(newUser)
    .then(user => response.status(201).json(user))
    .catch(error => next(error));
}


