const fs = require("fs");
const path = require("path");

const db = {
  products: {
    // Buscar toda la lista de productos
    find: () => {
      const productsFilePath = path.join(
        __dirname,
        "../data/productsDataBase.json"
      );
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
      return products;
    },
    // Buscar producto por id
    findById: (id) => {
      const productsFilePath = path.join(
        __dirname,
        "../data/productsDataBase.json"
      );
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
      const product = products.find((product) => product.id == id);
      return product;
    },
    // Crear un producto
    create: (product) => {
      /* console.log(`Creating product ${product.name}`);
      return product; */
    },
    // Modificar un producto
    update: (id, product) => {
      /* console.log(`Updating product ${product.name}`);
      return product; */
    },
    // Eliminar un producto
    delete: (id) => {
      /* console.log(`Deleting product with id ${id}`); */
    },
  },
};

module.exports = db;
