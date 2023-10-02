'use strict';

const eventEmitter = require('../hub.js');
const handler = require('./handler.js');


eventEmitter.on('pickup', handler.pickup);