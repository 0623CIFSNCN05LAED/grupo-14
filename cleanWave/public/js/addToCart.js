window.addEventListener("load", function () {
  const quantityInput = document.getElementById("quantity");
  const addButton = document.getElementById("add");
  const subtractButton = document.getElementById("subtract");

  addButton.addEventListener("click", function (e) {
    e.preventDefault();
    quantityInput.value = Number(quantityInput.value) + 1;
  });

  subtractButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (quantityInput.value > 1) {
      quantityInput.value = Number(quantityInput.value) - 1;
    }
  });

  const addToCartScript =
    document.getElementById("addToCartScript"); /* agarro al elemento script */
  const productString = decodeURIComponent(
    addToCartScript.getAttribute("data-product")
  ); /* decodifico la informacion que me paso la vista */
  const product =
    JSON.parse(productString); /* paso esa informacion a formato json */


  const addToCartButton = document.getElementById("addToCart");

  addToCartButton.addEventListener("click", function () {
    const quantity = quantityInput.value;
    const data = { product, quantity };
    fetch("/cart/addToCart", {
      /* la ruta del fetch apunta al metodo del controller que use esa ruta */
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
  });
});
