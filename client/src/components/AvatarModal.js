import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { socketEmit } from '../helpers/socketEvents';

class AvatarModal extends React.Component {

  state = {
    error: null
  }

  previewAvatar = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  uploadAvatar = (e) => {
    e.preventDefault();

    const data = new FormData();
    const inputfile = document.getElementById('inputfile');

    data.append('id', this.props.user.id);
    data.append('avatar', inputfile.files[0]);

    axios.post('/api/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      socketEmit.getAvatar();
      this.props.onRequestClose();
    })
    .catch((err) => {
      this.setState({ error: 'Only .jpg, .png and .gif, < 5MB' });
    });
  }

  render() {
    return (
      <Modal
        className="avatar-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={(e) => this.uploadAvatar(e)}>
          <h3>Set Profile</h3>
          <p className="error">{this.state.error}</p>
          <img id="preview" src={this.props.user.avatar} />
          <input id="inputfile" name="avatar" type="file" onChange={() => this.previewAvatar(document.getElementById('inputfile'))}/>
          <button type="submit" className="button-text">Set</button>
        </form>
      </Modal>
    )
  }
}

export default AvatarModal;