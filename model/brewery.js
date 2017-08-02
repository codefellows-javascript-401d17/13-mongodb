'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = Schema ({
  name: {type: String, require: true},
  address: {type: String, require: true},
  phoneNumber: {type: String, require: true},
  timestamp: {type: Date, require: true}
});

module.exports = mongoose.model('brewery', brewerySchema);
