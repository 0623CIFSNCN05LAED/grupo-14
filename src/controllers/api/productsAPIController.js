const db = require("../../database/models");

const Products = db.Product;
const Category = db.Category;

const productsAPIController = {
  list: async (req, res) => {
    const categoriesDB = await Category.findAll();
    const productsDB = await Products.findAll({
      include: ["category", "brand"],
    });
    const countByCategory = {};
    for (const category of categoriesDB) {
      countByCategory[category.name] = 0;
    }
    productsDB.forEach((product) => {
      countByCategory[product.category.name]++;
    });
    const response = {
      count: productsDB.length,
      countByCategory: countByCategory,
      products: productsDB.map((productDB) => ({
        id: productDB.id,
        name: productDB.name,
        shortName: productDB.shortName,
        retailPrice: productDB.retailPrice,
        wholesalePrice: productDB.wholesalePrice,
        discountCf: productDB.discountCf,
        discountM: productDB.discountM,
        stock: productDB.stock,
        description: productDB.description,
        category: productDB.category.name,
        brand: productDB.brand.name,
        detail: `${req.originalUrl}/${productDB.id}`,
      })),
    };
    res.json(response);
  },

  detail: async (req, res) => {
    await Products.findByPk(req.params.id, {
      include: ["category", "brand"],
    }).then((product) => {
      let respuesta = {
        meta: {
          status: 200,
          total: product.length,
          url: "/api/products/:id",
        },
        data: product,
      };
      res.json(respuesta);
    });
  },
};

module.exports = productsAPIController;
