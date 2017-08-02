const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('airport:server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGODB_URL = 'mongodb://localhost/airports_401';
const Airport = require('./model/airport.js');
const airportRouter = require('./route/airport_route');

app.use(cors());
app.use(morgan('dev'));
app.use(airportRouter);

mongoose.connect(MONGODB_URL);

app.listen(PORT, function() {
  debug(`listening on port ${PORT}`);
})