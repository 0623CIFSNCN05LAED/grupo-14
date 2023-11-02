module.exports = (sequelize, dataTypes) => {
  const UsersAdmin = sequelize.define('UsersAdmin', {
    id: {
      type: dataTypes.STRING(255),
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING(255),
    },
    lastName: {
      type: dataTypes.STRING(255),
    },
    user_id: {
      type: dataTypes.STRING(255),
    },
  });

  UsersAdmin.associate = function (models) {
    UsersAdmin.hasMany(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return UsersAdmin;
};


