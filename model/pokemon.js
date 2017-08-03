'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true }
});

module.exports = mongoose.model('pokemon', pokemonSchema);