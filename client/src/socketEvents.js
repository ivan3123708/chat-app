import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const userJoinEmitter = (nickname) => {
  socket.emit('userJoin', nickname, (err) => {
    if (err) {
      console.log('ERROR');
    } else {
      console.log(`${nickname} JOINED`);
    }
  });
};

const serverMessageListener = (callback) => {
  socket.on('serverMessage', (message) => callback(message));
};

const clientMessageEmitter = (text) => {
  socket.emit('clientMessage', text);
};

export { userJoinEmitter, serverMessageListener, clientMessageEmitter };