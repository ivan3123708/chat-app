class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, nickname) {
    const user = {
      id: id,
      nickname: nickname
    };

    this.users.push(user);

    return user;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
};

module.exports = { Users };