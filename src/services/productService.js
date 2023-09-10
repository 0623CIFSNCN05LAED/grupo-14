const db = require("../data/products");

// Funciones de uso local(este mismo archivo)
// Da el formato a los precios de cada producto
const formatProductPrices = function (product) {
  // Calcula el precio final con el descuento incluido
  const priceWithDiscount =
    product.price - product.price * (product.discount / 100);
  // Crea dentro del producto el precio con el descuento incluido y le da el formato
  product.priceWithDiscount = `$ ${priceWithDiscount.toLocaleString("es", {
    minimumFractionDigits: 2,
  })}`;
  // Le da el formato al precio
  product.price = `$ ${product.price.toLocaleString("es", {
    minimumFractionDigits: 2,
  })}`;
  // Le da el formato al descuento
  product.discount = product.discount.toLocaleString("es");

  return product;
};
// Recibe los productos y a cada uno le otorga el formato
const formatProductsPrices = function (products) {
  return products.map((product) => formatProductPrices(product));
};

// Funciones que se van a requerir en controllers
const productServices = {
  // Nos brinda todos los productos de la lista
  getAllProducts: () => {
    return db.products.find();
  },
  // Nos brinda el producto del id especificado
  getProduct: (id) => {
    const product = db.products.findById(id);
    return formatProductPrices(product);
  },
  // Nos brinda todos los productos en oferta
  getInSaleProducts: () => {
    const products = db.products
      .find()
      .filter((product) => product.offer == true);
    return formatProductsPrices(products);
  },
};

module.exports = productServices;
