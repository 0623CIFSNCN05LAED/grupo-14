const products = require("../data/products");
const formatProductPrices = function (product) {
    const priceWithDiscount =
      product.price - product.price * (product.discount / 100);
  
    product.priceWithDiscount = ` ${priceWithDiscount.toLocaleString("es", {
      minimumFractionDigits: 2,
    })}`;
  
    product.price = ` ${product.price.toLocaleString("es", {
      minimumFractionDigits: 2,
    })}`;
  
    product.discount = product.discount.toLocaleString("es");
  
    return product;
  };
  const formatProductsPrices = function (products) {
    return products.map((product) => formatProductPrices(product));
  };
const productServices = {
    getInSaleProducts: ()=>{
        const inSaleProducts = products.filter(product => product.offer==true);
        console.log(inSaleProducts)
        return formatProductsPrices(inSaleProducts);
    }
}


module.exports = productServices;