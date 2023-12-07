const productService = require("../services/productService");

const mainController = {
  homeMayorista: async (req, res) => {
    try {
      const inSaleProducts = await productService.findInSaleProductsM();
      const bestSellersProducts = await productService.findBestSellerProductsM();

      res.render("main/homeMayorista", {
        inSaleProducts,
        bestSellersProducts,
      });
    } catch {}
  },
  homeConsumidorFinal: async (req, res) => {
    try {
      const inSaleProducts = await productService.findInSaleProductsCf();
      const bestSellersProducts = await productService.findBestSellerProductsCf();

      res.render("main/homeCf", {
        inSaleProducts,
        bestSellersProducts,
      });
    } catch {}
  },
};

module.exports = mainController;
