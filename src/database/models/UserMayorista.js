module.exports = (sequelize, dataTypes) => {
  const UsersMayoristas = sequelize.define('UsersMayoristas', {
    id: {
      type: dataTypes.STRING(255),
      primaryKey: true,
    },
    businessName: {
      type: dataTypes.STRING(255),
    },
    cuit: {
      type: dataTypes.INTEGER,
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
  });

  UsersMayoristas.associate = function (models) {
    UsersMayoristas.hasMany(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return UsersMayoristas;
};
