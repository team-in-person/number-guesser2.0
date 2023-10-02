const events = require ('../hub.js');
const handler = require ('./handler.js');

function handlePickup() {
  const vendorName = 'Super Supplier';
  handler.pickup(vendorName);
} 

handlePickup();

events.on('delivered', handler.thank);