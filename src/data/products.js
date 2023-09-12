const fs = require("fs");
const path = require("path");

/**************** Objeto de objetos de funciones genericas ***************/
/**************** Exportado y requerido en productService.js *************/
const db = {
  products: {
    
    findAll: () => {    // Buscar toda la lista de productos
      // Treamons y convertimos el archivo .json en .js
      const productsFilePath = path.join( __dirname, "../data/productsDataBase.json");
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
      return products;
    },
   
    findById: (id) => { // Buscar producto por id
      // Treamons y convertimos el archivo .json en .js
      const productsFilePath = path.join( __dirname, "../data/productsDataBase.json");
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
      const product = products.find((product) => product.id == id);
      return product;
    },
   
    create: (product) => {  // Crear un producto
      /* console.log(`Creating product ${product.name}`);
      return product; */
    },
    
    update: (id, product) => { // Modificar un producto
      /* console.log(`Updating product ${product.name}`);
      return product; */
    },
    
    delete: (id) => { // Eliminar un producto
      /* console.log(`Deleting product with id ${id}`); */
    },
  },
};

module.exports = db;
