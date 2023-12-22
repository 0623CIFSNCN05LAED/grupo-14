window.onload = function(){
    document.querySelectorAll(".cartItem").forEach(cartItem => {

        const addButton = cartItem.querySelector("#add");
        const subtractButton = cartItem.querySelector("#subtract");
        const quantityInput = cartItem.querySelector("#quantity");

        addButton.addEventListener("click", function(e) {
            // aumenta en 1 la cantidad
            e.preventDefault();
            quantityInput.value = Number(quantityInput.value) + 1;
            
            // agrega el producto al carrito
            const productId = cartItem.querySelector(".itemInfo").id ;
            const quantity = 1;
            const data = { productId, quantity };
            
            fetch("/cart/addToCart", { /* la ruta del fetch va a la misma ruta que esa en el router */
                method: "POST",
                body: JSON.stringify(data), /* este data es el que se le pasa al servidor como req.body*/
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                return response.json()
            }).then(function(info){
                console.log("info",info)
            })

            // Actualiza el precio total del item
            cartItem.querySelector(".totalPrice").innerHTML = cartItem.querySelector("#price").innerHTML * Number(quantityInput.value) 
            
            // Actualiza precios totales del carrito
            const totalPrices = document.querySelectorAll(".totalPrice");
            let cartSubtotalPrice = 0;
            
            totalPrices.forEach((totalPrice)=>{
              cartSubtotalPrice += parseFloat(totalPrice.innerHTML);
            })
            document.querySelector("#cartSubtotal").innerHTML = cartSubtotalPrice;
            document.querySelector("#cartTotal").innerHTML = cartSubtotalPrice;            
        });

        subtractButton.addEventListener("click", function(e) {
            // Disminuye en 1 la cantidad
            e.preventDefault();
           
            if(quantityInput.value > 0 && quantityInput.value == 1) {
              quantityInput.value = Number(quantityInput.value) - 1;
              cartItem.querySelector(".itemInfo").classList.add("displayNone");
            } else if (quantityInput.value > 0){
              quantityInput.value = Number(quantityInput.value) - 1;
            }

            // elimina una unidad(1) de ese producto del carrito
            const productId = cartItem.querySelector(".itemInfo").id;
            fetch("cart/deleteOneUnitFromCart", {
              method: "PUT",
              body: JSON.stringify({productId}),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (info) {
                console.log("info", info);
              });

            // Actualiza el precio total del item
            cartItem.querySelector(".totalPrice").innerHTML = cartItem.querySelector("#price").innerHTML * Number(quantityInput.value) 

            // Actualiza precios totales del carrito
            const totalPrices = document.querySelectorAll(".totalPrice");
            let cartSubtotalPrice = 0;
            
            totalPrices.forEach((totalPrice)=>{
              cartSubtotalPrice += parseFloat(totalPrice.innerHTML);
            })
            document.querySelector("#cartSubtotal").innerHTML = cartSubtotalPrice;
            document.querySelector("#cartTotal").innerHTML = cartSubtotalPrice;

        });

        /* Eliminar articulo */
        const eraseArticleButton = cartItem.querySelector(".eraseArticleButton");

        eraseArticleButton.addEventListener("click", function(e){
          e.preventDefault();

          const productId = cartItem.querySelector(".itemInfo").id;
          cartItem.querySelector(".itemInfo").classList.add("displayNone")

          fetch("/cart/deleteArticleFromCart", {
            method: "DELETE",
            body: JSON.stringify({ productId }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (info) {
              console.log("info", info);
            });

            // Actualiza precios totales del carrito
             const totalPrices = document.querySelectorAll(".totalPrice");
             const erasedArticlePrice = cartItem.querySelector(".totalPrice");
             erasedArticlePrice.classList.remove("totalPrice")
             let cartSubtotalPrice = 0;

            totalPrices.forEach((totalPrice)=>{
              cartSubtotalPrice += parseFloat(totalPrice.innerHTML);
            })
            document.querySelector("#cartSubtotal").innerHTML = cartSubtotalPrice - parseFloat(erasedArticlePrice.innerHTML);
            document.querySelector("#cartTotal").innerHTML = cartSubtotalPrice - parseFloat(erasedArticlePrice.innerHTML);
        })

        /* Vaciar carrito */
        const emptyCartButton = document.querySelector(".emptyCartButton");
        
        emptyCartButton.addEventListener("click", function(e){
          e.preventDefault();
          cartItem.classList.add("displayNone")
          
          fetch("/cart/eraseCart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (info) {
              console.log("info", info);
            });
            document.querySelector("#cartSubtotal").innerHTML = 0;
            document.querySelector("#cartTotal").innerHTML = 0;
        })

    });





}