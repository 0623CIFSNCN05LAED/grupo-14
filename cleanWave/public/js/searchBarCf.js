document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const searchIcon = document.getElementById("searchIcon");


    function searchProduct(inputValue) {
      fetch(`/consumidorfinal/products/searchProductsCf?inputValue=${inputValue}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("fetch", data);
          window.location.href = "/consumidorfinal/products";
        })
        .catch((e) => {
          console.log("fetchError", e);
        });
    }

    searchIcon.addEventListener("click", function () {
      searchProduct(searchInput.value);
    });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchProduct(searchInput.value);
    }
  });
});
