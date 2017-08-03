'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = Schema({
  place: {type: String, required: true},
  timestamp: {type: Date, required: true}
});

module.exports = mongoose.model('place', placeSchema);
