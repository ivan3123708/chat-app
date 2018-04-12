class Users {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users.map((user) => user.nickname);
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