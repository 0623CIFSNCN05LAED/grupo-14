const cartService = require("../services/cartService");
const productService = require("../services/productService")

module.exports = {
    viewCart: async (req, res) => {
      try{
        const userId = req.session.userLogged.id
        const activeCart = await cartService.findActiveCartByUserId(userId);
        const products = await cartService.getAllProductsInActiveCartByUserId(userId)
        const cartProduct = await cartService.getAllRowsInCartProductByUserId(userId)
        res.render("products/productCart", {activeCart, products, cartProduct}); 

      } catch(error){
        console.log(error)
      }
  },

  addToCart: async (req,res)=>{
    try {
      const product = req.body.product
      const userId = req.session.userLogged.id;
      const quantity = req.body.quantity
      cartService.addToCart(product,userId, quantity)
      
    } catch (error){
      console.log(error)
    }
  },

  deleteOneUnitFromCart: async (req,res)=>{
    try {
       const product = req.body.product;
      const userId = req.session.userLogged.id;
      cartService.deleteOneUnitFromCart(product, userId);
      
    } catch (error){
      console.log(error)
    }
  },

  deleteArticleFromCart: async (req,res)=>{
    try {
       const product = req.body.product;
       const userId = req.session.userLogged.id;
       cartService.deleteArticleFromCart(product, userId);
    } catch(error){
      console.log(error)
    }
  },
  eraseCart: async (req,res)=>{
    try{
      const userId = req.session.userLogged.id;
      cartService.eraseCart(userId);
    }catch(e){
      console.log(e)
    }
  },
  purchaseCart: async(req,res)=>{
    try{
      const userId = req.session.userLogged.id;
      cartService.purchaseCart(userId)
    }catch (e){
      console.log(e)
    }
  }
}