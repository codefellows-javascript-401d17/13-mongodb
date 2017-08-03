'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('app:band');
const Schema = mongoose.Schema;

const bandSchema = Schema({
  name: {type: String, required: true},
  genre: {type: String, required: true},
  members: {type: Object, required: false},
  hometown: {type: String, required: true}
});

module.exports = mongoose.model('band', bandSchema);
