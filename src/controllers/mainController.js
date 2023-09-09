const products = require("../data/products");

const productService = require("../services/productService");

const mainController = {
  homeMayorista: (req, res) => {
    const products = productService.getInSaleProducts();
    res.render("main/homeMayorista", { products }); //aca va la ruta desde views hasta el archivo homeMayorista. !! no va / al principio.
  },
  homeConsumidorFinal: (req, res) => {
    res.render("main/homeCf");
  },
};

module.exports = mainController;
