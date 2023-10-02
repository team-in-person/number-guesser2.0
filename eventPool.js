'use strict';


const hub = require('./hub.js');

hub.on('pickup', handleEvent);
hub.on('in-transit', handleEvent);
hub.on('delivered', handleEvent);

function handleEvent(payload) {
  console.log(`EVENT:`, {
    event: this.event,
    time: new Date().toISOString(),
    payload,
  });
}
