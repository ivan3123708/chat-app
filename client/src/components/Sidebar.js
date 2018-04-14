import React from 'react';
import CreateRoomModal from './CreateRoomModal';
import Add from 'react-icons/lib/md/add-box';
import Join from 'react-icons/lib/md/input';
import Edit from 'react-icons/lib/md/edit';
import { joinRoomEmitter } from '../socketEvents';

class Sidebar extends React.Component {

  state = {
    createRoomModalOpen: false
  }

  toggleModal = () => {
    this.setState((prevState) => ({ createRoomModalOpen: !prevState.createRoomModalOpen }));
  }

  joinRoom = (room) => {
    joinRoomEmitter(room);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="profile">
          <div className="photo">
            <img src={'/img/default_avatar.png'} />
          </div>
          <div className="name">
            <p>{this.props.user && this.props.user.nickname}</p>
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
          {this.props.rooms.map((room) => (
            <div className="list">
              <img src={'/img/home.png'} />
              <p>{room}</p>
              <button onClick={() => this.joinRoom(room)} title="Join this room">
                <Join className="join" size="20px" />
              </button>
            </div>
          ))}
        </div>
        <div className="users">
          <div className="panel">
            <p>Users Online</p>
          </div>
          {this.props.users.map((user) => (
            <div className="list">
              <img src={'/img/default_avatar.png'} />
              <p>{user}</p>
            </div>
          ))}
        </div>
        <CreateRoomModal isOpen={this.state.createRoomModalOpen} onRequestClose={this.toggleModal}/>
      </div>
    )
  }
};

export default Sidebar;