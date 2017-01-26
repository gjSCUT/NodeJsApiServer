/* npm packages */
const { Validator } = require('jsonschema');

/* app imports */
const { APIError } = require('../helpers/APIError');
const Thing = require('../models/thing');
const { thingPatchFormat, thingPostFormat } = require('../schemas/index');
const utils = require('../helpers/utils');

/* global constants */
const v = new Validator();

/**
 * Get a single thing
 * @param {string} name - the name of the Thing to retrieve
 */
module.exports.get = function(request, response, next) {
  const { name } = request.params;
  return Thing
    .get(name)
    .then(thing => response.json(thing))
    .catch(err => next(err));
}


/**
 * Validate the POST request body and create a new Thing
 */
module.exports.create = function(request, response, next) {
  const validationErrors = utils.schemaValidate(v.validate(request.body, thingPostFormat));
  if (validationErrors.length > 0) {
    return next(validationErrors);
  }
  const newThing = new Thing(request.body);
  return Thing
    .create(newThing)
    .then(thing => response.status(201).json(thing))
    .catch(dbError => next(dbError));
}

/**
 * Update a single thing
 * @param {string} name - the name of the Thing to update
 */
module.exports.update = function(request, response, next) {
  const { name } = request.params;
  const validationErrors = utils.schemaValidate(v.validate(request.body, thingPatchFormat));
  if (validationErrors.length > 0) {
    return next(validationErrors);
  }
  return Thing
    .patch(name, request.body)
    .then(thing => response.json(thing))
    .catch(dbError => next(dbError));
}

/**
 * Remove a single thing
 * @param {string} name - the name of the Thing to remove
 */
module.exports.delete = function(request, response, next) {
  const { name } = request.params;
  return Thing
    .delete(name)
    .then(() => {
      const deleteMsg = {
        Success: [{
          status: 200,
          title: 'Thing Deleted.',
          detail: `The thing '${name}' was deleted successfully.`,
        }],
      };
      return response.json(deleteMsg);
    })
    .catch(dbError => next(dbError));
}


/**
 * List all the things. Query params ?skip=0&limit=1000 by default
 */
module.exports.list = function(request, response, next) {
  let skip = 0;
  let limit = 1000;

  /* pagination validation */
  if (request.query.skip) {
    skip = utils.skipValidate(request.query.skip);
    if (skip instanceof APIError) {
      return next(skip);
    }
  }
  if (request.query.limit) {
    limit = utils.limitValidate(request.query.limit);
    if (limit instanceof APIError) {
      return next(limit);
    }
  }

  return Thing
    .getAll({}, skip, limit)
    .then(thingsList => response.json(thingsList))
    .catch(dbError => next(dbError));
}

/**
 * Remove all the things. Will always respond with 200 OK
 */
module.exports.clear = function(request, response, next) {
  return Thing
    .deleteAll()
    .then(() => {
      const deleteMsg = {
        Success: [{
          status: 200,
          title: 'Things Deleted.',
          detail: 'All the things were deleted successfully.',
        }],
      };
      return response.json(deleteMsg);
    })
    .catch(dbError => next(dbError));
}

