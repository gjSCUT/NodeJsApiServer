/* npm packages */
const mongoose = require('mongoose');

/* app imports */
const { APIError } = require('../helpers/APIError');


/* global constants */
const Schema = mongoose.Schema;


const thingSchema = new Schema({
  name: String,
  number: Number,
  stuff: [String],
  url: String,
});

thingSchema.statics = {
  /**
   * Get a single Thing by name
   * @param {string} name - the Thing's name
   * @returns {Promise<Thing, APIError>}
   */
  get(name) {
    return this.findOne({ name })
      .exec()
      .then(thing => {
        if (thing) {
          return thing.toObject();
        }
        const notFoundError = new APIError(404, 'Thing Not Found', `No thing '${name}' found.`);
        return Promise.reject(notFoundError);
      });
  },
  /**
   * Create a Single New Thing
   * @param {object} newThing - an instance of Thing
   * @returns {Promise<Thing, APIError>}
   */
  create(newThing) {
    return newThing.save()
      .then(thing => thing.toObject())
      .catch(error => {
        let mongoError;
        if (error.code === 11000) {
          mongoError = new APIError(409, 'Thing Already Exists', `There is already an thing '${newThing.name}'.`);
        } else {
          mongoError = new APIError(500, 'Database Error', `Internal DB Error: ${mongoError}`);
        }
        return Promise.reject(mongoError);
      });
  },
  /**
   * Patch/Update a single Thing
   * @param {string} name - the Thing's name
   * @param {object} patchBody - the json containing the Thing attributes
   * @returns {Promise<Thing, APIError>}
   */
  patch(name, patchBody) {
    return this.findOneAndUpdate({ name }, patchBody, { new: true })
      .exec()
      .then(thing => {
        if (!thing) {
          throw new APIError(404, 'Thing Not Found', `No thing '${name}' found.`);
        }
        return thing.toObject();
      })
      .catch(error => {
        let mongoError = error;
        // if it's not a pre-formatted error like the 404 above we need to handle it
        if (!(error instanceof APIError)) {
          mongoError = new APIError(500, 'Database Error', `Internal DB Error: ${error}`);
        }
        return Promise.reject(mongoError);
      });
  },
  /**
   * Delete a single Thing
   * @param {string} name - the Thing's name
   * @returns {Promise<Thing, APIError>}
   */
  delete(name) {
    return this.findOneAndRemove({ name })
      .exec()
      .then(thing => {
        if (thing) {
          return true;
        }
        throw new APIError(404, 'Thing Not Found', `No thing '${name}' found.`);
      })
      .catch(error => {
        let mongoError = error;
        if (!(error instanceof APIError)) {
          mongoError = new APIError(500, mongoError.name, `Internal Database Error: ${mongoError}`);
        }
        return Promise.reject(mongoError);
      });
  },
  /**
   * Get a list of Things
   * @param {object} query - pre-formatted query to retrieve things.
   * @param {string} skip - # of docs to skip (for pagination)
   * @param {string} limit - # of docs to limit by (for pagination)
   * @returns {Promise<Things, APIError>}
   */
  getAll(query, skip, limit) {
    return this.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .exec()
      .then(things => {
        if (things.length === 0) {
          throw new APIError(404, 'No Things Found', 'No Things found matching your query.');
        }
        const objthings = things.map(thing => thing.toObject());  // proper formatting
        return objthings;
      })
      .catch(error => {
        let mongoError = error;
        if (!(error instanceof APIError)) {
          mongoError = new APIError(500, 'Database Error', `Internal DB Error: ${error}`);
        }
        return Promise.reject(mongoError);
      });
  },
  /**
   * Delete all the Things
   * @returns {Promise<Empty, APIError>}
   */
  deleteAll() {
    return this.remove()
      .exec()
      .then(() => true)
      .catch(error => {
        let mongoError = error;
        if (!(error instanceof APIError)) {
          mongoError = new APIError(500, mongoError.name, `Internal Database Error: ${mongoError}`);
        }
        return Promise.reject(mongoError);
      });
  },
};

/* Transform with .toObject to remove __v and _id from response */
if (!thingSchema.options.toObject) thingSchema.options.toObject = {};
thingSchema.options.toObject.transform = (doc, ret) => {
  const transformed = ret;
  delete transformed._id;
  delete transformed.__v;
  return transformed;
};

/** Ensure MongoDB Indices **/
thingSchema.index({ name: 1, number: 1 }, { unique: true });  // example compound idx

module.exports = mongoose.model('Thing', thingSchema);
