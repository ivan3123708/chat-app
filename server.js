const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const { Users } = require('./utils/Users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, 'client', 'public');

const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('userJoin', (nickname, callback) => {
    users.addUser(socket.id, nickname);
    io.emit('updateUsers', users.getUsers());
    callback();
  });

  socket.on('clientMessage', (text) => {
    const message = {
      sender: users.getUser(socket.id).nickname,
      text: text,
      time: moment().format('HH:mm')
    }
    io.emit('serverMessage', message);
    console.log(`${message.sender} sent: ${text}`);
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