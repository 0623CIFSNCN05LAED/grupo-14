const fs = require("fs");
const path = require("path");

/**************** Objeto de objetos de funciones genericas ***************/
/**************** Exportado y requerido en userService.js *************/

module.exports = {
  getUsers: function () {
    const usersFilePath = path.join(__dirname, "./usersDataBase.json");
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    return users;
  },

  saveUsers: function (users) {
    const usersFilePath = path.join(__dirname, "./usersDataBase.json");
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  },

  findAll: function () {
    return this.getUsers();
  },

  findById: function (id) {
    const user = this.getUsers().find((user) => user.id == id);
    return user;
  },

  findByField: function (field, text) {
    const userFound = this.getUsers().find((user) => user[field] == text);
    return userFound;
  },

  create: function (user) {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  },
};
