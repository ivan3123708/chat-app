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
  },
  serverMessage: (callback) => {
    socket.on('serverMessage', (message) => {
      callback(message);
    });
  }
};

const socketEmit = {
  joinUser: (userName) => {
    socket.emit('joinUser', userName, (err) => {
      if (err) {
        console.log('ERROR');
      } else {
        console.log(`${userName} JOINED`);
      }
    });
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