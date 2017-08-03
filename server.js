'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('place:server');

const placeRouter = require('./routes/place-route.js');
const errorMiddleWare = require('./lib/error-middleware.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/place';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(placeRouter);
app.use(errorMiddleWare);

app.listen(PORT, () => debug(`listening on PORT:${PORT}`));
