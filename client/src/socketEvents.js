import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

export const setUserListener = (callback) => {
  socket.on('setUser', (user) => {
    callback(user);
  });
};

export const userJoinEmitter = (nickname) => {
  socket.emit('userJoin', nickname, (err) => {
    if (err) {
      console.log('ERROR');
    } else {
      console.log(`${nickname} JOINED`);
    }
  });
};

export const usersUpdateListener = (callback) => {
  socket.on('updateUsers', (users) => {
    callback(users);
  });
};

export const setRoomListener = (callback) => {
  socket.on('setRoom', (room) => {
    callback(room);
  });
};

export const joinRoomEmitter = (room) => {
  socket.emit('joinRoom', room);
};

export const updateRoomsListener = (callback) => {
  socket.on('updateRooms', (rooms) => {
    callback(rooms)
  });
};

export const serverMessageListener = (callback) => {
  socket.on('serverMessage', (message) => {
    callback(message);
  });
};

export const clientMessageEmitter = (text) => {
  socket.emit('clientMessage', text);
};