const { Product } = require("../database/models");
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
  findAllM: async function () {
    try {
      const productsDB = await Product.findAll();
      const productsM = productsDB.map(function (product) {
        return {
          id: product.id,
          name: product.name,
          shortName: product.shortName,
          price: product.wholesalePrice,
          discount: product.discountM,
          stock: product.stock,
          image: product.image,
          category_id: product.category_id,
          description: product.description,
          brand_id: product.brand_id,
          offer: product.offer,
        };
      });
      return productsM;
    } catch {}
  },
  findAllCf: async function () {
    try {
      const productsDB = await Product.findAll();
      const productsCf = productsDB.map(function (product) {
        return {
          id: product.id,
          name: product.name,
          shortName: product.shortName,
          price: product.retailPrice,
          discount: product.discountCf,
          stock: product.stock,
          image: product.image,
          category_id: product.category_id,
          description: product.description,
          brand_id: product.brand_id,
          offer: product.offer,
        };
      });
      return productsCf;
    } catch {}
  },

  /* findById: async function (id) {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch {}
  }, */

  findProductCf: async function (id) {
    try {
      const product = await Product.findByPk(id);
      const productCf = {
        id: product.id,
        name: product.name,
        shortName: product.shortName,
        price: product.retailPrice,
        discount: product.discountCf,
        stock: product.stock,
        image: product.image,
        category_id: product.category_id,
        description: product.description,
        brand_id: product.brand_id,
        offer: product.offer,
      };
      console.log("producto consumidor final", productCf);
      return productCf;
    } catch {}
  },

  findProductM: async function (id) {
    try {
      const product = await Product.findByPk(id);
      const productM = {
        id: product.id,
        name: product.name,
        shortName: product.shortName,
        price: product.wholesalePrice,
        discount: product.discountM,
        stock: product.stock,
        image: product.image,
        category_id: product.category_id,
        description: product.description,
        brand_id: product.brand_id,
        offer: product.offer,
      };
      console.log("producto consumidor final", productM);
      return productM;
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
      discountCf: req.body.discountCf,
      discountM: req.body.discountM,
      stock: req.body.stock,
      image: req.file ? req.file.filename : "defaultImg.jpg",
      category_id: Number(req.body.category_id),
      description: req.body.description,
      brand_id: Number(req.body.brand_id),
      offer: req.body.discountCf > 1 && req.body.discountM > 1 ? 1 : 0,
    });
  },
  editProduct: function (req, id) {
    Product.update(
      {
        name: req.body.name,
        shortName: req.body.shortName,
        retailPrice: req.body.retailPrice,
        wholesalePrice: req.body.wholesalePrice,
        discountCf: req.body.discountCf,
        discountM: req.body.discountM,
        stock: req.body.stock,
        image: req.file ? req.file.filename : "defaultImg.jpg",
        category_id: Number(req.body.category_id),
        description: req.body.description,
        brand_id: Number(req.body.brand_id),
        offer: req.body.discountCf > 1 && req.body.discountM > 1 ? 1 : 0,
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
};
