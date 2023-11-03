module.exports = (sequelize, dataTypes) => {
  const Addresses = sequelize.define('Address', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: dataTypes.STRING(255),
    },
    province: {
      type: dataTypes.STRING(255),
    },
    neighborhood: {
      type: dataTypes.STRING(255),
    },
    street: {
      type: dataTypes.STRING(255),
    },
    number: {
      type: dataTypes.INTEGER,
    },
    apartment: {
      type: dataTypes.STRING(20),
    },
    note: {
      type: dataTypes.TEXT,
    },
  }, {
        tableName: "Addresses",
        timestamps: false
    });

  Addresses.associate = function (models){
    Addresses.belongsToMany(models.User, {
        through: 'AddressesUsers',
        foreignKey: 'address_id',
        otherKey: 'user_id',
        as: 'users',
    });
}


  return Addresses;
};
