import React from 'react';

const Message = () => (
  <div className="message">
    <img src={'/img/default_avatar.png'}/>
    <div className="message-content">
      <p className="sender">Alexander</p>
      <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra, sem in gravida dapibus, nibh odio posuere dui, vitae mollis.</p>
    </div>
  </div>
);

export default Message;