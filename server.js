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

  socket.on('joinUser', (userName, callback) => {
    users.addUser(socket.id, userName);
    rooms.addUser(userName, 'Home Chat');

    socket.join('Home Chat');
    socket.room = 'Home Chat';

    io.emit('updateUsers', users.getUsers());
    socket.emit('updateUser', users.getUser(socket.id));
    io.emit('updateRooms', rooms.getRooms());
    socket.emit('updateRoom', rooms.getRoom(socket.room));

    callback();
  });

  socket.on('joinRoom', (roomName) => {
    users.addRoom(socket.id, roomName);
    rooms.addRoom(roomName);
    rooms.addUser(users.getUser(socket.id).name, roomName);

    socket.join(roomName);
    socket.room = roomName;

    io.emit('updateUsers', users.getUsers());
    socket.emit('updateUser', users.getUser(socket.id));
    io.emit('updateRooms', rooms.getRooms());
    socket.emit('updateRoom', rooms.getRoom(socket.room));
  });

  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);

    rooms.removeUser(users.getUser(socket.id).name, roomName);
    users.removeRoom(socket.id, roomName);
    
    io.emit('updateRooms', rooms.getRooms());
    io.emit('updateUsers', users.getUsers());
  })

  socket.on('clientMessage', (data) => {
    const message = {
      sender: users.getUser(socket.id).name,
      text: data.text,
      time: moment().format('HH:mm')
    }
    io.to(data.roomName).emit('serverMessage', message);
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