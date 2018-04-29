class Rooms {
  constructor() {
    this.rooms = [
      {
        name: 'Home Chat',
        password: null,
        users: [],
        messages: []
      }
    ];
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(roomName) {
    return this.rooms.find((room) => room.name === roomName);
  }

  addRoom(roomName, password) {
    if (!this.rooms.find((room) => room.name === roomName)) {
      this.rooms.push({
        name: roomName,
        password: password,
        users: [],
        messages: []
      });
    }
  }

  removeRoom(roomName) {
    this.rooms = this.rooms.filter((room) => room.name !== roomName);
  }

  addUser(userName, roomName) {
    this.rooms.find((room) => room.name === roomName).users.push(userName);
  }

  removeUser(userName, roomName) {
    const room = this.getRoom(roomName);
    room.users = room.users.filter((user) => user !== userName);

    if (!room.users.length) {
      this.removeRoom(roomName);
    }
  }

  addMessage(message, roomName) {
    const room = this.rooms.find((room) => room.name === roomName);

    if (room.messages.length >= 50) {
      room.messages.shift();
    }

    room.messages.push(message);
  }
};

module.exports = { Rooms };