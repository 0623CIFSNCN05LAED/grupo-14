const products = require("../data/products");
const productServices = {
    getInSaleProducts: ()=>{
        return products.filter(product => product.offer==true)
    }
}

module.exports = productServices;