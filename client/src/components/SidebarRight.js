import React from 'react';
import Close from 'react-icons/lib/md/close';
import { sidebarClose } from '../helpers/sidebarToggle';

const colors = {
  violet: '#746db4',
  light: '#dedef7',
  dark: '#263238',
  pink: '#ff95c7',
  green: '#92db25',
};

class SidebarRight extends React.Component {
  static changeTheme(color) {
    document.getElementById('theme').href = `/dist/${color}.css`;
    document.getElementById('logo').src = `/img/logos/logo_${color}.jpg`;
  }

  static changeBackground(e) {
    const background = e.target.className;
    const chatContent = document.getElementsByClassName('chat-content')[0];

    chatContent.style.backgroundImage = `url('/img/backgrounds/${background}.png')`;
  }

  static closeSidebar() {
    sidebarClose('right');
  }

  render() {
    return (
      <div className="sidebar-right sidebar-right-closed">
        <div className="close">
          <button onClick={SidebarRight.closeSidebar}>
            <Close className="icon" size="24px" />
          </button>
        </div>
        <div className="themes">
          <div className="panel">
            <p>Choose Theme</p>
          </div>
          <div className="colors">
            {Object.keys(colors).map(color => (<div
              className={color}
              style={{ background: colors[color] }}
              onClick={() => SidebarRight.changeTheme(color)}
            />))}
          </div>
        </div>
        <div className="backgrounds">
          <div className="panel">
            <p>Choose Background</p>
          </div>
          <div className="images">
            <img className="sun" src="/img/backgrounds/sun.png" alt="sun" onClick={SidebarRight.changeBackground} />
            <img className="triangular_white" src="/img/backgrounds/triangular_white.png" alt="triangular-white" onClick={SidebarRight.changeBackground} />
            <img className="triangular_grey" src="/img/backgrounds/triangular_grey.png" alt="triangular-grey" onClick={SidebarRight.changeBackground} />
            <img className="flowers" src="/img/backgrounds/flowers.png" alt="flowers" onClick={SidebarRight.changeBackground} />
            <img className="triangular_black" src="/img/backgrounds/triangular_black.png" alt="triangular-black" onClick={SidebarRight.changeBackground} />
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarRight;
