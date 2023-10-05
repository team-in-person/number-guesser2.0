'use strict';

const socket = require('socket.io-client')('http://localhost:3002/game');

module.exports = {
  guess: () => {
    const sendGuess = {
      playerId: 'Paul',
      guess: Math.floor(Math.random() * 20) + 1,
    };
    console.log('Paul is sending number guess');
    socket.emit('guess', sendGuess);
  },
};
