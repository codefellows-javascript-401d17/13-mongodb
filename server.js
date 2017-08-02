const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('airport:server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGODB_URL = 'mongodb://localhost/airports_401';

app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, function() {
  debug(`listening on port ${PORT}`);
})