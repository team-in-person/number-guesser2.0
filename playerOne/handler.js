'use strict';

const socket = require('socket.io-client')('http://localhost:3002/game');

module.exports = {
  guess: () => {
    const sendGuess = {
      playerId: 'Chester',
      guess: Math.floor(Math.random() * 20) + 1,
    };
    console.log('Chester is sending number guess');
    socket.emit('guess', sendGuess);
  },
};
