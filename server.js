'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require ('debug')('hike:server');
// const listRouter = require('./route/hike-route.js');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost/listofhikes';

mongoose.Promise= Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
// app.use(listRouter);

app.listen(PORT, ()=> {
  debug(`listening on pr ${PORT}`);
});
