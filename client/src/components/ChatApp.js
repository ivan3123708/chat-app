import React from 'react';
import socketIOClient from 'socket.io-client';
import Message from './Message';
import Send from 'react-icons/lib/md/send';

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
      <div className="chat-app">
        <div className="sidebar"></div>
        <div className="chat-content">
          <div className="messages">
            <Message />
          </div>
          <div className="chat-input">
            <form>
              <input type="text" placeholder="Write message..." autofocus/>
              <button><Send color="#8F5DB7" size="24px" /></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;