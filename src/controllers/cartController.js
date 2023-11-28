const cartService = require("../services/cartService");

module.exports = {
    viewCart: async (req, res) => {
      try{
        const userId = req.session.userLogged.id
        const activeCart = await cartService.findCartByUserId(userId); /* PUEDO CAMBIAR LAS FUNCIONES A GETCARTBYACTIVECART */
        const products = await cartService.getAllProductsInActiveCartByUserId(userId)
        const cartProduct = await cartService.getAllRowsInCartProductByUserId(userId)
        res.render("products/productCart", {activeCart, products, cartProduct}); /* SON 2 ARRAYS DE OBJETOS */

      } catch(error){
        console.log(error)
      }
  },

  addToCart: (req,res)=>{
    const product = req.body.product;
    const userId = req.body.userId;
    const quantity = req.body.quantity
    cartService.addToCart(product,userId, quantity)
  }
}