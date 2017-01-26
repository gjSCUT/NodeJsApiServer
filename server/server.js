/* npm packages */
require('connect-mongo');
const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
Promise = require('bluebird'); // eslint-disable-line no-native-reassign

/* app imports */
const {APIError, correlationId, errorHandler} = require('./helpers/APIError');
const apiRoute = require('./routes/api');
const authRoute = require('./routes/auth');

/* global constants */
const server = express();

/* --- Database --- */
mongoose.Promise = Promise;
mongoose.set('debug', true);
const dbConfig = config.get('dbConfig');
if (config.util.getEnv('NODE_ENV') !== 'standalone') {
  mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.name}`, dbConfig.options);
}

/* --- API middleware --- */
server.set('view engine', 'ejs');
// body parser setup
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());

// error handling specific to body parser only
server.use((error, request, response, next) => {
  if (error instanceof SyntaxError || error instanceof TypeError) {
    // console.error(error);
    return next(new APIError(400, 'Bad Request', 'Malformed JSON.'));
  }
  return next();
});

require('./handlers/auth');
//config api route
server.use('/api', apiRoute);
// config auth route
server.use('/', authRoute);

// response headers setup
server.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Correlation-Id');
  response.header('Access-Control-Allow-Methods', 'POST,GET,PATCH,DELETE');
  response.header('Access-Control-Expose-Headers', 'Correlation-Id');
  response.header('Correlation-Id', correlationId);
  response.header('Content-Type', 'application/json');
  return next();
});

/* Generic 404 error-maker for routes that do not contain resources */
server.get('*', (request, response, next) => {
  const err = new APIError(404, 'Resource Not Found.', `${request.path} is not valid path to a Boilerplate API resource.`);
  return next(err);
});

server.use(errorHandler);

server.listen(3000, () => {
  console.log('API express server is listening on port 3000...');
});
