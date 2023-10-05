const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const vendorHandler = require('../clients/flowers-vendor/handler.js');
const driverHandler = require('../clients/driver/handler.js');

const app = express();
const PORT = 3002;
const server = http.createServer(app);
const io = socketIo(server);

const caps = io.of('/caps');

const messageQueue = {
  vendors: new Map(),   // Map to hold vendor messages
  drivers: new Map(),   // Map to hold driver messages
};

caps.on('connection', (socket) => {
  console.log('Connected', socket.id);

  socket.on('join', (room) => {
    console.log('Joined Room', room);
    socket.join(room);
  });

  // Pickup from vendor
  socket.on('pickup', (payload) => {
    console.log('SERVER: Received pickup event from vendor:', payload);
    if (!messageQueue.drivers.has('pickup')) {
      messageQueue.drivers.set('pickup',[]);
    }
    const queue = messageQueue.drivers.get('pickup');
    queue.push(payload);

    console.log('PICKUP', payload);
    socket.broadcast.emit('pickup', payload); 
  });

  // In-transit from driver
  socket.on('in-transit', (payload) => {
    console.log('SERVER: Received in-transit event from driver:', payload); 
    caps.to(payload.store).emit('in-transit', payload);
  });

  // Delivered from driver
  socket.on('delivered', (payload) => {
    console.log('SERVER: Received delivered event from driver:', payload);
    const { store } = payload;
    if (!messageQueue.vendors.has(store)) {
      messageQueue.vendors.set(store, []);
    }
    const queue = messageQueue.vendors.get(store);
    queue.push(payload);

    console.log('DELEIVERED', payload);
    caps.to(store).emit('delivered', payload);
  });

  // Remove message from queue when 'received' event is triggered
  socket.on('received', (ack) => {
    const { clientId, event, messageId } = ack;
  
    if (event === 'pickup' && messageQueue.drivers.has(event)) {
      const queue = messageQueue.drivers.get(event);
      const index = queue.findIndex(message => message.orderId === messageId);
      if (index !== -1) queue.splice(index, 1);
    }
  
    if (event === 'delivered' && messageQueue.vendors.has(clientId)) {
      const queue = messageQueue.vendors.get(clientId);
      const index = queue.findIndex(message => message.orderId === messageId);
      if (index !== -1) queue.splice(index, 1);
    }
  });
  
  // Handle 'getAll' event
  socket.on('getAll', (payload) => {
    const { clientId, event } = payload;
  
    if (event === 'pickup' && messageQueue.drivers.has(event)) {
      const messages = messageQueue.drivers.get(event);
      messages.forEach(message => socket.emit(event, message));
    }
  
    if (event === 'delivered' && messageQueue.vendors.has(clientId)) {
      const messages = messageQueue.vendors.get(clientId);
      messages.forEach(message => socket.emit(event, message));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});