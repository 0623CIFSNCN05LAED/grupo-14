const productDBservice = require("../services/productDBservice");

module.exports = {
  list: async (req, res) => {
    try {
      const products = await productDBservice.findAll();
      res.render("products/productList", { products });
    } catch {
      res.send("error");
    }
  },

  detail: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productDBservice.getFormattedProduct(id);
      const relatedProducts = await productDBservice.findRelatedProducts(
        product
      );
      res.render("products/productDetail", { product, relatedProducts });
    } catch (error) {}
  },

  viewCreate: (req, res) => {
    res.render("products/createProduct");
  },

  create: (req, res) => {
    const dataForm = req;
    productDBservice.createProduct(dataForm);
    res.redirect("/products");
  },

  viewEdit: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productDBservice.findById(id);
      console.log(typeof product.wholesalePrice);
      res.render("products/editProduct", { product });
    } catch {}
  },

  edit: (req, res) => {
    const id = req.params.id;
    const dataForm = req;
    const product = productDBservice.editProduct(dataForm, id);
    res.redirect("/products");
  },

  delete: (req, res) => {
    const id = req.params.id;
    productDBservice.deleteProduct(id);
    res.redirect("/products");
  },

  cart: (req, res) => {
    res.render("products/productCart");
  },
};
