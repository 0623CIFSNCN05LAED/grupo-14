document.addEventListener("DOMContentLoaded", function () {
  const priceScript =
    document.getElementById("priceScript"); /* agarro al elemento script */
  const productString = decodeURIComponent(
    priceScript.getAttribute("data-product")
  ); /* decodifico la informacion que me paso la vista */
  const product =
    JSON.parse(productString); /* paso esa informacion a formato json */

  const path = window.location.pathname;
  const notPrice = document.getElementById("notPrice");
  const discount = document.getElementById("discount");
  const priceWithDiscount = document.getElementById("priceWithDiscount");
  const price = document.getElementById("price");
  if (path.includes("mayorista")) {
    if (product.discount > 0) {
      notPrice.innerHTML = `$ ${product.wholesalePrice}`;
      discount.innerHTML = `${product.discount}% OFF`;
      priceWithDiscount.innerHTML = `$ ${product.priceWithDiscount}`;
    } else {
      price.innerHTML = `$ ${product.wholesalePrice}`;
    }
  } else if (path.includes("consumidorfinal")) {
    if (product.discount > 0) {
      notPrice.innerHTML = `$ ${product.retailPrice}`;
      discount.innerHTML = `${product.discount}% OFF`;
      priceWithDiscount.innerHTML = `$ ${product.priceWithDiscount}`;
    } else {
      price.innerHTML = `$ ${product.retailPrice}`;
    }
  }
});
