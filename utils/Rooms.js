class Rooms {
  constructor() {
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  addRoom(room) {
    if (this.rooms.indexOf(room) < 0) {
      this.rooms.push(room);
    }
  }
};

module.exports = { Rooms };