'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('brew:brewery-router');
const Brewery = require('../model/brewery.js');
const breweryRouter = module.exports = new Router();

breweryRouter.post('/api/brewery', jsonParser, function (req, res, next) {
  debug('POST: /api/brewery');

  req.body.timestamp = new Date();
  new Brewery(req.body).save()
  .then( brewery => res.json(brewery))
  .catch(next);
});

breweryRouter.get('/api/brewery/:id', function (req, res, next) {
  debug('GET: /api/brewery/:id');
  console.log('#$)(*#&)$*#&)$&', req.params.id);
  Brewery.findById(req.params.id)
  .then( brewery => res.json(brewery))
  .catch(next);
});

breweryRouter.put('/api/brewery/:id', function (req, res, next) {
  debug('GET: /api/brewery/:id');

  Brewery.findByIdAndUpdate(req.params.id, req.body)
  .then( brewery => res.json(brewery))
  .catch(next);
});

breweryRouter.delete('/api/brewery/:id', function (req, res, next) {
  debug('GET: /api/brewery/:id');

  Brewery.findByIdAndRemove(req.params.id)
  .catch(next);
});
