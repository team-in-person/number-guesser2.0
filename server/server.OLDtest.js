// const SocketIOMock = require('socket.io-mock');
// const server = require('./index.js');

// describe('Server Tests', () => {
//   let socket;

//   beforeEach(() => {
//     socket = new SocketIOMock();
//   });

//   it('should handle a new connection to the game namespace', () => {
//     socket.socketClient.emit('connection', {});
//     expect(socket.socketServer.on).toHaveBeenCalledWith('connection', expect.any(Function));
//   });

//   it('should handle a guess event', () => {
//     const guessObj = {
//       playerId: 'Chester',
//       guess: Math.floor(Math.random() * 20) + 1,
//     };
//     socket.socketClient.emit('guess', guessObj);
//     expect(socket.socketServer.on).toHaveBeenCalledWith('guess', expect.any(Function));
//   });
// });

