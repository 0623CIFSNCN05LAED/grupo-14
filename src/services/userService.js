const db = require("../data/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userServices = {
  createUserCf: function (dataUser) {
    const user = {
      id: uuidv4(),
      ...dataUser.body,
      password: bcrypt.hashSync(dataUser.body.password),
      confirmPassword: bcrypt.hashSync(dataUser.body.confirmPassword),
      image: dataUser.file ? dataUser.file.filename : "userDefault.png",
      category: "consumidorFinal",
    };
    db.users.create(user);
  },
  createUserM: function (dataUser) {
    const user = {
      id: uuidv4(),
      ...dataUser.body,
      password: bcrypt.hashSync(dataUser.body.password),
      confirmPassword: bcrypt.hashSync(dataUser.body.confirmPassword),
      image: dataUser.file ? dataUser.file.filename : "userDefault.png",
      category: "mayorista",
    };
    db.users.create(user);
  },
};

module.exports = userServices;
