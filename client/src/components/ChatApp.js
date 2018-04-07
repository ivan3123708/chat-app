import React from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

class ChatApp extends React.Component {

  state = {
    message: 'Nothing'
  }

  say = (something) => {
    socket.emit('say', something);
  }

  render() {

    socket.on('somethingSaid', (something) => {
      this.setState({ message: something })
    });
    
    return (
      <div>
        <h1>{this.state.message}</h1>
        <button onClick={() => this.say('Hello World')}>Say Hello World</button>
        <button onClick={() => this.say('Goodbye World')}>Say Goodbye World</button>
      </div>
    );
  }
}

export default ChatApp;