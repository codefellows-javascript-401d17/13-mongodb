'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cUniverseSchema = Schema({
  superhero: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('cUniverse', cUniverseSchema);
