const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const PORT = 3002;
const server = http.createServer(app);
const io = socketIo(server);

const gameServer = io.of('/game');

let randomNum = Math.floor(Math.random() * 20) + 1;
let guesses = [];

function broadcastToRoom(room, event, payload) {
  gameServer.to(room).emit(event, payload);
}

function startNewGame() {
  randomNum = Math.floor(Math.random() * 20) + 1;
  guesses = [];  // Reset guesses
  broadcastToRoom('game', 'new-game', 'New game! Guess a number between 1 and 20.');
}

const gameInterval = setInterval(startNewGame, 10000);

gameServer.on('connection', (socket) => {
  console.log(`Client connected to 'game' namespace: ${socket.id}`);

  socket.on('join', (playerId) => {
    socket.join(playerId);
    console.log(`Socket ${socket.id} joined game room: ${playerId}`);
  });

  socket.on('guess', guessObj => {
    console.log(guessObj);
    let { guess, playerId } = guessObj; 
    guesses.push({ guess, playerId });

    // If two players have guessed
    if (guesses.length === 4) {
      let closestPlayerId = guesses[0].playerId;
      let closestDiff = Math.abs(randomNum - guesses[0].guess);
  
      for (let i = 1; i < 4; i++) {
        const currentDiff = Math.abs(randomNum - guesses[i].guess);
  
        if (currentDiff < closestDiff) {
          closestPlayerId = guesses[i].playerId;
          closestDiff = currentDiff;
        } else if (currentDiff === closestDiff) {
          closestPlayerId = 'Tie'; // If there's a tie, this will overwrite the closest player. If more players have the same tie, it will remain as 'Tie'
        }
      }
      console.log(`The winner is ${closestPlayerId}, the correct number was ${randomNum}`);
      // Broadcast the winner
      broadcastToRoom('game', 'winner', { winnerId: closestPlayerId, correctNumber: randomNum });

      // Optionally start a new game immediately or let the interval handle it
      startNewGame();
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

