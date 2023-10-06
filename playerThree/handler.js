'use strict';

const socket = require('socket.io-client')('http://localhost:3002/game');

module.exports = {
  guess: () => {
    const sendGuess = {
      playerId: 'Kat',
      guess: Math.floor(Math.random() * 20) + 1,
    };
    console.log('Kat is sending number guess');
    socket.emit('guess', sendGuess);
  },
};
