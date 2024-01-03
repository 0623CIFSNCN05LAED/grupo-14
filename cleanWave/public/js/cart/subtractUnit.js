window.addEventListener("load", function () {
  document.querySelectorAll(".cartItem").forEach((cartItem) => {
    const subtractButton = cartItem.querySelector("#subtract");
    const quantityInput = cartItem.querySelector("#quantity");
    const itemInfo = cartItem.querySelector(".itemInfo");
    const productString = decodeURIComponent(
      itemInfo.getAttribute("data-product")
    );
    const product = JSON.parse(productString);


    subtractButton.addEventListener("click", function (e) {
      // Disminuye en 1 la cantidad
      e.preventDefault();

      if (quantityInput.value > 0 && quantityInput.value == 1) {
        quantityInput.value = Number(quantityInput.value) - 1;
        itemInfo.classList.add("displayNone");
      } else if (quantityInput.value > 0) {
        quantityInput.value = Number(quantityInput.value) - 1;
      }

      // elimina una unidad(1) de ese producto del carrito
      fetch("cart/deleteOneUnitFromCart", {
        method: "PUT",
        body: JSON.stringify({ product }),
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

  });


});
