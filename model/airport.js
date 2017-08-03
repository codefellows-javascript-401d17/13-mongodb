const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createError = require('http-errors');

//require later
const airportSchema = new Schema({
  name : { type: String, required: true },
  iata : { type: String, required: false },
  city : { type: String, required: false }
});


module.exports = mongoose.model('Airport', airportSchema);