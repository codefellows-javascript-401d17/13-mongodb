'use strict';

const debug = require('debug')('app:band-router');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Band = require('../model/band.js');
const bandRouter = module.exports = new Router();


bandRouter.post('/api/band/', jsonParser, function(req, res, next) {
  debug('POST: /api/band');

  new Band(req.body).save()
  .then(band => res.json(band))
  .catch(next);

});

bandRouter.get('/api/band/:id', function(req, res, next) {
  debug('GET: /api/band/:id');
  Band.findById(req.params.id)
  .then( band => res.json(band))
  .catch(next);
});

bandRouter.get('/', function(req, res, next) {
  debug('GET: /');
  res.send('This is a test')
  res.end();
});

bandRouter.get('/api/band/', function(req, res, next) {
  debug('GET: /api/band');
  Band.find({})
  .then( band => res.json(band))
  .catch(next);
});

bandRouter.delete('/api/band/:id', function(req, res, next) {
  debug('DELETE: /api/band');

  Band.findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(204);
      res.send('Item deleted');
      res.end();
    })
    .catch(err => next(err));
});


