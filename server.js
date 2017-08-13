'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('note:server');
const houseRouter = require('./route/house-route.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/houses-app';

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(houseRouter);

app.listen(PORT, () => {
  debug(`listening on: ${PORT}`);
});
