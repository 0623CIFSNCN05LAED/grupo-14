
const productsController = {
  detail: (req, res) => {
    res.render("productDetail"); 
  },
  cart: (req,res)=>{
    res.render("productCart");
  },
};

module.exports = productsController;
