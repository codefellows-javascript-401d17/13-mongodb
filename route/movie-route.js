'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('actor:movie-router');
const Movie = require('../model/movie.js');
const movieRouter = module.exports = new Router();

movieRouter.post('/api/movie', jsonParser, function(req, res, next) {
  debug('POST: /api/movie');

  req.body.dateReleased = new Date();
  new Movie(req.body).save()
  .then( movie => res.json(movie))
  .catch(next);
});

movieRouter.get('/api/movie/:id', function(req, res, next) {
  debug('GET: /api/movie');

  Movie.findById(req.params.id)
    .then( movie => res.json(movie))
    .catch(next);
});
