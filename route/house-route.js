'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:house-route');
const House = require('../model/house.js');
const houseRouter = module.exports = new Router();

houseRouter.post('/api/house', jsonParser, function(request, response, next) {
  debug('POST: /api/house/');

  request.body.timestamp = new Date();
  new House(request.body).save()
  .then( house => response.json(house))
  .catch(next);
});

houseRouter.get('/api/house/:id', function(request, response, next) {
  debug('POST: /api/house/:id');

  House.findById(request.params.id)
  .then( list => response.json(list))
  .catch(next);
});
