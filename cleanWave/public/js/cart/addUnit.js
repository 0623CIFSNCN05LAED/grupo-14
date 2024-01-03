window.addEventListener("load", function(){
  document.querySelectorAll(".cartItem").forEach((cartItem) => {
     const addButton = cartItem.querySelector("#add");
     const quantityInput = cartItem.querySelector("#quantity");
     const itemInfo = cartItem.querySelector(".itemInfo");
     const productString = decodeURIComponent(
       itemInfo.getAttribute("data-product")
     );
     const product = JSON.parse(productString);     
      
        addButton.addEventListener("click", function (e) {
          // aumenta en 1 la cantidad
          e.preventDefault();
          quantityInput.value = Number(quantityInput.value) + 1;

          // agrega el producto al carrito

          const quantity = 1;
          const data = { product, quantity };

          fetch("/cart/addToCart", {
            /* la ruta del fetch va a la misma ruta que esa en el router */
            method: "POST",
            body: JSON.stringify(
              data
            ) /* este data es el que se le pasa al servidor como req.body*/,
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
          cartItem.querySelector(".totalPrice").innerHTML =
            cartItem.querySelector("#price").innerHTML *
            Number(quantityInput.value);

          // Actualiza precios totales del carrito
          const totalPrices = document.querySelectorAll(".totalPrice");
          let cartSubtotalPrice = 0;

          totalPrices.forEach((totalPrice) => {
            cartSubtotalPrice += parseFloat(totalPrice.innerHTML);
          });
          document.querySelector("#cartSubtotal").innerHTML = cartSubtotalPrice;
          document.querySelector("#cartTotal").innerHTML = cartSubtotalPrice;
        });
  })
})