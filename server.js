'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('bew:server');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  debug(`listening on ${PORT}`);
});
