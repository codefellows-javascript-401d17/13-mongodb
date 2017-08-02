const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('airport:airport-router');
const Airport = require('../model/airport.js');
const airportRouter = module.exports = new Router();

airportRouter.post('/api/airport', jsonParser, function (req, res, next) {
  debug('POST: /api/airport');

  req.body.timestamp = new Date();
  new Airport(req.body).save()
    .then(airport => res.json(airport))
    .catch(next);
});

