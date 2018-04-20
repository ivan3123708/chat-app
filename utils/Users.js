class Users {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users.map((user) => user.name);
  }

  addUser(id, name) {
    this.users.push({
      id: id,
      name: name,
      rooms: ['Home Chat']
    });
  }
  
  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  addRoom(id, roomName) {
    this.users.find((user) => user.id === id).rooms.push(roomName);
  }

  removeRoom(id, roomName) {
    const user = this.getUser();
    user.room = user.rooms.filter((room) => room !== roomName);
  }
};

module.exports = { Users };