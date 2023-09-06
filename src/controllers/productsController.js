const products = require("../data/products");

const productsController = {
  detail: (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id == id);

    if (!product) {
      return res.render("main/homeMayorista");
    }
    
    res.render("products/productDetail", { product, products });
        
  },
  cart: (req, res) => {
    res.render("products/productCart");
  },
  create: (req, res) => {
    res.render("products/createProduct");
  },
  
  productsList: (req, res) =>{
    const id = req.params.id;
    const product = products.find((product) => product.id == id);

    res.render("products/productList",{product,products});
  },

};

module.exports = productsController;
