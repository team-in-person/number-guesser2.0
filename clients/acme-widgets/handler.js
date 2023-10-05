'use strict';

const Chance = require('chance');
const chance = new Chance();

const socket = require('socket.io-client')('http://localhost:3002/caps');


module.exports = {
  pickup: (storeName) => {
    const order = {
      store: storeName,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.city() + ', ' + chance.state(),
    };
    console.log('Acme-Widgets: Emitting a pickup event');

    // Emitting the 'pickup' event to the server
    console.log('Emitting pickup with payload:', order);
    socket.emit('pickup', order);
  },
  
  thank: (message) => {
    const order = message.order;
    console.log(`Acme-Widgets: Thank you for delivering ${order.orderId} to ${order.customer}`);
  },
};
