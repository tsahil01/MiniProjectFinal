// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },

});

// Allow CORS for Socket.io

// Use CORS middleware for regular HTTP requests
app.use(cors());

// Socket.io logic
io.on('connection', (socket:any) => {
  console.log('User connected');

  // Joining a room
  socket.on('joinRoom', (roomId:any) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handling text input
  socket.on('textInput', (data:any) => {
    console.log(`User input: ${data.text}`);
    io.to(data.roomId).emit('textInput', data.text);
  });

  // Disconnecting from the room
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
