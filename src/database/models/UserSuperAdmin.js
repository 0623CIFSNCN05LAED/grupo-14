module.exports = (sequelize, dataTypes) => {
  const UserSuperAdmin = sequelize.define('UserSuperAdmin', {
    id: {
      type: dataTypes.STRING(255),
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING(255),
    },
    lastName: {
      type: dataTypes.STRING(255),
    }
  }, {
        tableName: "UserSuperAdmin",
        timestamps: false
    });

  UserSuperAdmin.associate = function (models) {
    UserSuperAdmin.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UserSuperAdmin;
};