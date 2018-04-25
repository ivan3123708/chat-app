import React from 'react';
import { socketOn, socketEmit } from '../socketEvents';
import LoginModal from './LoginModal';
import Sidebar from './Sidebar';
import Message from './Message';
import MyMessage from './MyMessage';
import More from 'react-icons/lib/fa/angle-double-right';
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
      const messages = document.getElementsByClassName('messages')[0];

      const prevMessageHeight = messages.lastChild ? messages.lastChild.offsetHeight : 0;

      this.setState({ rooms: rooms });

      const clientHeight = messages.clientHeight;
      const scrollHeight = messages.scrollHeight;
      const scrollTop = messages.scrollTop;
      const newMessageHeight = messages.lastChild.offsetHeight;

      if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
      }
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

  openSidebar = () => {
    const sidebar = document.getElementsByClassName('sidebar')[0];

    if (sidebar.className.match(/(?:^|\s)closed(?!\S)/)) {
      sidebar.classList.remove('closed');
      sidebar.classList.add('open');
    }
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
            <div className="more">
              <button onClick={this.openSidebar}>
                <More className="icon" size="24px"/>
              </button>
            </div>
            <div className="room-info">
              <p className="room-name">{this.state.room && this.state.room}</p>
              <p className="room-users">{this.state.room && this.state.rooms.find((room) => room.name === this.state.room).users.join(', ').slice(0, 30)}</p>
            </div>
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