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
  getAllUsersAndCount: async function () {
    try {
      const { count, rows } = await User.findAndCountAll({
            /* esto devuelve count y rows */
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

          const filteredRows = rows.map((user)=>{
            
                let userDetails = {
                id: user.id,
                email: user.email,
                detail: "/api/users/" + user.id,
              }

              const categoriesToCheck = ["superAdmin", "admin", "cf", "mayorista"];

              for (const category of categoriesToCheck) {
                if (user.dataValues[category]) {
                  if (category === "mayorista") {
                    userDetails.businessName = user.dataValues[category].businessName;
                  } else {
                    userDetails.name = user.dataValues[category].name;
                  }
                  break; 
                }
              }
              
              return userDetails
          })

      return { count, rows: filteredRows }; /* como espera count y rows tengo que aclarar el valor de rows */
    } catch (error) {
      console.log(error);
    }
  },
  findById: async function (userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
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
      
      let filterUserData = {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        image: user.image,
        notify: user.notify == 1? true: false,
        active_cart_id: user.active_cart_id ? user.active_cart_id : "Este usuario no tiene un carrito activo"
      };

      const categoriesToCheck = ["superAdmin", "admin", "cf", "mayorista"];

      for ( const category of categoriesToCheck){
        if(user[category]){
          if(category === "mayorista"){
              filterUserData.businessName = user[category].businessName;
          } else {
            filterUserData.name = user[category].name;
            filterUserData.lastName = user[category].lastName;
            if(category === "cf"){
              filterUserData.dni = user[category].dni
            }
          }
        }
      }





      return filterUserData

    } catch (error) {
      console.log(error);
    }
  },

  findByEmail: async function (emailToCompare) {
    try {
      const user = await User.findOne({
        where: {
          email: emailToCompare,
        },
        include: [
          {
            model: Address,
            as: "address",
          },
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
  create: async function (dataUser, file) {
    try {
      const newUser = {
        id: uuidv4(),
        email: dataUser.email,
        password: bcrypt.hashSync(dataUser.password),
        image: dataUser.image,
        phoneNumber: dataUser.tel,
        notify: dataUser.notify ? 1 : 0,
        image: file ? file.filename : "defaultImg.jpg"
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
