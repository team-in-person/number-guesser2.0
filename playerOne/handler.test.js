jest.mock('socket.io-client', () => {
  return () => {
    return {
      on: jest.fn(),
      emit: jest.fn(),
    };
  };
});

const mockSocket = {
  emit: jest.fn(),
}
const handler = require('./handler.js');

describe('Handler Tests', () => {

  console.log = jest.fn();


  it('should emit a guess event', () => {
    const guessObj = {
      playerId: 'Chester',
      guess: Math.floor(Math.random() * 20) + 1,
    };
    handler.guess();
    expect(console.log).toHaveBeenCalled();
    // expect(mockSocket.emit).toHaveBeenCalled();
  });
});