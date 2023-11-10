const productDBservice = require("../services/productDBservice")

const mainController = {
  homeMayorista: async (req, res) => {
    try{
      const inSaleProducts = await productDBservice.findInSaleProducts();
      const bestSellersProducts = await productDBservice.findBestSellerProducts();

    res.render("main/homeMayorista", {
      inSaleProducts,
      bestSellersProducts,
    });
    }catch{

    }
    
  },
  homeConsumidorFinal: async(req, res) => {
    try{
    const inSaleProducts = await productDBservice.findInSaleProducts();
    const bestSellersProducts = await productDBservice.findBestSellerProducts();

    res.render("main/homeCf", {
      inSaleProducts,
      bestSellersProducts,
    });
    }catch{

    }

  },
};

module.exports = mainController;
