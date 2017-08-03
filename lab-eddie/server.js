'use strict';

const morgan = require('morgan');
const debug = require('debug')('app:server');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');

const app = express();
const PORT = process.env.PORT || 3000;
const bandRouter = require('./routes/band-router.js');
const error = require('./lib/errors.js');
const MONGODB_URI = 'mongodb://localhost/bands';


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useMongoClient: true });

app.use(morgan('dev'));
app.use(cors());
app.use(bandRouter);
app.use(error)

app.listen(PORT, () => {
  debug('Server active on port: ', PORT);
});
