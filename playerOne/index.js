'use strict';

const socket = require('socket.io-client')('http://localhost:3002/game');
const handler = require('./handler.js');

// Connect to the server and join the game room
socket.on('connect', () => {
  // socket.emit('guess', 'Player TWo');
  setInterval(() => {
    // console.log('PLAYER TWO sending number guess');
    handler.guess();
  }, 10000); // 10 SECOND INTERVALS
});
