const mockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
};

// require('./index.js');
let handler = require('../playerOne/index.js');

jest.mock('socket.io-client', () => {
  return {
    connect: () => mockSocket,  // our mockSocket will be returned when the connect method is called.
  };
});

beforeEach(() => {
  jest.useFakeTimers(); // mocks timeout functionality
  jest.spyOn(console, 'log'); // keep our logger functionality, and spy on the invocation
});

describe('Server Tests', () => {
  it('should handle a new connection to the game namespace', () => {
    mockSocket.emit('connection', {});
    handler.guess();
    expect(mockSocket.on).toHaveBeenCalled();
  });

  it('should handle a guess event', () => {
    const guessObj = {
      playerId: 'Chester',
      guess: Math.floor(Math.random() * 20) + 1,
    };
    mockSocket.emit('guess', guessObj);
    expect(mockSocket.on).toHaveBeenCalled();
  });
});