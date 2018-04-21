class Rooms {
  constructor() {
    this.rooms = [
      {
        name: 'Home Chat',
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

  addRoom(roomName) {
    if (!this.rooms.find((room) => room.name === roomName)) {
      this.rooms.push({
        name: roomName,
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
    this.rooms.find((room) => room.name === roomName).messages.push(message);
  }
};

module.exports = { Rooms };