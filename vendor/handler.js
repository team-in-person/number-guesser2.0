const events = require('../hub');
const Chance = require('chance');
const chance = new Chance();

module.exports = {
  pickup: (storeName) => {
    const order = {
      store: storeName,
      orderId: chance.guild(),
      customer: chance.name(),
      address: chance.city() + ', ' + chance.state(),
    };
    console.log('VENDOR: Emitting a pickup event');
    events.emit('pickup', order);
  },

  thank: (order) => {
    console.log(`VENDOR: Thank you for delivering ${order.orderId} to ${order.customer}`);
  },
};
