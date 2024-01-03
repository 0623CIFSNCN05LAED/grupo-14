window.addEventListener("load", function(){
  /* Finalizar compra */
  const checkoutButton = document.querySelector(".checkoutButton");
  if(checkoutButton){
    checkoutButton.addEventListener("click", function (e) {
      e.preventDefault();

      fetch("/cart/purchaseCart", {
        method: "PUT",
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
      window.alert("Compraste el carrito");
      window.location.href = "/cart";
    });
  }

})