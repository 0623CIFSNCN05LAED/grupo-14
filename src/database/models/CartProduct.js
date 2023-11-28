module.exports = (sequelize, dataTypes) => {
  const CartProduct = sequelize.define('CartProduct', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: dataTypes.STRING(255),
    },
    product_id: {
      type: dataTypes.STRING(255),
    },
    quantity: dataTypes.INTEGER,
    total_price: dataTypes.DECIMAL(10, 2)
  }, {
        tableName: "CartsProducts",
        timestamps: false
    });

  
  CartProduct.associate = function(models){
      CartProduct.belongsTo(models.Cart, {
          foreignKey: "cart_id"
      });

      CartProduct.belongsTo(models.Product, {
          foreignKey: "product_id"
      });
  }

  return CartProduct;
};
