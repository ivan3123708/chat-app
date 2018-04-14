import React from 'react';
import Modal from 'react-modal';
import { joinRoomEmitter } from '../socketEvents';

class CreateRoomModal extends React.Component {

  createRoom = (e) => {
    e.preventDefault();

    const room = e.target.elements.room.value;
    e.target.elements.room.value = '';

    joinRoomEmitter(room);

    this.props.onRequestClose();
  }

  render() {
    return (
      <Modal
        className="login-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={this.createRoom}>
          <h3>Enter room name</h3>
          <input type="text" name="room" autoFocus />
        </form>
      </Modal>
    )
  }
}

export default CreateRoomModal;