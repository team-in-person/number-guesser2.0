const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const vendorHandler = require('../vendor/handler');
const driverHandler = require('../driver/handler');

const app = express();
const PORT = 3002;
const server = http.createServer(app);
const io = socketIo(server);

const caps = io.of('/caps');

caps.on('connection', (socket) => {
  // console.log('Connected', socket.id);

  socket.on('join', (room) => {
    console.log('Joined Room', room);
    socket.join(room);
  });

  // Pickup from vendor
  socket.on('pickup', (payload) => {
    console.log('SERVER: Received pickup event from vendor:', payload);
    socket.broadcast.emit('pickup', payload); 
  });

  // In-transit from driver
  socket.on('in-transit', (payload) => {
    console.log('SERVER: Received in-transit event from driver:', payload); 
    caps.to(payload.store).emit('in-transit', payload);
  });

  // Delivered from driver
  socket.on('delivered', (payload) => {
    console.log('SERVER: Received delivered event from driver:', payload);
    caps.to(payload.store).emit('delivered', payload);
  });
});

app.get('/simulate-pickup', (req, res) => {
  const storeName = '1-206-flowers'; 
  // We don't need to simulate this here since your vendor client should be doing this
  res.send('Simulated a pickup event!');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});