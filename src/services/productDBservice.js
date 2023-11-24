const { Product, Cart, CartProduct } = require("../database/models");
const { v4: uuidv4 } = require("uuid");

/************* Funciones de uso local(este mismo archivo) ****************/

// const formatProductPrices = function (product) {
//   /* Da el formato a los precios de cada producto */

//   const priceWithDiscount = // Calcula el precio final con el descuento incluido
    

//   product.priceWithDiscount = ` ${priceWithDiscount.toLocaleString("es", {
//     // Crea dentro del producto el precio con el descuento incluido y le da el formato
//     minimumFractionDigits: 2,
//   })}`;

//   product.retailPrice = ` ${product.retailPrice.toLocaleString("es", {
//     // Le da el formato al precio
//     minimumFractionDigits: 2,
//   })}`;

//   product.discount = product.discount.toLocaleString("es"); // Le da el formato al descuento

//   return product;
// };

// const formatProductsPrices = function (products) {
//   // Recibe los productos y a cada uno le otorga el formato
//   return products.map((product) => formatProductPrices(product));
// };

/* Terminan funcion de uso local */

module.exports = {
  findAll: async function () {
    try {
      const products = await Product.findAll();
      return products;
    } catch {}
  },

  findById: async function (id) {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch {}
  },

  findInSaleProducts: async function () {
    try {
      const inSaleProducts = await Product.findAll({
        where: {
          offer: 1,
        },
      });
      return inSaleProducts;
    } catch {}
  },
  findBestSellerProducts: async function () {
    try {
      const bestSellerProducts = await Product.findAll({
        where: {
          bestSeller: 1,
        },
      });
      return bestSellerProducts;
    } catch {}
  },
  findRelatedProducts: async function (product) {
    try {
      const relatedProducts = await Product.findAll({
        where: {
          category_id: product.category_id,
        },
      });
      return relatedProducts;
    } catch {}
  },
  createProduct: function (req) {
    Product.create({
      id: uuidv4(),
      name: req.body.name,
      shortName: req.body.shortName,
      retailPrice: req.body.retailPrice,
      wholesalePrice: req.body.wholesalePrice,
      discount: req.body.discount,
      priceWithDiscount: req.body.retailPrice - req.body.retailPrice * (req.body.discount / 100),
      stock: req.body.stock,
      image: req.file ? req.file.filename : "defaultImg.jpg",
      category_id: Number(req.body.category_id),
      description: req.body.description,
      brand_id: Number(req.body.brand_id),
      sold: req.body.sold,
      bestSeller: req.body.bestSeller,
      offer: req.body.offer,
    });
  },
  editProduct: function (req, id) {
    Product.update(
      {
        name: req.body.name,
        shortName: req.body.shortName,
        retailPrice: req.body.retailPrice,
        wholesalePrice: req.body.wholesalePrice,
        discount: req.body.discount,
        stock: req.body.stock,
        image: req.file ? req.file.filename : "defaultImg.jpg",
        category_id: req.body.category_id,
        description: req.body.description,
        brand_id: req.body.brand_id,
        sold: req.body.sold,
        bestSeller: req.body.bestSeller,
        offer: req.body.offer,
      },
      {
        where: { id: id },
      }
    );
  },
  deleteProduct: function (id) {
    Product.destroy({
      where: { id: id },
    });
  },

  addToCart: async function(product, userId, quantity){
    try{
    const cart =  await Cart.create({
        id: uuidv4(),
        user_id: userId,
        quantity: quantity,
        total_price: product.priceWithDiscount * quantity,
        status: "prueba",
        purchase_date: null,
      });
      
      const cartId = cart.id;
      
      CartProduct.create({
        cart_id: cartId,
        product_id: product.id
      })
    

    }catch{
  } 
    
  }
};
