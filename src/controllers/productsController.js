const productService = require("../services/productService");

const productsController = {
  detail: (req, res) => {
    const id = req.params.id;
    const product = productService.getFormattedProduct(id); // Requiero un producto en base al id
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
      discount: Number(req.body.discount),
      preferentialPrice: Number(req.body.preferentialPrice),
      mount: Number(req.body.mount),
      category: req.body.category,
      image: req.file ? req.file.filename : "defaultImg.jpg",
      description: req.body.description,
    };
    productService.createProduct(product);
    res.redirect("/products");
  },

  productsList: (req, res) => {
    const products = productService.getFormattedProducts();
    res.render("products/productList", { products });
  },

  edit: (req, res) => {
    const id = req.params.id;
    const product = productService.getProduct(id);
    console.log(product)
    res.render("products/editProduct", {product});
  },

  update: (req, res) => {
    const product = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : productService.getProduct(id).image;
    product.image = image;
    productService.updateProduct(id, product);
    res.redirect("/products");
  }
};

module.exports = productsController;
