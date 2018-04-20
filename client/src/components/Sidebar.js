import React from 'react';
import CreateRoomModal from './CreateRoomModal';
import Add from 'react-icons/lib/md/add-box';
import Join from 'react-icons/lib/fa/sign-in';
import Edit from 'react-icons/lib/fa/pencil';
import Leave from 'react-icons/lib/fa/sign-out';
import { socketEmit } from '../socketEvents';

class Sidebar extends React.Component {

  state = {
    createRoomModalOpen: false
  }

  toggleModal = () => {
    this.setState((prevState) => ({ createRoomModalOpen: !prevState.createRoomModalOpen }));
  }

  joinRoom = (roomName) => {
    socketEmit.joinRoom(roomName);
  }

  leaveRoom = (roomName) => {
    socketEmit.leaveRoom(roomName);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="profile">
          <div className="photo">
            <img src={'/img/default_avatar.png'} />
          </div>
          <div className="name">
            <p>{this.props.user && this.props.user.name}</p>
            <button title="Edit profile">
              Edit
              <Edit className="edit"/>
            </button>
          </div>
        </div>
        <div className="public-chats">
          <div className="panel">
            <p>Public Chats</p>
            <button onClick={this.toggleModal} title="Create new room">
              <Add className="add" size="20px" />
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
                  {!this.props.user.rooms.includes(room.name) ? 
                    <button onClick={() => this.joinRoom(room.name)} title="Join this room">
                      <Join className="icon" size="20px" />
                    </button>
                    :
                    <button onClick={() => this.leaveRoom(room.name)} title="Leave this room">
                      <Leave className="icon" size="20px" />
                    </button>
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
        <CreateRoomModal isOpen={this.state.createRoomModalOpen} onRequestClose={this.toggleModal}/>
      </div>
    )
  }
};

export default Sidebar;