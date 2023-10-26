const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.render("products/createProduct", {
      errors: errores.mapped(),
      oldData: req.body,
    });
  } else {
    next();
  }
};
