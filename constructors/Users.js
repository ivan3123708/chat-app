class Users {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  addUser(id, name) {
    if (this.users.find((user) => user.name === name)) {
      return 'Username taken';
    } else {
      this.users.push({
        id: id,
        name: name,
        avatar: '/img/default_avatar.png',
        rooms: ['Home Chat']
      });
    }
  }

  updateAvatar(id, avatar) {
    this.users.find((user) => user.id === id).avatar = `/img/avatars/${avatar}`;
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  addRoom(id, roomName) {
    this.users.find((user) => user.id === id).rooms.push(roomName);
  }

  removeRoom(id, roomName) {
    const user = this.getUser(id);
    user.rooms = user.rooms.filter((room) => room !== roomName);
  }
};

module.exports = { Users };