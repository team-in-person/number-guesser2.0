'use strict';

const PORT = process.env.PORT || 3002;

const EventEmitter = require('events');
const hub = new EventEmitter();

module.exports = hub;