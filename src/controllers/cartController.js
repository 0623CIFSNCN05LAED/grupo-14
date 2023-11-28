const cartService = require("../services/cartService");

module.exports = {
    viewCart: async (req, res) => {
      try{

        const userId = req.session.userLogged.id
        const activeCarts = await cartService.findCartByUserId(userId);
        // console.log("CONTROLER",activeCarts)
        // console.log("producto", activeCarts[0].product[0].name)
        res.render("products/productCart", {activeCarts});

      } catch{

      }
  },

  addToCart: (req,res)=>{
    const product = req.body.product;
    const userId = req.body.userId;
    const quantity = req.body.quantity
    cartService.addToCart(product,userId, quantity)
  }
}