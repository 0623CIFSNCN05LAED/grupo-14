module.exports = (sequelize, dataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: dataTypes.STRING(255),
        primaryKey: true,
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
    },
    {
      tableName: "Addresses",
      timestamps: false,
    }
  );
  
  Address.associate = function (models) {
    Address.belongsTo(models.User, {
      foreignKey: "id",
      as: "users",
    });
  };
  
  return Address
};
