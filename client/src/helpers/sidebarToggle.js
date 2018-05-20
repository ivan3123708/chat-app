const sidebarOpen = (side) => {
  const sidebarLeft = document.getElementsByClassName('sidebar-left')[0];
  const sidebarRight = document.getElementsByClassName('sidebar-right')[0];

  if (side === 'left') {
    if (sidebarRight.classList.contains('sidebar-right-open')) {
      sidebarRight.classList.remove('sidebar-right-open');
      sidebarRight.classList.add('sidebar-right-closed');
    }

    if (sidebarLeft.classList.contains('sidebar-left-closed')) {
      sidebarLeft.classList.remove('sidebar-left-closed');
      sidebarLeft.classList.add('sidebar-left-open');
    }
  } else if (side === 'right') {
    if (sidebarLeft.classList.contains('sidebar-left-open')) {
      sidebarLeft.classList.remove('sidebar-left-open');
      sidebarLeft.classList.add('sidebar-left-closed');
    }

    if (sidebarRight.classList.contains('sidebar-right-closed')) {
      sidebarRight.classList.remove('sidebar-right-closed');
      sidebarRight.classList.add('sidebar-right-open');
    }
  }
};

const sidebarClose = (side) => {
  const sidebar = document.getElementsByClassName(`sidebar-${side}`)[0];

  if (sidebar.classList.contains(`sidebar-${side}-open`)) {
    sidebar.classList.remove(`sidebar-${side}-open`);
    sidebar.classList.add(`sidebar-${side}-closed`);
  }
};

export { sidebarOpen, sidebarClose };
