window.onload = function(){
  /* Beneficios al consumidor final */
  const benefitsList = document.querySelector('.benefitsList');
  const listItems = benefitsList.querySelectorAll('li');
  const durationPerCharacter = 10; // Milisegundos por carácter
  const pauseBetweenAnimations = 150; // Pausa entre animaciones en milisegundos
  const pauseAfterCompletion = 10000; // Pausa después de completar todas las animaciones en milisegundos
  const fadeOutDuration = 300; // Duración de la transición de opacidad al reiniciar
  
  function showListItem(index) {
    if (index < listItems.length) {
      const listItem = listItems[index];
      const text = listItem.textContent;
      listItem.textContent = ''; // Limpiamos el contenido actual
      
      for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
        listItem.textContent += text[i];
      }, i * durationPerCharacter);
    }
    
    setTimeout(() => {
      listItem.style.opacity = 1; // Muestra el elemento después de la animación de texto
      showListItem(index + 1); // Llamada recursiva para el siguiente elemento
    }, text.length * durationPerCharacter + pauseBetweenAnimations);
  } else {
    // Todas las animaciones han terminado
    setTimeout(() => {
      // Reinicia la animación después de una rápida transición de opacidad
      resetAnimation();
    }, pauseAfterCompletion - fadeOutDuration);
  }
}

function resetAnimation() {
  // Rápida transición de opacidad para ocultar todos los elementos
  listItems.forEach(item => {
    item.style.transition = `opacity ${fadeOutDuration}ms ease-in-out`;
    item.style.opacity = 0;
  });

  // Reinicia la animación después de la transición
  setTimeout(() => {
    listItems.forEach(item => {
      item.style.transition = ''; // Restaura la transición
    });
    showListItem(0);
  }, fadeOutDuration);
}

// Inicia la animación después de un tiempo específico
setTimeout(() => {
  showListItem(0);
}, 250);

/* FIN Beneficios al consumidor final */

}