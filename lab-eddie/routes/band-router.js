'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('song:band-route');
const Band = require('../model/band.js');
const bandRouter = module.exports = new Router();


bandRouter.post('/api/band/', jsonParser, function(req, res, next) {
  debug('POST: /api/band');

  new Band(req.body).save()
  .then(band => res.json(band))
  .catch(err => next(createError(400, err.message)));

});

bandRouter.get('/api/band/:id', function(req, res, next) {
  debug('GET: /api/band/:id');
  Band.findById(req.params.id)
  .then( band => res.json(band))
  .catch(err => next(createError(404, err.message)));
});

bandRouter.get('/', function(req, res, next) {
  debug('GET: /');
  res.send('This is a test')
  res.end();
});

bandRouter.get('/api/band/', function(req, res, next) {
  debug('GET: /api/band');
  console.log('recieved');
  Band.find({})
  .then( band => res.json(band))
  .catch(err => next(createError(404, err.message)));
});

bandRouter.delete('/api/band/:id', function(req, res, next) {
  debug('DELETE: /api/band');

  Band.findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(204);
      res.send('Item deleted');
      res.end();
    })
    .catch(err => next(createError(400, err.message)));
});

bandRouter.put('/api/band/:id', function(req, res, next) {
  debug('PUT: /api/band/:id');
  console.log(req.body);

  Band.findByIdAndUpdate(req.params.id, req.body)
    .then(band => {
      res.json(band);
    })
    .catch(err => next(createError(400, err.message)));
});


