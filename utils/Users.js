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
      name: name
    });
  }
  
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  removeUser(id) {
    this.users.filter((user) => user.id !== id);
  }
};

module.exports = { Users };