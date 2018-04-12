import React from 'react';

const Message = (props) => {
  if (!props.message.consecutive) {
    return (
      <div className="message">
        <img src={'/img/default_avatar.png'} />
        <div className="message-content">
          <p className="sender">{props.message.sender}</p>
          <p className="text">{props.message.text}</p>
          <p className="time">{props.message.time}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="message">
        <div className="message-content-consecutive">
          <p className="text">{props.message.text}</p>
          <p className="time">{props.message.time}</p>
        </div>
      </div>
    );
  }
};

export default Message;