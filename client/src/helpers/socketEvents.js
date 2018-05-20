import socketIOClient from 'socket.io-client';

// use 'http://localhost:3000' when in development mode
const socket = socketIOClient('/');

const socketOn = {
  updateUser: (callback) => {
    socket.on('updateUser', (user) => {
      callback(user);
    });
  },
  updateUsers: (callback) => {
    socket.on('updateUsers', (users) => {
      callback(users);
    });
  },
  updateRoom: (callback) => {
    socket.on('updateRoom', (room) => {
      callback(room);
    });
  },
  updateRooms: (callback) => {
    socket.on('updateRooms', (rooms) => {
      callback(rooms);
    });
  },
};

const socketEmit = {
  joinUser: (userName, callback) => {
    socket.emit('joinUser', userName, err => callback(err));
  },
  joinRoom: (roomName, password, callback) => {
    socket.emit('joinRoom', { roomName, password }, err => callback(err));
  },
  leaveRoom: (roomName) => {
    socket.emit('leaveRoom', roomName);
  },
  clientMessage: (text, roomName) => {
    socket.emit('clientMessage', { text, roomName });
  },
  getAvatar: () => {
    socket.emit('getAvatar');
  },
};

export { socketOn, socketEmit };
