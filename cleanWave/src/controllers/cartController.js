const cartService = require("../services/cartService");
const productService = require("../services/productService")

module.exports = {
    viewCart: async (req, res) => {
      try{
        const userId = req.session.userLogged.id
        // console.log("USUARIOOOOOOOOOOOOOOOOOO", req.session.userLogged)
        const activeCart = await cartService.findCartByUserId(userId); /* PUEDO CAMBIAR LAS FUNCIONES A GETCARTBYACTIVECART */
        const products = await cartService.getAllProductsInActiveCartByUserId(userId)
        const cartProduct = await cartService.getAllRowsInCartProductByUserId(userId)
        res.render("products/productCart", {activeCart, products, cartProduct}); /* SON 3 ARRAYS DE OBJETOS */

      } catch(error){
        console.log(error)
      }
  },

  addToCart: async (req,res)=>{
    try {
      const product = await productService.findById(req.body.productId)
      const userId = req.session.userLogged.id;
      const quantity = req.body.quantity
      cartService.addToCart(product,userId, quantity)
      
    } catch (error){
      console.log(error)
    }
  },

  deleteOneUnitFromCart: async (req,res)=>{
    try {
       const product = await productService.findById(req.body.productId);
      const userId = req.session.userLogged.id;
      cartService.deleteOneUnitFromCart(product, userId);
      
    } catch (error){
      console.log(error)
    }
  },

  deleteArticleFromCart: async (req,res)=>{
    try {
       const product = await productService.findById(req.body.productId);
       const userId = req.session.userLogged.id;
       cartService.deleteArticleFromCart(product, userId);
    } catch(error){
      console.log(error)
    }
  }
}