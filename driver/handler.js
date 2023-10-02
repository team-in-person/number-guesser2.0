'use strict';

const eventEmitter = require('../eventPool');

function handleDelivered(payload) {
  console.log('The package has been delivered!', payload);
  eventEmitter.emit('delivered', payload);
}

module.exports = handleDelivered;

