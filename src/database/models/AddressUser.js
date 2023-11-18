module.exports = (sequelize, dataTypes) => {
  const AddressUser = sequelize.define('AddressUser', {
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

  
  AddressUser.associate = function(models){
      AddressUser.belongsTo(models.Address, {
          foreignKey: "address_id"
      }),

      AddressUser.belongsTo(models.User, {
          foreignKey: "user_id"
      })
  }

  return AddressUser;
};
