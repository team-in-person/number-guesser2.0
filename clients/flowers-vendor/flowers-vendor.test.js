'use strict';

const io = require('socket.io-client');

describe('Vendor Client Application', () => {
  let socket;

  // Connect to the server before running tests
  beforeAll((done) => {
    socket = io('http://localhost:3002/caps');
    socket.on('connect', done);
  }, 10000); // Setting timeout to 10 seconds

  // Disconnect after tests are complete
  afterAll(() => {
    socket.disconnect();
  });

  it('should emit pickup event with correct payload', (done) => {
    const testPayload = {
      store: '1-800-Flowers',
      orderId: 'testOrder123',
      customer: 'John Doe',
      address: '123 Main St',
    };

    socket.emit('pickup', testPayload);

    socket.on('pickup', (payload) => {
      expect(payload).toEqual(testPayload);
      done();
    });
  }, 10000);  // Setting timeout to 10 seconds
});
