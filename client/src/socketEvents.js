import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const socketOn = {
  setUser: (callback) => {
    socket.on('setUser', (user) => {
      callback(user);
    });
  },
  updateUsers: (callback) => {
    socket.on('updateUsers', (users) => {
      callback(users);
    });
  },
  setRoom: (callback) => {
    socket.on('setRoom', (room) => {
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
  userJoin: (userName) => {
    socket.emit('userJoin', userName, (err) => {
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
  clientMessage: (text) => {
    socket.emit('clientMessage', text);
  }
};

export { socketOn, socketEmit };