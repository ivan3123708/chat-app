const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, 'client', 'public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('say', (something) => {
    console.log('User said: ', something);
    io.sockets.emit('somethingSaid', something);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(3000, () => {
  console.log('SERVER NOW RUNNING...');
});