'use strict';

const debug = require('debug')('app:band-router');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Band = require('../model/band.js');
const bandRouter = module.exports = new Router;


