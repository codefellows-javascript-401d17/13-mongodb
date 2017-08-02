'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:server');
const cors = require('cors');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const bandRouter = require('./routes/band-router.js');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/ledzeppelin';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors);
app.use(morgan('dev'));
app.use(bandRouter);

app.listen(PORT, () => {
  debug('Server active on port: ', PORT);
});
