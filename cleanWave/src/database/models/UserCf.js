module.exports = (sequelize, dataTypes) => {
  const UserCf = sequelize.define('UserCf', {
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
    dni: {
      type: dataTypes.INTEGER,
    }
  }, {
        tableName: "UsersCf",
        timestamps: false
    });

  UserCf.associate = function (models) {
    UserCf.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UserCf;
};
