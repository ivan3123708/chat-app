import React from 'react';
import Close from 'react-icons/lib/md/close';
import { IncomingMessage } from 'http';

const colors = {
  violet: '#746db4',
  light: '#dedef7',
  dark: '#263238',
  pink: '#ff95c7',
  green: '#92db25'
};

class SidebarRight extends React.Component {

  closeSidebar = () => {
    const sidebar = document.getElementsByClassName('sidebar-right')[0];

    if (sidebar.className.match(/(?:^|\s)sidebar-right-open(?!\S)/)) {
      sidebar.classList.remove('sidebar-right-open');
      sidebar.classList.add('sidebar-right-closed');
    }
  }

  changeTheme = (e) => {
    const theme = e.target.className;

    document.getElementById('theme').href = `/dist/${theme}.css`;
  }

  changeBackground = (e) => {
    const background = e.target.className;
    const chatContent = document.getElementsByClassName('chat-content')[0];
    
    chatContent.style.backgroundImage = `url('/img/${background}.png')`;
  }

  render() {
    return (
      <div className="sidebar-right sidebar-right-closed">
        <div className="close">
          <button onClick={this.closeSidebar}>
            <Close className="icon" size="24px" />
          </button>
        </div>
        <div className="themes">
          <div className="panel">
            <p>Choose Theme</p>
          </div>
          <div className="colors">
            {Object.keys(colors).map((color) => {
              return <div 
                className={color} 
                style={{'background': colors[color]}} 
                onClick={this.changeTheme}>
              </div>
            })}
          </div>
        </div>
        <div className="backgrounds">
          <div className="panel">
            <p>Choose Background</p>
          </div>
          <div className="images">
            <img className="triangles" src={'/img/triangles.png'} onClick={this.changeBackground} />
            <img className="christmas" src={'/img/christmas.png'} onClick={this.changeBackground} />
            <img className="sun" src={'/img/sun.png'} onClick={this.changeBackground} />
            <img className="triangular" src={'/img/triangular.png'} onClick={this.changeBackground} />
            <img className="triangles_black" src={'/img/triangles_black.png'} onClick={this.changeBackground} />
          </div>
        </div>
      </div>
    )
  }
};

export default SidebarRight;