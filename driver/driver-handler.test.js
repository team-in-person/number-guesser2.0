'use strict';

const eventEmitter = require('../hub.js');
const handler = require('./handler.js');

jest.mock('../hub', () => {
  return{
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Driver Handlers', () => {
  it('Should log pickup and emit in-transit event', () => {
    console.log = jest.fn();

    const order = {
      orderId: '54321',
      customer: 'Mary Jane',
    };
    
    handler.pickup(order);

    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up order #54321');
    expect(eventEmitter.emit).toHaveBeenCalledWith('in-transit', order);
  });
});

