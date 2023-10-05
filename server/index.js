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

  socket.on('guess', (playerId, guess) => {
    guesses.push({ playerId, guess });

    // If two players have guessed
    if (guesses.length === 2) {
      const player1Diff = Math.abs(randomNum - guesses[0].guess);
      const player2Diff = Math.abs(randomNum - guesses[1].guess);
      
      let winnerId;
      if (player1Diff < player2Diff) {
        winnerId = guesses[0].playerId;
      } else if (player1Diff > player2Diff) {
        winnerId = guesses[1].playerId;
      } else {
        winnerId = 'Tie'; // In case of a tie
      }

      // Broadcast the winner
      broadcastToRoom('game', 'winner', { winnerId, correctNumber: randomNum });

      // Optionally start a new game immediately or let the interval handle it
      startNewGame();
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

