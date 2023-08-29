const path = require("path");

const productsController = {
  detail: (req, res) => {
    res.render("productDetail");
  },
};

module.exports = productsController;
