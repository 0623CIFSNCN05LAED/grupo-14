module.exports = (sequelize, dataTypes)=>{
    const alias = "Product";
    const cols = {
      id: {
        type: dataTypes.STRING(255),
        primaryKey: true,
      },
      name: dataTypes.STRING(255),
      shortName: dataTypes.STRING(255),
      retailPrice: dataTypes.DECIMAL(10, 2),
      wholesalePrice: dataTypes.DECIMAL(10, 2),
      discountCf: dataTypes.INTEGER,
      discountM: dataTypes.INTEGER,
      stock: dataTypes.INTEGER,
      image: dataTypes.STRING(255),
      category_id: dataTypes.INTEGER,
      description: dataTypes.TEXT,
      brand_id: dataTypes.INTEGER,
      sold: dataTypes.INTEGER,
      offer: dataTypes.BOOLEAN
    };
    const config= {
        tableName: "Products",
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        });

        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id"
        });
        Product.belongsToMany(models.Cart, {
            as: "cart",
            through: "CartProduct",
            foreignKey: "product_id",
            otherKey: "cart_id"
        });
    }
    

    return Product


}