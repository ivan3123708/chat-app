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

  // getUser(id) {
  //   return this.users.filter((user) => user.id === id)[0];
  // }
};

module.exports = { Rooms };