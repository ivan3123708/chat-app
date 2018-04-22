import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

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
      callback(rooms)
    });
  }
};

const socketEmit = {
  joinUser: (userName) => {
    socket.emit('joinUser', userName);
  },
  joinRoom: (roomName) => {
    socket.emit('joinRoom', roomName);
  },
  leaveRoom: (roomName) => {
    socket.emit('leaveRoom', roomName);
  },
  clientMessage: (text, roomName) => {
    socket.emit('clientMessage', { text, roomName });
  }
};

export { socketOn, socketEmit };