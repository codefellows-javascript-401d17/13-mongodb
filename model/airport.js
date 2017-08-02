const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//require later
const airportSchema = new Schema({
  name : { type: String, require: true },
  iata : { type: String, require: false },
  city : { type: String, require: false }
});


module.exports = mongoose.model('Airport', airportSchema);