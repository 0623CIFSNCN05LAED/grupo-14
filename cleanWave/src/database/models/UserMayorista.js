module.exports = (sequelize, dataTypes) => {
  const UserMayorista = sequelize.define('UserMayorista', {
    id: {
      type: dataTypes.STRING(255),
      primaryKey: true,
    },
    businessName: {
      type: dataTypes.STRING(255),
    },
    cuit: {
      type: dataTypes.INTEGER,
    }
  }, {
        tableName: "UsersMayoristas",
        timestamps: false
    });

  UserMayorista.associate = function (models) {
    UserMayorista.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UserMayorista;
};
