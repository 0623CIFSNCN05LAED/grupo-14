module.exports = (sequelize, dataTypes) => {
  const UsersCf = sequelize.define('UserCf', {
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
    },
    user_id: {
      type: dataTypes.INTEGER,
    },
  }, {
        tableName: "UsersCf",
        timestamps: false
    });

  UsersCf.associate = function (models) {
    UsersCf.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user',
    });
  };

  return UsersCf;
};
