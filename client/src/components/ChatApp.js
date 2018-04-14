import React from 'react';
import { setUserListener, usersUpdateListener, updateRoomsListener, serverMessageListener, clientMessageEmitter } from '../socketEvents';
import LoginModal from './LoginModal';
import Sidebar from './Sidebar';
import Message from './Message';
import Send from 'react-icons/lib/md/send';

class ChatApp extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      users: [],
      rooms: [],
      messages: [],
      loginModalOpen: true
    };

    setUserListener((user) => {
      this.setState({ user: user });
    });

    updateRoomsListener((rooms) => {
      this.setState({ rooms: rooms });
    });

    usersUpdateListener((users) => {
      this.setState({ users: users });
    });

    serverMessageListener((message) => {
      if (this.state.messages.length && message.sender === this.state.messages[this.state.messages.length - 1].sender) {
        message.consecutive = true;
      };
      this.setState((prevState) => ({ messages: prevState.messages.concat(message) }))
    });
  }

  closeLoginModal = () => {
    this.setState({ loginModalOpen: false });
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
        <LoginModal isOpen={this.state.loginModalOpen} onRequestClose={this.closeLoginModal} />
        <Sidebar 
          user={this.state.user}
          users={this.state.users} 
          rooms={this.state.rooms} 
        />
        <div className="chat-content">
          <div className="messages">
            {this.state.messages.map((message) => {
              return <Message message={message} />
            })}
          </div>
          <div className="chat-input">
            <form onSubmit={(e) => this.sendMessage(e)}>
              <input type="text" name="text" placeholder="Write message..." spellCheck="false" autoFocus/>
              <button><Send color="#8F5DB7" size="24px" /></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;