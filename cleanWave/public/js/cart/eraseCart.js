window.addEventListener("load", function(){
  /* Vaciar carrito */
  const emptyCartButton = document.querySelector(".emptyCartButton");
  if(emptyCartButton){
    emptyCartButton.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".cartItem").forEach((cartItem) => {
        cartItem.classList.add("displayNone");
      });
  
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
    });
  }

})