const {Cart, CartProduct, Product} = require("../database/models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  findCartByUserId: async function (userId) {
  try {
    const activeCart = await Cart.findOne({
      include: {
          model: Product,
          as: "product"
      },
      where: {
          user_id: userId,
          status: "active"
      }
    });
    console.log("findCarByUserID", activeCart.dataValues)
    return activeCart.dataValues
  } catch (error) {
    console.log(error)
  }
  },

  addToCart: async function(product, userId, quantity){
    try{
    const existingCart = await this.findCartByUserId(userId)
    
    let cart;
    if (existingCart) {
      cart = existingCart;
    } else {
      cart = await Cart.create({
        id: uuidv4(),
        user_id: userId,
        quantity: quantity, 
        total_price: product.priceWithDiscount * quantity, 
        status: "active",
        purchase_date: null
      });
    }
    const cartProduct = await CartProduct.findOne({
      where: {
        cart_id: cart.id
      }
    })
    if(cartProduct.id != product.id){
      await CartProduct.create({
        cart_id: cart.id,
        product_id: product.id,
        quantity: quantity,
        total_price: product.priceWithDiscount * quantity, 
        
      })
    } else {
      await CartProduct.update(
        {
            quantity: cart.quantity + quantity,
            total_price: product.priceWithDiscount * (cartProduct.quantity + quantity)
        },
        {
          where: {
            cart_id: cart.id,
            product_id: product.id
          }
        }
      )
    }

    }catch{
  } 
  },


}