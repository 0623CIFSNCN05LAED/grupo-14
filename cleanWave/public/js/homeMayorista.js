document.addEventListener('DOMContentLoaded', function () {
  function restartAnimation() {
    const animatedItems = document.querySelectorAll('.benefitsList .animated-list-item');

    animatedItems.forEach(function (item) {
      item.classList.remove('initial-hidden');
      item.style.animation = 'none';
      // Force a reflow to cancel the animation
      void item.offsetWidth;
      item.style.animation = null;
      item.classList.add('initial-hidden');
    });
  }

  // Configura la repetición cada 30 segundos
  setInterval(restartAnimation, 15000);

  restartAnimation(); // Llamada inicial para la carga de la página

  // Ahora agregamos el evento a cada elemento dentro de la función restartAnimation
  document.querySelectorAll('.benefitsList .animated-list-item').forEach(function (item) {
    item.addEventListener('animationstart', function () {
      item.classList.remove('initial-hidden');
    });
  });
});
