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

  findAll: function () {
    return this.getUsers();
  },

  findById: function (id) {
    const user = this.getUsers().find((user) => user.id == id);
    return user;
  },
};
