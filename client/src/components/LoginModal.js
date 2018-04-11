import React from 'react';
import Modal from 'react-modal';
import { userJoinEmitter } from '../socketEvents';

class LoginModal extends React.Component {

  loginUser = (e) => {
    e.preventDefault();

    const nickname = e.target.elements.nickname.value;
    e.target.elements.nickname.value = '';

    userJoinEmitter(nickname);

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
          <input type="text" name="nickname" autoFocus />
        </form>
      </Modal>
    )
  }
}

export default LoginModal;