import React from 'react';

const Sidebar = (props) => (
  <div className="sidebar">
    <div className="sidebar-users">
      {props.users.map((user) => (
        <div className="sidebar-user">
          <img src={'/img/default_avatar.png'}/>
          <p>{user}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Sidebar;