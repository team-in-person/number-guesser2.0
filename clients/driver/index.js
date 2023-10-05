'use strict';

const socket = require('socket.io-client')('http://localhost:3002/caps');
const handler = require('./handler.js');

// Log when the socket connects to the server.
socket.on('connect', () => {
  console.log(`Driver connected with ID: ${socket.id}`);
});

// Error handling
socket.on('error', (error) => {
  console.error('Socket Error:', error);
});

// Log when the driver receives a 'pickup' event and then call the handler.
socket.on('pickup', (order) => {
  console.log('DRIVER: Received a pickup event from server:', order);
  handler.pickup(order, socket);
});

socket.on('pickup', (message) => {
  handler.pickup(message, socket);

  // Acknowledge the reception of the message
  socket.emit('received', {
    clientId: 'driver',
    event: 'pickup',
    messageId: message.orderId,
  });
});

// Fetch all undelivered messages for this driver related to pickups
socket.emit('getAll', { clientId: 'driver', event: 'pickup' });
