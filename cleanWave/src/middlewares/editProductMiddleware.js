const { validationResult } = require("express-validator");
const productService = require("../services/productService");



module.exports = async (req, res, next) => {
  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    try{
      const id = req.params.id;
      const product = await productService.findById(id)
      res.render("products/editProduct", {
        errors: errores.mapped(),
        oldData: req.body,
        product
      });
    }catch{}
  } else {
    next();
  }
};
