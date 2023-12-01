const db = require("../../database/models");

const Products = db.Product;

const productsAPIController = {
  list: (req, res) => {
    Products.findAll({
      include: ["category", "brand"],
    }).then((products) => {
      let respuesta = {
        meta: {
          status: 200,
          total: products.length,
          url: "api/products",
        },
        data: products,
      };
      res.json(respuesta);
    });
  },
};

module.exports = productsAPIController;
