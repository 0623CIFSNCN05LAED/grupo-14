const db = require("../../database/models");

const Products = db.Product;
const Category = db.Category;

const productsAPIController = {
  list: async (req, res) => {
    try {
      const categoriesDB = await Category.findAll();
      const productsDB = await Products.findAll({ include: ["category", "brand"] });
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
          detail: `http://localhost:3333${req.originalUrl}/${productDB.id}`,
        })),
      };
      res.json(response);
    } catch (error) {}
  },

  detail: async (req, res) => {
    try {
      const id = req.params.id;
      const productDB = await Products.findByPk(id, { include: ["category", "brand"] });
      const response = {
        id: productDB.id,
        name: productDB.name,
        shortName: productDB.shortName,
        retailPrice: productDB.retailPrice,
        wholesalePrice: productDB.wholesalePrice,
        discountCf: productDB.discountCf,
        discountM: productDB.discountM,
        stock: productDB.stock,
        image: productDB.image,
        category: productDB.category.name,
        description: productDB.description,
        brand: productDB.brand.name,
        urlImage: `http://localhost:3333/img/products/${productDB.image}`,
      };
      res.json(response);
    } catch {}
  },
};

module.exports = productsAPIController;
