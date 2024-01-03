window.addEventListener("load", function(){
  const searchInput = document.getElementById("search");
  const searchIcon = document.getElementById("searchIcon");

  function searchProduct(inputValue) {
    fetch(`/mayorista/products/searchProductsM?inputValue=${inputValue}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("fetch", data);
          window.location.href = "/mayorista/products";
      })
      .catch((e) => {
        console.log("fetchError",e);
      });
  }

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchProduct(searchInput.value);
    }
  });

  searchIcon.addEventListener("click", function () {
    searchProduct(searchInput.value);
  });

})