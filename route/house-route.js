'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('house:house-router');
const House = require('../model/house.js');
const houseRouter = module.exports = new Router();

houseRouter.post('/api/house', jsonParser, function(req, res, next) {
  debug('POST: /api/house');

  req.body.timestamp = new Date();
  new House(req.body).save()
  .then(house => res.json(house))
  .catch(next);
});

houseRouter.get('api/house/:id', function(req, res, next) {
  debug('GET: /api/house');

  House.findById(req.params.id)
  .then(house => res.json(house))
  .catch(next);
});
