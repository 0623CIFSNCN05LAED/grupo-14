const db = require("../data/db");
const bcrypt = require("bcryptjs");

const userServices = {
  createUserCf: function (dataUser) {
    const user = {
      name: dataUser.body.name,
      lastName: dataUser.body.lastName,
      dni: dataUser.body.dni,
      tel: dataUser.body.tel,
      email: dataUser.body.email,
      password: bcrypt.hashSync(dataUser.body.password),
      image: dataUser.file ? dataUser.file.filename : "userDefault.png",
      address: dataUser.body.address,
      location: dataUser.body.location,
      cp: dataUser.body.cp,
      province: dataUser.body.province,
      country: dataUser.body.country,
      specification: dataUser.body.specification,
      notify: dataUser.body.notify,
      category: "consumidorFinal",
    };
    db.users.create(user);
  },
  createUserM: function (dataUser) {
    const user = {
      businessName: dataUser.body.businessName,
      cuit: dataUser.body.cuit,
      tel: dataUser.body.tel,
      email: dataUser.body.email,
      password: bcrypt.hashSync(dataUser.body.password),
      image: dataUser.file ? dataUser.file.filename : "userDefault.png",
      address: dataUser.body.address,
      location: dataUser.body.location,
      cp: dataUser.body.cp,
      province: dataUser.body.province,
      country: dataUser.body.country,
      specification: dataUser.body.specification,
      notify: dataUser.body.notify,
      category: "mayorista",
    };
    db.users.create(user);
  }
};

module.exports = userServices;
