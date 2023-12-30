
  /* EFECTO LETRAS */
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
  
    // Inicia la animación al cargar la página
    restartAnimation();
  
    // Configura la repetición cada 30 segundos
    setInterval(restartAnimation, 15000);
  
    animatedItems.forEach(function (item) {
      item.addEventListener('animationstart', function () {
        item.classList.remove('initial-hidden');
      });
    });
  });
  

  