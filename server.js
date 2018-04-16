const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');
const { Users } = require('./utils/Users');
const { Rooms } = require('./utils/Rooms');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, 'client', 'public');

const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('userJoin', (nickname, callback) => {
    users.addUser(socket.id, nickname);
    socket.emit('setUser', users.getUser(socket.id));
    io.emit('updateUsers', users.getUsers());

    socket.join('Home Chat');
    socket.room = 'Home Chat';
    
    rooms.addRoom('Home Chat');
    socket.emit('setRoom', socket.room);
    io.emit('updateRooms', rooms.getRooms());
    
    callback();
  });

  socket.on('joinRoom', (newRoom) => {
    socket.leave(socket.room);

    socket.join(newRoom);
    socket.room = newRoom;

    rooms.addRoom(newRoom);
    socket.emit('setRoom', socket.room);
    io.emit('updateRooms', rooms.getRooms());
  });

  socket.on('clientMessage', (text) => {
    const message = {
      sender: users.getUser(socket.id).nickname,
      text: text,
      time: moment().format('HH:mm')
    }
    io.to(socket.room).emit('serverMessage', message);
  });

  socket.on('disconnect', () => {
    users.removeUser(socket.id);
    io.emit('updateUsers', users.getUsers());

    socket.leave(socket.room);
    console.log('User disconnected');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(3000, () => {
  console.log('SERVER NOW RUNNING...');
});