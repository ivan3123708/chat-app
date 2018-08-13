import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  if (!message.consecutive) {
    return (
      <div className="message">
        <img id="avatar" src={message.sender.avatar} alt="sender" />
        <div className="message-content">
          <p className="sender">{message.sender.name}</p>
          <p className="text">{message.text}</p>
          <p className="time">{message.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message">
      <div className="message-content-consecutive">
        <p className="text">{message.text}</p>
        <p className="time">{message.time}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.shape.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    consecutive: PropTypes.bool,
  }).isRequired,
};

export default Message;
