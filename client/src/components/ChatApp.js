import React from 'react';
import { serverMessageListener, clientMessageEmitter } from '../socketEvents';
import LoginModal from './LoginModal';
import Message from './Message';
import Send from 'react-icons/lib/md/send';

class ChatApp extends React.Component {

  constructor() {
    super();

    this.state = {
      loginModalOpen: true,
      messages: []
    };

    serverMessageListener((text) => {
      this.setState((prevState) => ({ messages: prevState.messages.concat(text) }))
    });
  }

  sendMessage = (e) => {
    e.preventDefault();

    const text = e.target.elements.text.value;
    e.target.elements.text.value = '';
    
    clientMessageEmitter(text);
  }

  render() {    
    return (
      <div className="chat-app">
        <LoginModal isOpen={this.state.loginModalOpen} />
        <div className="sidebar"></div>
        <div className="chat-content">
          <div className="messages">
            {this.state.messages.map((message) => {
              return <Message text={message} />
            })}
          </div>
          <div className="chat-input">
            <form onSubmit={(e) => this.sendMessage(e)}>
              <input type="text" name="text" placeholder="Write message..." autoFocus/>
              <button><Send color="#8F5DB7" size="24px" /></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;