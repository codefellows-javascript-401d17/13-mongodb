'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Number, required: true },
  genre: { type: String, required: true }
});

module.exports = mongoose.model('book', bookSchema);