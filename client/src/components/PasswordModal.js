import React from 'react';
import Modal from 'react-modal';
import { socketEmit } from '../socketEvents';

class PasswordModal extends React.Component {

  state = {
    error: null
  }

  submitPassword = (e) => {
    e.preventDefault();

    const password = e.target.elements.password.value.trim();

    if (!password) {
      return this.setState({ error: 'You must enter password' });
    };

    socketEmit.joinRoom(this.props.roomName, password, (err) => {
      this.setState({ error: err });

      if (!this.state.error) {
        this.props.onRequestClose();
      }
    });

    e.target.elements.password.value = '';
  }

  render() {
    return (
      <Modal
        className="password-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={this.submitPassword}>
          <h3>Join Room</h3>
          <p className="error">{this.state.error}</p>
          <p>Password</p>
          <input type="password" name="password" autoFocus />
          <button type="submit" className="button-text">Join</button>
        </form>
      </Modal>
    )
  }
}

export default PasswordModal;