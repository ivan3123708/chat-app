import React from 'react';
import Modal from 'react-modal';
import { socketEmit } from '../socketEvents';

class LoginModal extends React.Component {

  loginUser = (e) => {
    e.preventDefault();

    const userName = e.target.elements.userName.value;
    e.target.elements.userName.value = '';

    socketEmit.userJoin(userName);

    this.props.onRequestClose();
  }

  render() {
    return (
      <Modal
        className="login-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={this.loginUser}>
          <h3>Enter nickname</h3>
          <input type="text" name="userName" autoFocus />
        </form>
      </Modal>
    )
  }
}

export default LoginModal;