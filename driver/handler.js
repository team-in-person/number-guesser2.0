'use strict';

const eventEmitter = require('../hub');

module.exports = {
  pickup: (order) => {
    console.log(`DRIVER: picked up order #${order.orderId}`);

    eventEmitter.emit('in-transit', order);

    setTimeout(()=> {
      console.log(`DRIVER: delivered order #${order.orderId}`);
      eventEmitter.emit('delivered', order);
    }, 3000);
  },
};
