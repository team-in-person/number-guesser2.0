'use strict';

const eventEmitter = require('../eventPool.js');
const handleDelivered = require('./handler.js');

eventEmitter.on('delivered', handleDelivered);
