module.exports = (sequelize, dataTypes) => {
  const AddressesUsers = sequelize.define('AddressUser', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address_id: {
      type: dataTypes.INTEGER,
    },
    user_id: {
      type: dataTypes.STRING(255),
    },
  }, {
        tableName: "AddressesUsers",
        timestamps: false
    });

  
  AddressesUsers.associate = function(models){
      AddressesUsers.belongsTo(models.Address, {
          foreignKey: "address_id"
      }),

      AddressesUsers.belongsTo(models.User, {
          foreignKey: "user_id"
      })
  }

  return AddressesUsers;
};
