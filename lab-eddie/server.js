'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:server');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  debug('Server active on port: ', PORT);
})
