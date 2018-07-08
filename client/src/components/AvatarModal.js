import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PropTypes from 'prop-types';
import { socketEmit } from '../helpers/socketEvents';

class AvatarModal extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
    };

    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  static previewAvatar(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  uploadAvatar(e) {
    e.preventDefault();

    const data = new FormData();
    const inputfile = document.getElementById('inputfile');

    data.append('id', this.props.user.id);
    data.append('avatar', inputfile.files[0]);

    axios.post('/api/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        socketEmit.getAvatar();
        this.props.onRequestClose();
      })
      .catch(() => {
        this.setState({ error: 'Only .jpg, .png or .gif, < 5MB' });
      });
  }

  render() {
    return (
      <Modal
        className="avatar-modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <form onSubmit={e => this.uploadAvatar(e)}>
          <h3>Set Profile</h3>
          <p className="error">{this.state.error}</p>
          <img id="preview" src={this.props.user.avatar} alt="avatar" />
          <input id="inputfile" name="avatar" type="file" onChange={() => AvatarModal.previewAvatar(document.getElementById('inputfile'))} />
          <button type="submit" className="button-text">Set</button>
        </form>
      </Modal>
    );
  }
}

AvatarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    rooms: PropTypes.array,
  }).isRequired,
};

export default AvatarModal;
