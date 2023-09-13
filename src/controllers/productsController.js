const productService = require("../services/productService");

const productsController = {
  detail: (req, res) => {
    const id = req.params.id;
    const product = productService.getProduct(id); // Requiero un producto en base al id
    const relatedProducts = productService.getRelatedProducts(product); // Por ahora muestra todos los productos en la seccion de productos relacionados hasta que tengamos bien las categorias

    if (!product) {
      return res.render("main/homeMayorista");
    }

    res.render("products/productDetail", { product, relatedProducts });
  },

  cart: (req, res) => {
    res.render("products/productCart");
  },

  create: (req, res) => {
    res.render("products/createProduct");
  },

  productsList: (req, res) => {
    const products = productService.getAllProducts();
    res.render("products/productList", { products });
  },

  edit: (req, res) => {
    res.render("products/editProduct");
  },
};

module.exports = productsController;
