const productService = require("../services/productService");
const {validationResult} = require("express-validator")

const productsController = {
  detail: (req, res) => {
    const id = req.params.id;
    const product = productService.getFormattedProduct(id); // Requiero un producto en base al id
    const relatedProducts = productService.getRelatedProducts(product); // Por ahora muestra todos los productos en la seccion de productos relacionados hasta que tengamos bien las categorias

    if (!product) {
      return res.render("main/homeMayorista");
    }

    res.render("products/productDetail", { product, relatedProducts });
  },

  cart: (req, res) => {
    res.render("products/productCart");
  },

  create: (req, res) => {
    res.render("products/createProduct");
  },

  newProduct: (req, res) => {

    const errors = validationResult(req); 

    if(errors.isEmpty()){
      const product = { /* esto pasarlo a service o data, no deberia estar aca la logica*/
        name: req.body.name,
        shortName: req.body.shortName,
        brand: req.body.brand,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
        preferentialPrice: Number(req.body.preferentialPrice),
        mount: Number(req.body.mount),
        category: req.body.category,
        image: req.file ? req.file.filename : "defaultImg.jpg",
        description: req.body.description,
      };
      productService.createProduct(product);
      res.redirect("/products");
    } else{
      return res.render("products/createProduct",
        { errors: errors.mapped(), /* Convertimos el array de objetos en un objeto de objetos */
          oldData: req.body 
      } 
      )
      
    }

  },

  productsList: (req, res) => {
    const products = productService.getFormattedProducts();
    res.render("products/productList", { products });
  },

  edit: (req, res) => {
    const id = req.params.id;
    const product = productService.getProduct(id);
    res.render("products/editProduct", { product });
  },

  update: (req, res) => {
    const product = req.body;
    const id = req.params.id;
    const file = req.file
    productService.updateProduct(id, product,file);
    res.redirect("/products");
  },
  delete: (req, res) => {
    const id = req.params.id;
    productService.deleteProduct(id);
    res.redirect("/products");
  },
};

module.exports = productsController;
