'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bakery:bakery-router');
const Bakery = require('../model/bakery.js');
const bakeryRouter = module.exports = new Router();

bakeryRouter.post('/api/bakery', jsonParser, function(req, res, next) {
  debug('POST: /api/bakery');

  req.body.timestamp = new Date();
  new Bakery(req.body).save()
  .then( bakery => res.json(bakery))
  .catch(next);
});

bakeryRouter.get('/api/bakery/:id', function(req, res, next) {
  debug('GET: /api/bakery');

  Bakery.findById(req.params.id)
  .then( bakery => res.json(bakery))
  .catch(next);
});

bakeryRouter.put('/api/bakery/:id', function(req, res, next) {
  debug('PUT: /api/bakery');

  Bakery.findByIdAndUpdate(req.params.id)
  .then( bakery => res.json(bakery))
  .catch(next);
});

bakeryRouter.delete('/api/bakery/:id', function(req, res, next) {
  debug('DELETE: /api/bakery');

  Bakery.findByIdAndRemove(req.params.id)
  .then( bakery => res.status(204).send(bakery))
  .catch(next);
});