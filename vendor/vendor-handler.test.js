'use strict';

const events = require('../hub');
const handler = require('./handler');

jest.mock('../hub', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Vendor Handlers', () => {
  it('Should emit a pickup event with correct payload', () => {
    const vendorName = 'Super Supplier';
    handler.pickup(vendorName);

    expect(events.emit).toHaveBeenCalled();
    expect(events.emit.mock.calls[0][0]).toBe('pickup');
    expect(events.emit.mock.calls[0][1]).toHaveProperty('store', vendorName);
  });
  
  it('Should Thank for the delivery', () => {
    console.log = jest.fn();

    const order = {
      orderId: '12345',
      customer: 'John Doe',
    };

    handler.thank(order);

    expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 12345 to John Doe');
  });
});

