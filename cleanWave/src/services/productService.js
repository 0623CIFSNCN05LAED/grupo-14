const { Product} = require("../database/models");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/models");
const Op = db.Sequelize.Op;

/************* Funciones de uso local(este mismo archivo) ****************/
const formatNumber = (number) => {
  return number.toLocaleString("es", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatPrice = (price) => {
  return formatNumber(price);
};

const formatPriceWithDiscount = (price, discount) => {
  return formatNumber(price * (1 - discount / 100));
};


/* Terminan funcion de uso local */

module.exports = {
  /* START FIND ALL PRODUCTS */
  findAllM: async function () {
    try {
      const productsDB = await Product.findAll();
      const productsM = productsDB.map(function (productDB) {
        return {
          id: productDB.id,
          shortName: productDB.shortName,
          price: formatPrice(productDB.wholesalePrice),
          priceWithDiscount: formatPriceWithDiscount(productDB.wholesalePrice, productDB.discountM),
          discount: productDB.discountM,
          image: productDB.image,
          category_id: productDB.category_id,
          brand_id: productDB.brand_id,
          href: "mayorista",
        };
      });
      return productsM;
    } catch {}
  },
  findAllCf: async function () {
    try {
      const productsDB = await Product.findAll();
      const productsCf = productsDB.map(function (productDB) {
        return {
          id: productDB.id,
          shortName: productDB.shortName,
          price: formatPrice(productDB.retailPrice),
          priceWithDiscount:
            formatPriceWithDiscount(productDB.retailPrice, productDB.discountCf),
          discount: productDB.discountCf,
          image: productDB.image,
          category_id: productDB.category_id,
          brand_id: productDB.brand_id,
          href: "consumidorfinal",
        };
      });
      return productsCf;
    } catch {}
  },
  /* END FIND ALL PRODUCTS */

  /* START FIND PRODUCT BY ID */
  findById: async function (id) {
    try {
      const product = await Product.findByPk(id);
      return product;
    } catch {}
  },
  findProductM: async function (id) {
    try {
      const productDB = await Product.findByPk(id);
      const productM = {
        id: productDB.id,
        name: productDB.name,
        shortName: productDB.shortName,
        price: formatPrice(productDB.wholesalePrice),
          priceWithDiscount: formatPriceWithDiscount(productDB.wholesalePrice, productDB.discountM),
        discount: productDB.discountM,
        stock: productDB.stock,
        image: productDB.image,
        category_id: productDB.category_id,
        description: productDB.description,
        brand_id: productDB.brand_id,
        offer: productDB.offer,
        href: "mayorista",
      };
      return productM;
    } catch {}
  },
  findProductCf: async function (id) {
    try {
      const productDB = await Product.findByPk(id);
      const productCf = {
        id: productDB.id,
        name: productDB.name,
        shortName: productDB.shortName,
        price: productDB.retailPrice,
        priceWithDiscount:
          productDB.retailPrice * (1 - productDB.discountCf / 100),
        discount: productDB.discountCf,
        stock: productDB.stock,
        image: productDB.image,
        category_id: productDB.category_id,
        description: productDB.description,
        brand_id: productDB.brand_id,
        href: "consumidorfinal",
      };
      return productCf;
    } catch {}
  },
  /* END FIND PRODUCT BY ID */

  /* START FIND IN SALE PRODUCTS */
  findInSaleProductsM: async function () {
    try {
      const inSaleProductsDB = await Product.findAll({
        where: {
          offer: 1,
        },
      });
      const inSaleProductsM = inSaleProductsDB.map(function (productDB) {
        return {
          id: productDB.id,
          shortName: productDB.shortName,
          price: formatPrice(productDB.wholesalePrice),
          priceWithDiscount: formatPriceWithDiscount(productDB.wholesalePrice, productDB.discountM),
          discount: productDB.discountM,
          image: productDB.image,
          href: "mayorista",
        };
      });
      return inSaleProductsM;
    } catch {}
  },
  findInSaleProductsCf: async function () {
    try {
      const inSaleProductsDB = await Product.findAll({
        where: {
          offer: 1,
        },
      });
      const inSaleProductsCf = inSaleProductsDB.map(function (productDB) {
        return {
          id: productDB.id,
          shortName: productDB.shortName,
          price: productDB.retailPrice,
          priceWithDiscount:
            productDB.retailPrice * (1 - productDB.discountCf / 100),
          discount: productDB.discountCf,
          image: productDB.image,
          href: "consumidorfinal",
        };
      });
      return inSaleProductsCf;
    } catch {}
  },
  /* END FIND IN SALE PRODUCTS */

  /* START FIND BEST SELLER PRODUCTS */
  findBestSellerProductsM: async function () {
    try {
      const bestSellers = await Product.findAll({
        order: [["sold", "DESC"]],
        limit: 10,
      });

      const bestSellerProductsM = bestSellers.map(function (productDB) {
        return {
          id: productDB.id,
          shortName: productDB.shortName,
          price: formatPrice(productDB.wholesalePrice),
          priceWithDiscount: formatPriceWithDiscount(productDB.wholesalePrice, productDB.discountM),
          discount: productDB.discountM,
          image: productDB.image,
          href: "mayorista",
        };
      });
      return bestSellerProductsM;
    } catch (e) {
      console.log(e);
    }
  },
  findBestSellerProductsCf: async function () {
    try {
      const bestSellers = await Product.findAll({
        order: [["sold", "DESC"]],
        limit: 10,
      });
      const bestSellerProductsCf = bestSellers.map(function (productDB) {
        return {
          id: productDB.id,
          shortName: productDB.shortName,
          price: productDB.retailPrice,
          priceWithDiscount:
            productDB.retailPrice * (1 - productDB.discountCf / 100),
          discount: productDB.discountCf,
          image: productDB.image,
          href: "consumidorfinal",
        };
      });
      return bestSellerProductsCf;
    } catch (e) {
      console.log(e);
    }
  },
  /* END FIND BEST SELLER PRODUCTS */

  /* START RELATED PRODUCTS */
  findRelatedProductsM: async function (product) {
    try {
      const relatedProductsDB = await Product.findAll({
        where: {
          category_id: product.category_id,
        },
      });
      const idProduct = product.id;
      const relatedProductsM = relatedProductsDB
        .filter((productDB) => productDB.id !== idProduct)
        .map(function (productDB) {
          return {
            id: productDB.id,
            shortName: productDB.shortName,
            price: formatPrice(productDB.wholesalePrice),
          priceWithDiscount: formatPriceWithDiscount(productDB.wholesalePrice, productDB.discountM),
            discount: productDB.discountM,
            image: productDB.image,
            href: "mayorista",
          };
        });
      return relatedProductsM;
    } catch {}
  },
  findRelatedProductsCf: async function (product) {
    try {
      const relatedProductsDB = await Product.findAll({
        where: {
          category_id: product.category_id,
        },
      });
      const idProduct = product.id;
      const relatedProductsCf = relatedProductsDB
        .filter((productDB) => productDB.id !== idProduct)
        .map(function (productDB) {
          return {
            id: productDB.id,
            shortName: productDB.shortName,
            price: productDB.retailPrice,
            priceWithDiscount:
              productDB.retailPrice * (1 - productDB.discountCf / 100),
            discount: productDB.discountCf,
            image: productDB.image,
            href: "consumidorfinal",
          };
        });
      return relatedProductsCf;
    } catch {}
  },
  /* END RELATED PRODUCTS */

  /* START CREATE, EDIT AND DELETE PRODUCT */
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
  /* END CREATE, EDIT AND DELETE PRODUCT */
  searchProductsM: async function (inputValue) {
    try {
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${inputValue}%` } },
            { shortName: { [Op.like]: `%${inputValue}%` } },
          ],
        },
      });
      if(!products){
        return null
      } else {
        
        const mappedProducts = products.map((product) => {
          return (product = product.dataValues);
        });
        const productsM = mappedProducts.map(function (productDB) {
          return {
            id: productDB.id,
            shortName: productDB.shortName,
            price: productDB.wholesalePrice,
            price: formatPrice(productDB.wholesalePrice),
          priceWithDiscount: formatPriceWithDiscount(productDB.wholesalePrice, productDB.discountM),
            discount: productDB.discountM,
            image: productDB.image,
            category_id: productDB.category_id,
            brand_id: productDB.brand_id,
            href: "mayorista",
          };
        });
        console.log("SERVIECEEEE", productsM)
        return productsM;
      }
      } catch (e) {
      console.log(e);
    }
  },
  searchProductsCf: async function (inputValue) {
    try {
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${inputValue}%` } },
            { shortName: { [Op.like]: `%${inputValue}%` } },
          ],
        },
      });
      if(!products){
        return null
      } else {
        const mappedProducts = products.map((product) => {
          return (product = product.dataValues);
        });
        const productsCf = mappedProducts.map(function (productDB) {
          return {
            id: productDB.id,
            shortName: productDB.shortName,
            price: productDB.retailPrice,
            priceWithDiscount:
            productDB.retailPrice * (1 - productDB.discountCf / 100),
            discount: productDB.discountCf,
            image: productDB.image,
            category_id: productDB.category_id,
            brand_id: productDB.brand_id,
            href: "consumidorfinal",
          };
        });
        return productsCf;
      }
      } catch (e) {
      console.log(e);
    }
  },
};
