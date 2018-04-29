import React from 'react';
import Modal from 'react-modal';
import { socketEmit } from '../socketEvents';

class LoginModal extends React.Component {

  state = {
    error: null
  }

  loginUser = (e) => {
    e.preventDefault();

    const userName = e.target.elements.userName.value.trim();

    if (!userName) {
      return this.setState({ error: 'You must enter username' });
    };
    
    socketEmit.joinUser(userName);
    
    e.target.elements.userName.value = '';

    this.props.onRequestClose();
  }

  render() {
    return (
      <Modal
        className="modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={this.loginUser}>
          <h3>Join Chat</h3>
          <p className="error">{this.state.error}</p>
          <p>Username</p>
          <input type="text" name="userName" autoFocus />
          <button type="submit" className="button-text">Join</button>
        </form>
      </Modal>
    )
  }
}

export default LoginModal;