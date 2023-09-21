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

  newProduct: (req, res) => {
    const product = {
      name: req.body.name,
      shortName: req.body.shortName,
      brand: req.body.brand,
      price: Number(req.body.price),
      preferentialPrice: Number(req.body.preferentialPrice),
      image: req.file ? req.file.filename : "defaultImg.jpg",
      description: req.body.description,
      discount: Number(req.body.discount),
      category: req.body.category,
      mount: Number(req.body.mount),
    };
    productService.createProduct(product);
    res.redirect("/products");
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
