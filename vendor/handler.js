'use strict';

const eventEmitter = require('../hub');
const Chance = require('chance');
const chance = new Chance();

module.exports = {
  pickup: (storeName) => {
    const order = {
      store: storeName,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.city() + ', ' + chance.state(),
    };
    console.log('VENDOR: Emitting a pickup event');
    eventEmitter.emit('pickup', order);
  },

  thank: (order) => {
    console.log(`VENDOR: Thank you for delivering ${order.orderId} to ${order.customer}`);
  },
};
