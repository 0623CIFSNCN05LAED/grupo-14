const {Cart, CartProduct, Product} = require("../database/models");
const { v4: uuidv4 } = require("uuid");
const userService = require("../services/userDBservice");
const productService = require("../services/productService");
const currentDate = new Date()

module.exports = {
  findActiveCartByUserId: async function (userId) {
    try {
      const activeCart = await Cart.findOne({
        include: {
          model: Product,
          as: "product",
        },
        where: {
          user_id: userId,
          status: "active",
        },
      });
      if (activeCart) {
        return activeCart.dataValues;
      }
    } catch (error) {
      console.log(error);
    }
  },
  findCartProductByCartAndProduct: async function (cart, product) {
    try {
      const cartProduct = await CartProduct.findOne({
        where: {
          cart_id: cart.id,
          product_id: product.id,
        },
      });
      if(cartProduct){
        return cartProduct.dataValues
      } else {
        return null
      }
    } catch (e){console.log(e)}
  },

  addToCart: async function (product, userId, quantity) {
    try {
      const existingCart = await this.findActiveCartByUserId(userId);
      const cartProduct = await this.findCartProductByCartAndProduct(
        existingCart,
        product
      );
      let cart;

      if (!existingCart) {
        /* si no existe carrito */
        cart = await Cart.create({
          id: uuidv4(),
          user_id: userId,
          quantity: quantity,
          total_price: product.priceWithDiscount * quantity,
          status: "active",
          purchase_date: null,
        });

        await CartProduct.create({
          cart_id: cart.id,
          product_id: product.id,
          quantity: quantity,
          total_price: product.priceWithDiscount * quantity,
        });
      } else {
        /* si existe carrito */
        cart = existingCart;

        if (cartProduct != null && cartProduct.product_id == product.id) {
          /* si existe cartProduct y producto */
          await CartProduct.update(
            {
              quantity: Number(cartProduct.quantity) + Number(quantity),
              total_price: product.priceWithDiscount * (Number(cartProduct.quantity) + Number(quantity)),
            },
            {
              where: { product_id: product.id, cart_id: cart.id },
            }
          );
        } else{
          /* si existe carrito pero NO producto */
          await CartProduct.create({
            cart_id: cart.id,
            product_id: product.id,
            quantity: quantity,
            total_price: product.priceWithDiscount * quantity,
          });
        }

        await Cart.update(
          {
            quantity: await CartProduct.sum("quantity", {
              where: { cart_id: cart.id },
            }),
            total_price: await CartProduct.sum("total_price", {
              where: { cart_id: cart.id },
            }),
          },
          {
            where: { user_id: userId, id:cart.id },
          }
        );
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  },

  deleteOneUnitFromCart: async function (product, userId) {
    try {
      const cart = await this.findActiveCartByUserId(userId);
      const cartProduct = await this.findCartProductByCartAndProduct(
        cart,
        product
      );
      if (cartProduct.quantity == 1) {
        await CartProduct.destroy({
          where: {
            cart_id: cart.id,
            product_id: product.id,
          },
        });
      } else {
        await CartProduct.update(
          {
            quantity: cartProduct.quantity - 1,
            total_price: cartProduct.total_price - product.priceWithDiscount,
          },
          {
            where: {
              cart_id: cart.id,
              product_id: product.id,
            },
          }
        );
      }
      await Cart.update(
        {
          quantity: cart.quantity - 1,
          total_price: cart.total_price - product.priceWithDiscount,
        },
        {
          where: {
            id: cart.id,
            user_id: userId,
          },
        }
      );

      if (cart.quantity == 1) {
        Cart.destroy({
          where: {
            id: cart.id,
            user_id: userId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteArticleFromCart: async function (product, userId) {
    try {
      const cart = await this.findActiveCartByUserId(userId);
      const cartProduct = await this.findCartProductByCartAndProduct(
        cart,
        product
      );
      
      Cart.update(
        {
          quantity: cart.quantity - cartProduct.quantity,
          total_price: cart.total_price - cartProduct.total_price,
        },
        {
          where: {
            id: cart.id,
            user_id: userId,
          },
        }
      );

      CartProduct.destroy({
        where: {
          cart_id: cart.id,
          product_id: product.id,
        },
      });


      if (cartProduct.quantity == cart.quantity) {
        Cart.destroy({
          where: {
            id: cart.id,
            user_id: userId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  eraseCart: async function(userId){
    try {
      const cart = await this.findActiveCartByUserId(userId);

      await CartProduct.destroy({
        where: {cart_id: cart.id}
      })

      Cart.destroy({
        where: { id: cart.id, user_id: userId },
      });

    }catch(e){
      console.log(e)
    }
  },
  purchaseCart: async function(userId){
    try{
      const allRows = await this.getAllRowsInCartProductByUserId(userId)
      const activeCart = await this.findActiveCartByUserId(userId)
      console.log("tarrarara", allRows)

      allRows.forEach(async (row)=>{
        try{

          const product =  await productService.findById(row.product_id)
  
          Product.update(
            {
              stock: product.stock - row.quantity,
              sold: product.sold + row.quantity
            },
            {
              where: {
                id: product.id,
              },
            }
          );
        } catch (e){
          console.log(e)
        }
      })

      Cart.update({
        status: "purchased",
        purchase_date: currentDate
      },
      {
        where: {user_id: userId, status: "active", id: activeCart.id}
      })

    }catch(e){
      console.log(e)
    }
  },

  getAllRowsInCartProductByUserId: async function (userId) {
    try {
      const activeCart = await this.findActiveCartByUserId(userId);
      if (activeCart) {
        const cartProductRows = await CartProduct.findAll({
          attributes: ["cart_id", "product_id", "quantity", "total_price"],
          where: { cart_id: activeCart.id },
        });
        const cartProductRowsDataValues = cartProductRows.map(
          (cartProduct) => cartProduct.dataValues
        );
        return cartProductRowsDataValues;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllProductsInActiveCartByUserId: async function (userId) {
    try {
      const activeCart = await this.findActiveCartByUserId(userId);
      const user = await userService.findById(userId)
if (activeCart) {
  const products = activeCart.product.map((product) => product.dataValues);

  if (user.businessName != null) {
    products.map((product) => {
      product.priceWithDiscount =
        Number(product.wholesalePrice) -
        (Number(product.wholesalePrice) * (product.discountM / 100));
    });
  } else if (user.dni != null) {
    products.map((product) => {
      product.priceWithDiscount =
        Number(product.retailPrice) -
        Number(product.retailPrice) * (product.discountCf / 100);
    });
  }

  return products;
}


    } catch (error) {
      console.log(error);
    }
  },
};