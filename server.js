'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('bakery:server');

const bakeryRouter = require('./route/bakery-route.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/bakery';

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use(cors());
app.use(morgan('dev'));
app.use(bakeryRouter);

app.listen(PORT, () => {
  debug(`Server on PORT: ${PORT}`);
});



