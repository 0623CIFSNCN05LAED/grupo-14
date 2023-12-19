module.exports = (sequelize, dataTypes) => {
  const UserAdmin = sequelize.define('UserAdmin', {
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
        tableName: "UsersAdmin",
        timestamps: false
    });

  UserAdmin.associate = function (models) {
    UserAdmin.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UserAdmin;
};


