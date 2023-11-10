module.exports = (sequelize, dataTypes) => {
  const UsersAdmin = sequelize.define('UserAdmin', {
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

  UsersAdmin.associate = function (models) {
    UsersAdmin.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UsersAdmin;
};


