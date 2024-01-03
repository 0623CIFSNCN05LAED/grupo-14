const productService = require("../services/productService");

module.exports = {
  listM: async (req, res) => {
    try {
      const allProducts = await productService.findAllM();
      const url = req.originalUrl;
      const products = !req.session.searchProductsM ? allProducts : req.session.searchProductsM;
      res.render("products/productList", { products, url });
    } catch {
      res.send("error");
    }
  },

  listCf: async (req, res) => {
    try {
      const allProducts = await productService.findAllCf();
      console.log(allProducts)
      const url = req.originalUrl
      const products = req.session.searchProductsCf
        ? req.session.searchProductsCf
        : allProducts;
      res.render("products/productList", { products, url });
    } catch {
      res.send("error");
    }
  },

  detailCf: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productService.findProductCf(id);
      const relatedProducts = await productService.findRelatedProductsCf(
        product
      );
      res.render("products/productDetail", { product, relatedProducts });
    } catch (error) {}
  },

  detailM: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productService.findProductM(id);
      const relatedProducts = await productService.findRelatedProductsM(
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
    productService.createProduct(dataForm);
    res.redirect("/consumidorfinal/products");
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
    res.redirect("/consumidorfinal/products");
  },

  delete: (req, res) => {
    const id = req.params.id;
    productService.deleteProduct(id);
    res.redirect("/consumidorfinal/products");
  },
  searchProductsM: async (req, res) => {
    try {
      const products = await productService.searchProductsM(
        req.query.inputValue,
      );
      if(!products){
        return null
      } else {

        req.session.searchProductsM = products;
        console.log("session",req.session.searchProductsM)
        res.json(products);
      }
      } catch (e) {
      console.log(e);
    }
  },
  searchProductsCf: async (req, res) => {
    try {
      const products = await productService.searchProductsCf(
        req.query.inputValue,
      );
      req.session.searchProductsCf = products;
      res.json(products);
    } catch (e) {
      console.log(e);
    }
  },
};
