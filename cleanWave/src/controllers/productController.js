const productService = require("../services/productService");

module.exports = {
  listM: async (req, res) => {
    try {
      const allProducts = await productService.findAllM();
      const products = req.session.searchProductsCf
        ? req.session.searchProductsCf
        : allProducts;
      res.render("products/productList", { products });
    } catch {
      res.send("error");
    }
  },

  listCf: async (req, res) => {
    try {
      const allProducts = await productService.findAllCf();
      const products = req.session.searchProductsCf
        ? req.session.searchProductsCf
        : allProducts;
      res.render("products/productList", { products });
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
  searchProductsM: async (req, res) => {
    try {
      const url = req.query.url;
      const userType = req.query.userType;
      console.log("userTypeCOntrolleeeeeeeeeeerrrrrrrrrr", userType);
      console.log("INPUTcontrollerrrrrrrrrrrrrrrrrr", req.query.inputValue);
      console.log("urlCONTROLLERRRRRRRRRRRRR", url);
      const products = await productService.searchProductsM(
        req.query.inputValue,
        url,
        userType
      );
      req.session.searchProductsCf = products;
      res.json(products);
    } catch (e) {
      console.log(e);
    }
  },
  searchProductsCf: async (req, res) => {
    try {
      const url = req.query.url;
      const userType = req.query.userType;
      console.log("userTypeCOntrolleeeeeeeeeeerrrrrrrrrr", userType);
      console.log("INPUTcontrollerrrrrrrrrrrrrrrrrr", req.query.inputValue);
      console.log("urlCONTROLLERRRRRRRRRRRRR", url);
      const products = await productService.searchProductsCf(
        req.query.inputValue,
        url,
        userType
      );
      req.session.searchProductsCf = products;
      res.json(products);
    } catch (e) {
      console.log(e);
    }
  },
};
