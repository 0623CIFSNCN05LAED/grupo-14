module.exports = (sequelize, dataTypes) => {
  const UsersMayoristas = sequelize.define('UserMayorista', {
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

  UsersMayoristas.associate = function (models) {
    UsersMayoristas.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UsersMayoristas;
};
