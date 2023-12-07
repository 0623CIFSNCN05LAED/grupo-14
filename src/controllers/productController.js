const productService = require("../services/productService");

module.exports = {
  listM: async (req, res) => {
    try {
      const products = await productService.findAllM();
      res.render("products/productList", { products });
    } catch {
      res.send("error");
    }
  },

  listCf: async (req, res) => {
    try {
      const products = await productService.findAllCf();
      res.render("products/productList", { products });
    } catch {
      res.send("error");
    }
  },

  detailCf: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productService.findProductCf(id);
      const relatedProducts = await productService.findRelatedProductsCf(product);
      res.render("products/productDetail", { product, relatedProducts });
    } catch (error) {}
  },

  detailM: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productService.findProductM(id);
      const relatedProducts = await productService.findRelatedProductsM(product);
      res.render("products/productDetail", { product, relatedProducts });
    } catch (error) {}
  },

  viewCreate: (req, res) => {
    res.render("products/createProduct");
  },

  create: (req, res) => {
    const dataForm = req;
    productService.createProduct(dataForm);
    res.redirect("/products");
  },

  viewEdit: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productService.findById(id);
      res.render("products/editProduct", { product });
    } catch {}
  },

  edit: (req, res) => {
    const id = req.params.id;
    const dataForm = req;
    productService.editProduct(dataForm, id);
    res.redirect("/products");
  },

  delete: (req, res) => {
    const id = req.params.id;
    productService.deleteProduct(id);
    res.redirect("/products");
  },
};
