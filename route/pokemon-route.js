'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('pokemon:pokemon-router');
const Pokemon = require('../model/pokemon.js');
const pokemonRouter = module.exports = new Router();

pokemonRouter.post('/api/pokemon', jsonParser, function (req, res, next) {
  debug('POST: /api/pokemon');

  req.body.timestamp = new Date();
  new Pokemon(req.body).save()
  .then(pokemon => res.json(pokemon))
  .catch(next);
});

pokemonRouter.get('/api/pokemon/:id',  function (req, res, next) {
  debug('GET: /api/pokemon/:id');
  Pokemon.findById(req.params.id)
  .then(pokemon => res.json(pokemon))
  .catch(next);
});

pokemonRouter.put('/api/pokemon/:id', jsonParser, (req, res, next) => {
  debug('PUT /api/pokemons/:id');

  if (Object.keys(req.body).length === 0) {
    Pokemon.findById(req.params.id)
      .then(pokemon => {
        res.status(400);
        res.json(pokemon);
      })
      .catch(next);
    return;
  }

  let options = {
    runValidator: true,
    new: true,
  };

  Pokemon.findByIdAndUpdate(req.params.id, req.body, options)
    .then(pokemon => res.json(pokemon))
    .catch(next);
});

pokemonRouter.delete('/api/pokemon/:id', function (req, res, next) {
  debug('GET: /api/pokemon/:id');

  Pokemon.findByIdAndRemove(req.params.id)
  .catch(next);
});