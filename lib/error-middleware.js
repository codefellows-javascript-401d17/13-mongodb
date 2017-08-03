'use strict';

const createError = require('http-errors');
const debug = require('debug')('superhero:error-middleware');

module.exports = function(err, req, res, next) {
  console.error(err.message);
  console.error(err.name);

  if (err.name === 'ValidationError') {
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if (err.name === 'CastError') {
    err = createError(404, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if (err.status) {
    debug('user error');

    res.status(err.status).send(err.name);
    next();
    return;
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
