module.exports = (sequelize, dataTypes)=>{
    const alias = "Cart";
    const cols = {
        id: {
            type: dataTypes.STRING(255),
            primaryKey: true
        },
        user_id: dataTypes.STRING(255),
        quantity: dataTypes.INTEGER,
        total_price: dataTypes.DECIMAL(10, 2),
        status: dataTypes.STRING(20),
        purchase_date: dataTypes.DATE,
    };
    const config = {
        tableName: "Carts",
        timestamps: false
    };

    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = function(models){

        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        });

        Cart.belongsToMany(models.Product, {
            as: "product",
            through: "CartProduct",
            foreignKey: "cart_id",
            otherKey: "product_id"
        });
    }

    return Cart;
}