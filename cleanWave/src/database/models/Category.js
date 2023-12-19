module.exports = (sequelize,dataTypes)=>{
    const alias = "Category";
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
      },
      name: dataTypes.STRING(255),
    };
    const config = {
        tableName: "Categories",
        timestamps: false
    };

    const Category = sequelize.define(alias,cols,config);

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: "product",
            foreignKey: "category_id"
        })
    }

    return Category;
}