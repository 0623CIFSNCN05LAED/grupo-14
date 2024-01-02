window.onload = function(){
  const searchInput = document.getElementById("search");
  const searchIcon = document.getElementById("searchIcon");
  // const cookies = document.cookie.split(";");
  // const userTypeCookie = cookies.find(cookie => cookie.trim().startsWith("userType="));
  // const userTypeValue = userTypeCookie ? userTypeCookie.split("=")[1] : null;

  function searchProduct(inputValue) {
    // console.log("Valor de la cookie 'userType':", userTypeValue);
    // const url = window.location.href
    // console.log("URLLLLLLLLLLLLLLLLL",url)
    fetch(`/mayorista/products/searchProductsM?inputValue=${inputValue}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("fetch", data);
        // if (url.includes("/mayorista") || userTypeValue == "mayorista") { 
          window.location.href = "/mayorista/products";
        // }
      })
      .catch((e) => {
        console.log("fetchError",e);
      });
  }

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      console.log("enterrrrrrrrrrrrrrrrrrrrrrrrrr",searchInput.value)
      searchProduct(searchInput.value);
    }
  });

  searchIcon.addEventListener("click", function () {
    searchProduct(searchInput.value);
  });

}