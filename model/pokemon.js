'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  gen: {type: String, require: true},
  timestamp: {type: Date, required: true}
});

module.exports = mongoose.model('pokemon', pokemonSchema);