const {
  User,
  UserCf,
  UserMayorista,
  UserAdmin,
  UserSuperAdmin,
  Address,
} = require("../database/models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
  findByEmail: async function (emailToCompare) {
    try {
      const user = await User.findOne({
        where: {
          email: emailToCompare,
        },
        include: [
          {
            model: UserAdmin,
            as: "admin",
          },
          {
            model: UserMayorista,
            as: "mayorista",
          },
          {
            model: UserCf,
            as: "cf",
          },
          {
            model: UserSuperAdmin,
            as: "superAdmin",
          },
        ],
      });
      return user;
    } catch {
      return false; /* ?? */
    }
  },
  create: async function (dataUser) {
    try {
      const newUser = {
        id: uuidv4(),
        email: dataUser.email,
        password: bcrypt.hashSync(dataUser.password),
        phoneNumber: dataUser.tel,
        notify: dataUser.notify ? 1 : 0,
      };

      await User.create(newUser);

      if (dataUser.category == "cf") {
        delete dataUser.cuit;
        delete dataUser.businessName;
        UserCf.create({
          id: newUser.id,
          name: dataUser.name,
          lastName: dataUser.lastName,
          dni: dataUser.dni,
        });
      } else if (dataUser.category == "mayorista") {
        delete dataUser.name;
        delete dataUser.lastName;
        delete dataUser.dni;
        UserMayorista.create({
          id: newUser.id,
          cuit: dataUser.cuit,
          businessName: dataUser.businessName,
        });
      } else if (dataUser.category == "admin") {
        delete dataUser.cuit;
        delete dataUser.businessName;
        delete dataUser.dni;
        UserAdmin.create({
          id: newUser.id,
          name: dataUser.name,
          lastName: dataUser.lastName,
        });
      }
    } catch {}
  },

  createAddress: async function (dataAddress) {
    try {
      const newAddress = {
        country: dataAddress.country,
        province: dataAddress.province,
        neighborhood: dataAddress.neighborhood,
        street: dataAddress.street,
        number: dataAddress.number,
        apartment: dataAddress.apartment,
        note: dataAddress.note,
      };
      await Address.create(newAddress);
    } catch {}
  },

  delete: function (id) {
    User.destroy({ where: { id: id } });
    UserCf.destroy({ where: { id: id } });
    UserMayorista.destroy({ where: { id: id } });
    UserAdmin.destroy({ where: { id: id } });
  },
};
