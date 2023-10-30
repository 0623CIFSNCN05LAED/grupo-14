const db = require("../data/db");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const userServices = {
  userInDb: function (emailToCompare) {
    const user = db.users.findByField("email", emailToCompare);
    return user;
  },

  correctPassword: function (passwordToCheck, userPassword) {
    const verifiedPassword = bcrypt.compareSync(passwordToCheck, userPassword);
    return verifiedPassword;
  },

  createUserCf: function (dataUser) {
    delete dataUser.body.confirmPassword;
    const user = {
      id: uuidv4(),
      ...dataUser.body,
      password: bcrypt.hashSync(dataUser.body.password, 10),
      image: dataUser.file ? dataUser.file.filename : "userDefault.png",
      category: "consumidorFinal",
    };
    db.users.create(user);
  },
  createUserM: function (dataUser) {
    delete dataUser.body.confirmPassword;
    const user = {
      id: uuidv4(),
      ...dataUser.body,
      password: bcrypt.hashSync(dataUser.body.password, 10),
      image: dataUser.file ? dataUser.file.filename : "userDefault.png",
      category: "mayorista",
    };
    db.users.create(user);
  },
};

module.exports = userServices;
