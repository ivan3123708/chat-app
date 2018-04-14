import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const setUserListener = (callback) => {
  socket.on('setUser', (user) => {
    callback(user);
  });
};

const userJoinEmitter = (nickname) => {
  socket.emit('userJoin', nickname, (err) => {
    if (err) {
      console.log('ERROR');
    } else {
      console.log(`${nickname} JOINED`);
    }
  });
};

const usersUpdateListener = (callback) => {
  socket.on('updateUsers', (users) => {
    callback(users);
  });
};

const joinRoomEmitter = (room) => {
  socket.emit('joinRoom', room);
};

const updateRoomsListener = (callback) => {
  socket.on('updateRooms', (rooms) => {
    callback(rooms)
  });
};

const serverMessageListener = (callback) => {
  socket.on('serverMessage', (message) => {
    callback(message);
  });
};

const clientMessageEmitter = (text) => {
  socket.emit('clientMessage', text);
};

export { setUserListener, userJoinEmitter, usersUpdateListener, joinRoomEmitter, updateRoomsListener, serverMessageListener, clientMessageEmitter };