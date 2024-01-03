window.addEventListener("load", function(){
  document.querySelectorAll(".cartItem").forEach((cartItem) => {
    const itemInfo = cartItem.querySelector(".itemInfo");
    const productString = decodeURIComponent(
      itemInfo.getAttribute("data-product")
    );
    const product = JSON.parse(productString);

    /* Eliminar articulo */
    const eraseArticleButton = cartItem.querySelector(".eraseArticleButton");

    eraseArticleButton.addEventListener("click", function (e) {
      e.preventDefault();

      itemInfo.classList.add("displayNone");

      fetch("/cart/deleteArticleFromCart", {
        method: "DELETE",
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

      // Actualiza precios totales del carrito
      const totalPrices = document.querySelectorAll(".totalPrice");
      const erasedArticlePrice = cartItem.querySelector(".totalPrice");
      erasedArticlePrice.classList.remove("totalPrice");
      let cartSubtotalPrice = 0;

      totalPrices.forEach((totalPrice) => {
        cartSubtotalPrice += parseFloat(totalPrice.innerHTML);
      });
      document.querySelector("#cartSubtotal").innerHTML =
        cartSubtotalPrice - parseFloat(erasedArticlePrice.innerHTML);
      document.querySelector("#cartTotal").innerHTML =
        cartSubtotalPrice - parseFloat(erasedArticlePrice.innerHTML);
    });
  });
});