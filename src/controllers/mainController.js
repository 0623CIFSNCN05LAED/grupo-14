const productService = require("../services/productService")

const mainController = {
  homeMayorista: async (req, res) => {
    try{
      const inSaleProducts = await productService.findInSaleProducts();
      const bestSellersProducts = await productService.findBestSellerProducts();

    res.render("main/homeMayorista", {
      inSaleProducts,
      bestSellersProducts,
    });
    }catch{

    }
    
  },
  homeConsumidorFinal: async(req, res) => {
    try{
    const inSaleProducts = await productService.findInSaleProducts();
    const bestSellersProducts = await productService.findBestSellerProducts();

    res.render("main/homeCf", {
      inSaleProducts,
      bestSellersProducts,
    });
    }catch{

    }

  },
};

module.exports = mainController;
