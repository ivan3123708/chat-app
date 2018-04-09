import React from 'react';
import Modal from 'react-modal';

const LoginModal = (props) => (
  <Modal
    className="login-modal"
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
  >
    <form>
      <h3>Enter nickname</h3>
      <input type="text" name="nickname" autoFocus />
    </form>
  </Modal>
);

export default LoginModal;