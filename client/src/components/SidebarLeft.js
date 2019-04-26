import React from 'react';
import PropTypes from 'prop-types';
import Close from 'react-icons/lib/md/close';
import Add from 'react-icons/lib/md/add-box';
import Join from 'react-icons/lib/fa/sign-in';
import Leave from 'react-icons/lib/fa/sign-out';
import Lock from 'react-icons/lib/md/lock';
import AvatarModal from './AvatarModal';
import CreateRoomModal from './CreateRoomModal';
import PasswordModal from './PasswordModal';
import { socketEmit } from '../helpers/socketEvents';
import { sidebarClose } from '../helpers/sidebarToggle';

class SidebarLeft extends React.Component {
  constructor() {
    super();

    this.state = {
      avatarModalOpen: false,
      createRoomModalOpen: false,
      passwordModal: {
        open: false,
        roomName: null,
      },
    };

    this.toggleAvatarModal = this.toggleAvatarModal.bind(this);
    this.toggleCreateRoomModal = this.toggleCreateRoomModal.bind(this);
    this.togglePasswordModal = this.togglePasswordModal.bind(this);
  }

  static joinRoom(data) {
    socketEmit.joinRoom(data.roomName, data.password || null);
  }

  static leaveRoom(roomName) {
    socketEmit.leaveRoom(roomName);
  }

  static closeSidebar() {
    sidebarClose('left');
  }

  toggleAvatarModal() {
    this.setState(prevState => ({ avatarModalOpen: !prevState.avatarModalOpen }));
  }

  toggleCreateRoomModal() {
    this.setState(prevState => ({ createRoomModalOpen: !prevState.createRoomModalOpen }));
  }

  togglePasswordModal(roomName) {
    this.setState(prevState => ({
      passwordModal: {
        open: !prevState.passwordModal.open,
        roomName,
      },
    }));
  }

  render() {
    return (
      <div className="sidebar-left sidebar-left-closed">
        <div className="logo">
          <img id="logo" src="/img/logos/logo_violet.jpg" alt="logo" />
        </div>
        <div className="profile">
          <div className="left">
            <div>
              <img id="avatar" src={this.props.user.avatar} alt="avatar" />
            </div>
            <div>
              <p id="user">{this.props.user && this.props.user.name}</p>
              <button className="edit button-text" title="Edit profile" onClick={this.toggleAvatarModal}>Edit</button>
            </div>
          </div>
          <div className="close">
            <button onClick={SidebarLeft.closeSidebar}>
              <Close className="icon" size="24px" />
            </button>
          </div>
        </div>
        <div className="public-chats">
          <div className="panel">
            <p>Public Chats</p>
            <button onClick={this.toggleCreateRoomModal} title="Create new room">
              <Add className="icon" size="20px" />
            </button>
          </div>
          <div className="public-chats-list">
            {this.props.rooms.map(room => (
              <div className="list">
                <img src={room.name === 'Home Chat' ? '/img/icons/home_chat.png' : '/img/icons/public_chat.png'} alt="chat-room" />
                <div>
                  <p className="primary" onClick={() => this.props.user.rooms.includes(room.name) && this.props.switchRoom(room.name)} title="Switch to this room">{room.name}</p>
                  <p className="secondary">{room.users.join(', ').length > 25 ? `${room.users.join(', ').slice(0, 25)}...` : room.users.join(', ')}</p>
                </div>
                {room.name !== 'Home Chat' && !room.password && (!this.props.user.rooms.includes(room.name) ?
                  <button onClick={() => SidebarLeft.joinRoom({ roomName: room.name })} title="Join this room">
                    <Join className="icon" size="20px" />
                  </button>
                  :
                  <button onClick={() => SidebarLeft.leaveRoom(room.name)} title="Leave this room">
                    <Leave className="icon" size="20px" />
                  </button>)
                }
                {room.password && (!this.props.user.rooms.includes(room.name) ?
                  <button onClick={() => this.togglePasswordModal(room.name)} title="Enter password to join this room">
                    <Lock className="icon" size="20px" />
                  </button>
                  :
                  <button onClick={() => SidebarLeft.leaveRoom(room.name)} title="Leave this room">
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
            {this.props.users.map(user => (
              <div className="list">
                <img src={user.avatar} alt="user-avatar" />
                <div>
                  <p className="primary">{user.name}</p>
                  <p className="secondary">{user.rooms.join(', ').length > 25 ? `${user.rooms.join(', ').slice(0, 25)}...` : user.rooms.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AvatarModal
          isOpen={this.state.avatarModalOpen}
          onRequestClose={this.toggleAvatarModal}
          user={this.props.user}
        />
        <CreateRoomModal
          isOpen={this.state.createRoomModalOpen}
          onRequestClose={this.toggleCreateRoomModal}
        />
        <PasswordModal
          isOpen={this.state.passwordModal.open}
          onRequestClose={() => this.togglePasswordModal(this.state.passwordModal.roomName)}
          roomName={this.state.passwordModal.roomName}
        />
      </div>
    );
  }
}

SidebarLeft.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    rooms: PropTypes.array,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  switchRoom: PropTypes.func.isRequired,
};

export default SidebarLeft;
