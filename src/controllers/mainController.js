const products = require("../data/products");

const productService = require("../services/productService");

const mainController = {
  homeMayorista: (req, res) => {
    const inSaleProducts = productService.getInSaleProducts();
    const bestSellersProducts = productService.getBestSellersProducts();

    res.render("main/homeMayorista", { //aca va la ruta desde views hasta el archivo homeMayorista. !! no va / al principio.
      inSaleProducts,
      bestSellersProducts
    }); 
  },
  homeConsumidorFinal: (req, res) => {
    res.render("main/homeCf");
  },
};

module.exports = mainController;
