const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const multer = require('multer');
const moment = require('moment');
const { Users } = require('./constructors/Users');
const { Rooms } = require('./constructors/Rooms');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, 'client', 'public');

const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './client/public/img/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

app.post('/api/avatar', upload.single('avatar'), (req, res) => {
  users.updateAvatar(req.body.id, req.file.filename);

  res.send(req.file);
});

io.on('connection', (socket) => {

  socket.on('joinUser', (userName, callback) => {
    const err = users.addUser(socket.id, userName);

    if (err) {
      return callback(err);
    }

    rooms.addUser(userName, 'Home Chat');

    socket.join('Home Chat');
    socket.room = 'Home Chat';

    io.emit('updateUsers', users.getUsers());
    socket.emit('updateUser', users.getUser(socket.id));
    io.emit('updateRooms', rooms.getRooms());
    socket.emit('updateRoom', rooms.getRoom(socket.room));
  });

  socket.on('joinRoom', (data, callback) => {
    const roomName = data.roomName;
    const password = data.password || null;
    const room = rooms.getRoom(roomName);

    if (room && room.password !== password) {
      callback('Wrong password');
    } else {
      users.addRoom(socket.id, roomName);
      rooms.addRoom(roomName, password);
      rooms.addUser(users.getUser(socket.id).name, roomName);

      socket.join(roomName);
      socket.room = roomName;

      io.emit('updateUsers', users.getUsers());
      socket.emit('updateUser', users.getUser(socket.id));
      io.emit('updateRooms', rooms.getRooms());
      socket.emit('updateRoom', rooms.getRoom(socket.room));

      callback(null);
    }
  });

  socket.on('leaveRoom', (roomName) => {
    rooms.removeUser(users.getUser(socket.id).name, roomName);
    users.removeRoom(socket.id, roomName);
    
    socket.leave(roomName);
    const user = users.getUser(socket.id);
    socket.room = user.rooms[user.rooms.length - 1];

    socket.emit('updateRoom', rooms.getRoom(socket.room));
    io.emit('updateUsers', users.getUsers());
    socket.emit('updateUser', users.getUser(socket.id));
    io.emit('updateRooms', rooms.getRooms());
  });

  socket.on('clientMessage', (data) => {
    const room = rooms.getRoom(data.roomName);
    const message = {
      sender: users.getUser(socket.id),
      text: data.text,
      time: moment().format('HH:mm')
    }

    if (room.messages.length && message.sender === room.messages[room.messages.length - 1].sender) {
      message.consecutive = true;
    }
    
    rooms.addMessage(message, data.roomName);

    io.emit('updateRooms', rooms.getRooms());
  });

  socket.on('getAvatar', () => {
    io.emit('updateUsers', users.getUsers());
    socket.emit('updateUser', users.getUser(socket.id));
    socket.emit('updateRoom', rooms.getRoom(socket.room));
    io.emit('updateRooms', rooms.getRooms());
  })

  socket.on('disconnect', () => {
    const user = users.getUser(socket.id);

    user && user.rooms.forEach((room) => {
      rooms.removeUser(users.getUser(socket.id).name, room);
    });
    users.removeUser(socket.id);
    
    socket.leave(socket.room);

    io.emit('updateRooms', rooms.getRooms());
    io.emit('updateUsers', users.getUsers());
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

server.listen(3000, () => {
  console.log('SERVER NOW RUNNING...');
});