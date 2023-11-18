const { Cart, Product } = require("../../src/database/models")

window.onload = function(){
    
    const addToCartButton = document.getElementById("addToCart");
    
    addToCartButton.addEventListener("click", async function({req}){
        try{

            const product = await Product.findOne({where: {id:req.params.id}})
            const cart = {
                id: product.id,
                total_price: product.retailPrice,

            }
            await Cart.create(cart)

        } catch{

        }
    })
    
}