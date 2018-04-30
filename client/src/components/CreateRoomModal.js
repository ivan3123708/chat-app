import React from 'react';
import Modal from 'react-modal';
import { socketEmit } from '../socketEvents';

class CreateRoomModal extends React.Component {

  state = {
    error: null
  }

  createRoom = (e) => {
    e.preventDefault();

    const roomName = e.target.elements.roomName.value.trim();
    const password = e.target.elements.password.value.trim();

    if (!roomName) {
      return this.setState({ error: 'You must enter room name' });
    }

    socketEmit.joinRoom(roomName, password);

    e.target.elements.roomName.value = '';
    e.target.elements.password.value = '';

    this.props.onRequestClose();
  }

  render() {
    return (
      <Modal
        className="create-room-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={this.createRoom}>
          <h3>Create new room</h3>
          <p className="error">{this.state.error}</p>
          <p>Room name</p>
          <input type="text" name="roomName" autoFocus />
          <p>Password (optional)</p>
          <input type="password" name="password" />
          <button type="submit" className="button-text">Create</button>
        </form>
      </Modal>
    )
  }
}

export default CreateRoomModal;