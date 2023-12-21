const {Cart, CartProduct, Product} = require("../database/models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  findCartByUserId: async function (userId) {
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
      return activeCart.dataValues;
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
      return cartProduct.dataValues;
    } catch {}
  },

  addToCart: async function (product, userId, quantity) {
    try {
      const existingCart = await this.findCartByUserId(userId);
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

        if (cartProduct && cartProduct.product_id == product.id) {
          /* si existe carrito y producto */
          await CartProduct.update(
            {
              quantity: Number(cartProduct.quantity) + Number(quantity),
              total_price:
                product.priceWithDiscount *
                (Number(cartProduct.quantity) + Number(quantity)),
            },
            {
              where: { product_id: product.id, cart_id: cart.id },
            }
          );
        } else {
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
            where: { user_id: userId },
          }
        );
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  },

  deleteOneUnitFromCart: async function (product, userId) {
    try {
      const cart = await this.findCartByUserId(userId);
      const cartProduct = await this.findCartProductByCartAndProduct(
        cart,
        product
      );
        
      await CartProduct.update(
        {
          quantity: cartProduct.quantity == 0 ? 0 : cartProduct.quantity - 1,
        },
        {
          where: {
            cart_id: cart.id,
            product_id: product.id,
          },
        }
      );

      if (cartProduct.quantity == 0) {
        await CartProduct.destroy({
          where: {
            cart_id: cart.id,
            product_id: product.id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getAllRowsInCartProductByUserId: async function (userId) {
    try {
      const activeCart = await this.findCartByUserId(userId);

      const cartProductRows = await CartProduct.findAll({
        attributes: ["cart_id", "product_id", "quantity", "total_price"],
        where: { cart_id: activeCart.id },
      });
      const cartProductRowsDataValues = cartProductRows.map(
        (cartProduct) => cartProduct.dataValues
      );
      return cartProductRowsDataValues;
    } catch (error) {
      console.log(error);
    }
  },
  getAllProductsInActiveCartByUserId: async function (userId) {
    try {
      const activeCart = await this.findCartByUserId(userId);
      const products = activeCart.product.map((product) => product.dataValues);
      return products;
    } catch (error) {
      console.log(error);
    }
  },
};