'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:car-router');
const car = require('../model/car.js');
const carRouter = module.exports = new Router();

carRouter.post('/api/car', jsonParser, function(req, res, next) {
    debug('POST: /api/car');

    req.body.timestamp = new Date();
    new car(req.body).save()
        .then(car => res.json(car))
        .catch(next);
});

carRouter.get('/api/car/:id', function(req, res, next) {
    debug('GET: /api/car');

    car.findById(req.params.id)
        .then(car => res.json(car))
        .catch(next);
});