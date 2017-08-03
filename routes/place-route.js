'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Place = require('../model/place.js');
const debug = require('debug')('place:place-route');
const placeRouter = module.exports = new Router();

placeRouter.get('/api/place/:id', function(req, res, next){
  debug('GET: /api/place/:id');

  Place.findById(req.params.id)
  .then((place) => res.json(place))
  .catch(() => next(createError(404, 'not found')));
});

placeRouter.get('/api/place', function(req, res, next){
  debug('GET: api/palce');

  Place.find()
  .then((places) => res.json(places))
  .catch((err) => next(err));
});

placeRouter.post('/api/place', jsonParser, function(req, res, next){
  debug('POST: /api/place');

  // QUESTION: why don't any of these work for checking for an empty object? They either don't work properly or time out.
  // if(!req.body.place) return Promise.reject(createError(400, 'no body'));
  // if(Object.keys(req.body).length === 0) return createError(400, 'no body');
  // for(let key in req.body){
  //   if(!key) return createError(400, 'no body');
  // }
  // if(!req.body.place) return createError(400, 'no body');
  // if(Object.keys(req.body).length === 0) return createError(400, 'no body');
  if(!req.body) return createError(400, 'no body');

  req.body.timestamp = new Date();
  new Place(req.body).save()
  .then((place) => res.json(place))
  .catch(() => next(createError(404, 'not found')));
});

placeRouter.put('/api/palce/:id', jsonParser, function(req, res, next){
  debug('PUT: /api/place/:id');

  if(!req.params.id) return createError(400, 'no id');
  if(!req.body) return createError(400, 'no body');

  Place.update({_id: req.params.id}, req.body)
  .then((place) => res.json(place))
  .catch(() => next(createError(404, 'not found')));
});

placeRouter.delete('/api/place/:id', function(req, res, next){
  debug('DELETE /api/place/:id');

  if(!req.params.id) return createError(400, 'no id');

  Place.findById(req.params.id).remove({})
  .then((place) => res.json(place))
  .catch(() => next(createError(404, 'not found')));
});
