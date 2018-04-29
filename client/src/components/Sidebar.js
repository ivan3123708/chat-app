import React from 'react';
import CreateRoomModal from './CreateRoomModal';
import PasswordModal from './PasswordModal';
import Close from 'react-icons/lib/fa/angle-double-left';
import Add from 'react-icons/lib/md/add-box';
import Join from 'react-icons/lib/fa/sign-in';
import Leave from 'react-icons/lib/fa/sign-out';
import Lock from 'react-icons/lib/md/lock';
import { socketEmit } from '../socketEvents';

class Sidebar extends React.Component {

  state = {
    createRoomModalOpen: false,
    passwordModal: {
      open: false,
      roomName: null
    }
  }

  togglecreateRoomModal = () => {
    this.setState((prevState) => ({ createRoomModalOpen: !prevState.createRoomModalOpen }));
  }

  togglePasswordModal = (roomName) => {
    this.setState((prevState) => ({ 
      passwordModal: {
        open: !prevState.passwordModal.open,
        roomName
      }
    }));
  }

  joinRoom = (data) => {
    socketEmit.joinRoom(data.roomName, data.password || null, (err) => console.log(err));
  }

  leaveRoom = (roomName) => {
    socketEmit.leaveRoom(roomName);
  }

  closeSidebar = () => {
    const sidebar = document.getElementsByClassName('sidebar')[0];

    if (sidebar.className.match(/(?:^|\s)open(?!\S)/)) {
      sidebar.classList.remove('open');
      sidebar.classList.add('closed');
    }
  }

  render() {
    return (
      <div className="sidebar closed">
        <div className="profile">
          <div className="left">
            <div>
              <img src={'/img/default_avatar.png'} />
            </div>
            <div>
              <p>{this.props.user && this.props.user.name}</p>
              <button className="edit button-text" title="Edit profile">Edit</button>
            </div>
          </div>
          <div className="close">
            <button onClick={this.closeSidebar}>
              <Close className="icon" size="24px"/>
            </button>
          </div>
        </div>
        <div className="public-chats">
          <div className="panel">
            <p>Public Chats</p>
            <button onClick={this.togglecreateRoomModal} title="Create new room">
              <Add className="icon" size="20px" />
            </button>
          </div>
          <div className="public-chats-list">
            {this.props.rooms.map((room) => (
              <div className="list">
                <img src={room.name === 'Home Chat' ? '/img/home_chat.png' : '/img/public_chat.png'} />
                <div>
                  <p className="primary" onClick={() => this.props.switchRoom(room.name)} title="Switch to this room">{room.name}</p>
                  <p className="secondary">{room.users.join(', ').slice(0, 30)}</p>
                </div>
                {room.name !== 'Home Chat' && !room.password && (!this.props.user.rooms.includes(room.name) ? 
                  <button onClick={() => this.joinRoom({ roomName: room.name })} title="Join this room">
                    <Join className="icon" size="20px" />
                  </button>
                  :
                  <button onClick={() => this.leaveRoom(room.name)} title="Leave this room">
                    <Leave className="icon" size="20px" />
                  </button>)
                }
                {room.password && (!this.props.user.rooms.includes(room.name) ? 
                  <button onClick={() => this.togglePasswordModal(room.name)} title="Enter password to join this room">
                    <Lock className="icon" size="20px" />
                  </button>
                  :
                  <button onClick={() => this.leaveRoom(room.name)} title="Leave this room">
                    <Leave className="icon" size="20px" />
                  </button>)
                }
              </div>
            ))}
          </div>
        </div>
        <div className="users">
          <div className="panel">
            <p>Users Online</p>
          </div>
          <div className="users-list">
            {this.props.users.map((user) => (
              <div className="list">
                <img src={'/img/default_avatar.png'} />
                <p className="primary">{user}</p>
              </div>
            ))}
          </div>
        </div>
        <CreateRoomModal 
          isOpen={this.state.createRoomModalOpen} 
          onRequestClose={this.togglecreateRoomModal}
        />
        <PasswordModal 
          isOpen={this.state.passwordModal.open} 
          onRequestClose={() => this.togglePasswordModal(this.state.passwordModal.roomName)} 
          roomName={this.state.passwordModal.roomName}
        />
      </div>
    )
  }
};

export default Sidebar;