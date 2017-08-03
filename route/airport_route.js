const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('airport:airport-router');
const Airport = require('../model/airport.js');
const airportRouter = module.exports = new Router();

airportRouter.post('/api/airport', jsonParser, function (req, res, next) {
  debug('POST: /api/airport');

  new Airport(req.body).save()
    .then(airport => res.json(airport))
    .catch(next);
});

airportRouter.put('/api/airport/:id', jsonParser, function (req, rsp, next) {
  debug('PUT: /api/airport/:id');

  Airport.findByIdAndUpdate(req.params.id, req.body)
    .then((airport) => {
      return rsp.json(airport);
    })
    .catch((err) => {
      next();
    })
})

airportRouter.get('/api/airport/:id', function (req, rsp, next) {
  debug('GET: /api/airport');
  Airport.findById(req.params.id)
    .then((airport) => {
      return rsp.json(airport);
    })
    .catch((err) => {
      next();
    })
})

airportRouter.delete('/api/airport/:id', function (req, rsp, next) {
  debug('DELETE: /api/airport');
  Airport.findByIdAndRemove(req.params.id)
    .then((done) => {
      done();
    })
    .catch((err) => {
      next();
    })
})