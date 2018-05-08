import React from 'react';

const MyMessage = (props) => {
  if (!props.message.consecutive) {
    return (
      <div className="my-message">
        <div className="message-content">
          <p className="sender">{props.message.sender.name}</p>
          <p className="text">{props.message.text}</p>
          <p className="time">{props.message.time}</p>
        </div>
        <img src={props.message.sender.avatar} />
      </div>
    );
  } else {
    return (
      <div className="my-message">
        <div className="message-content-consecutive">
          <p className="text">{props.message.text}</p>
          <p className="time">{props.message.time}</p>
        </div>
      </div>
    );
  }
};

export default MyMessage;