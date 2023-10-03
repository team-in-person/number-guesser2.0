const express = require('express');
const events = require('./hub');
const vendorHandler = require('./vendor/handler');
const driverHandler = require('./driver/handler');
const app = express();
const PORT = 3002;

events.on('pickup', driverHandler.pickup);
events.on('delivered', vendorHandler.thank);

app.get('/simulate-pickup', (req, res) => {
  const storeName = '1-206-flowers'; 
  vendorHandler.pickup(storeName); 
  res.send('Simulated a pickup event!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

