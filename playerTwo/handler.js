'use strict';

const socket = require('socket.io-client')('http://localhost:3002/caps');

module.exports = {
  guess: () => {
    const sendGuess = {
      playerId: PlayerTwo,
      guess: Math.floor(Math.random() * 20) + 1,
    };
    console.log('PLAYER TWO sending number guess');
    socket.emit('guess', sendGuess);
  },
};
