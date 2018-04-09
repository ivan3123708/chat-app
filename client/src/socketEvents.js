
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const serverMessageListener = (callback) => {
  socket.on('serverMessage', (text) => callback(text));
};

const clientMessageEmitter = (text) => {
  socket.emit('clientMessage', text);
};

export { serverMessageListener, clientMessageEmitter };