module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
        },
        password: {
            type: DataTypes.STRING(255),
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
        },
        notify: {
            type: DataTypes.BOOLEAN,
        },
        profile_id: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: "Users",
        timestamps: false
    });

    User.associate = function (models) {
    User.belongsToMany(models.Address, {
        through: 'AddressesUsers',
        foreignKey: 'user_id',
        otherKey: 'address_id',
        as: 'addresses',
    });

    User.belongsToMany(models.UserAdmin, {
        foreignKey: 'user_id',
        as: 'admin',
        scope: {
            profile_id: 1, // Condición para la relación con UserAdmin
        },
    });

    User.belongsToMany(models.UserCf, {
        foreignKey: 'user_id',
        as: 'cf',
        scope: {
            profile_id: 2, // Condición para la relación con UserCf
        },
    });

    User.belongsToMany(models.UserMayorista, {
        foreignKey: 'user_id',
        as: 'mayorista',
        scope: {
            profile_id: 3, // Condición para la relación con UserMayorista
        },
    });
};


    return User;
};
