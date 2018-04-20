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

  addRoom(roomName) {
    if (!this.rooms.find((room) => room.name === roomName)) {
      this.rooms.push({
        name: roomName,
        users: [],
        messages: []
      });
    }
  }

  getRoom(roomName) {
    return this.rooms.find((room) => room.name === roomName);
  }

  addUser(userName, roomName) {
    this.rooms.find((room) => room.name === roomName).users.push(userName);
  }

  removeUser(userName, roomName) {
    const room = this.getRoom();
    room.users = room.users.filter((user) => user !== userName);
  }

  addMessage(message, roomName) {
    this.rooms.find((room) => room.name === roomName).messages.push(message);
  }
};

module.exports = { Rooms };