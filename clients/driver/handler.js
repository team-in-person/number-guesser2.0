'use strict';

module.exports = {
  pickup: (message, socket) => { 
    const order = message;

    console.log(`DRIVER: picked up order #${order.orderId}`);

    // Emitting 'in-transit' to the server
    socket.emit('in-transit', order);

    setTimeout(()=> {
      console.log(`DRIVER: delivered order #${order.orderId}`);
      
      // Emitting 'delivered' to the server
      socket.emit('delivered', order);
    }, 10000);
  },
};