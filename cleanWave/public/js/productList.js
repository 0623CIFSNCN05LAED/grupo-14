document.getElementById('categorySelect').addEventListener('change', function() {
  let selectedCategoryId = this.value;
  let foundProducts = false;

  document.querySelectorAll('.allProducts .card').forEach(function(productCard) {
    let cardCategoryId = productCard.getAttribute('data-category-id');

    if (selectedCategoryId === 'all' || selectedCategoryId === cardCategoryId) {
      productCard.style.display = 'flex';
      foundProducts = true; 
    } else {
      productCard.style.display = 'none';
    }
  });

  if (!foundProducts) {
    alert('Disculpe, por el momento no hay productos en la categoría seleccionada.');
  }
});
