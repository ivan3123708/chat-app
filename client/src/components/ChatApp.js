import React from 'react';
import { socketOn, socketEmit } from '../socketEvents';
import LoginModal from './LoginModal';
import Sidebar from './Sidebar';
import Message from './Message';
import MyMessage from './MyMessage';
import Send from 'react-icons/lib/md/send';

class ChatApp extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      users: [],
      room: null,
      rooms: [],
      loginModalOpen: true
    };

    socketOn.updateUser((user) => {
      this.setState({ user: user });
    });

    socketOn.updateUsers((users) => {
      this.setState({ users: users });
    });

    socketOn.updateRoom((room) => {
      this.setState({ room: room.name });
    });

    socketOn.updateRooms((rooms) => {
      this.setState({ rooms: rooms });
    });
  }

  closeLoginModal = () => {
    this.setState({ loginModalOpen: false });
  }

  sendMessage = (e) => {
    e.preventDefault();

    const text = e.target.elements.text.value;
    e.target.elements.text.value = '';
    
    socketEmit.clientMessage(text, this.state.room);
  }

  switchRoom = (room) => {
    this.setState({ room: room });
  }

  render() {    
    return (
      <div className="chat-app">
        <LoginModal isOpen={this.state.loginModalOpen} onRequestClose={this.closeLoginModal} />
        <Sidebar 
          user={this.state.user}
          users={this.state.users} 
          rooms={this.state.rooms} 
          switchRoom={this.switchRoom}
        />
        <div className="chat-content">
          <div className="topbar">
            <p className="room-name">{this.state.room && this.state.room}</p>
            <p className="room-users">{this.state.room && this.state.rooms.find((room) => room.name === this.state.room).users.join(', ').slice(0, 30)}</p>
          </div>
          <div className="messages">
            {this.state.room && this.state.rooms.find((room) => room.name === this.state.room).messages.map((message) => {
              if (message.sender === this.state.user.name) {
                return <MyMessage message={message} />
              } else {
                return <Message message={message} />
              }
            })}
          </div>
          <div className="chat-input">
            <form onSubmit={(e) => this.sendMessage(e)}>
              <input type="text" name="text" placeholder="Write message..." spellCheck="false" autoFocus/>
              <button><Send size="24px" /></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;