'use strict';

// const eventEmitter = require('../hub.js');
const handler = require('./handler.js');

// jest.mock('../hub.js', () => {
//   return{
//     on: jest.fn(),
//     emit: jest.fn(),
//   };
// });

describe('Driver Handlers', () => {
  it('Should log pickup and emit in-transit event', () => {
    console.log = jest.fn();

    const order = {
      orderId: '54321',
      customer: 'Mary Jane',
    };

    const mockEmitter = {
      on: jest.fn(),
      emit: jest.fn(),
    };
    
    handler.pickup(order, mockEmitter);

    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up order #54321');
    expect(mockEmitter.emit).toHaveBeenCalledWith('in-transit', order);
  });
});

