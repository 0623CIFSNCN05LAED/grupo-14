/* Beneficios al consumidor final  */

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

/* FIN Beneficios al consumidor final  */


/* CARRUSEL */
const carouselContainerOpportunities = document.querySelector(".carouselContainerOpportunities");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".carouselContainerOpportunities i");
const carouselChildrens = [...carousel.children];


if (carouselChildrens.length > 1){/* si hay mas de un producto se aplica logica de carrusel */ 



// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

/* efectos Dragging cuando presiono el mouse encima */

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

const dragStart = (e) => {
    const card = e.target.closest('.card');
    if (!card) return; // Si el click no ocurrió dentro de una tarjeta, salir
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;

    // Records the initial cursor and left position of the image in the card
    const cardImage = card.querySelector("img");
    startImageX = e.pageX - cardImage.getBoundingClientRect().left;

    // Evita que se seleccione texto durante el arrastre
    e.preventDefault();
}

const dragging = (e) => {
    if (!isDragging) return; // Si isDragging es false, salir de la función
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

    // Updates the left position of the image in the card based on the cursor movement
    const cardImage = document.querySelector(".card img");
    const newImageLeft = e.pageX - startImageX;
    cardImage.style.left = `${newImageLeft}px`;

    // Evita que se seleccione texto durante el arrastre
    e.preventDefault();
}

const dragStop = () => {
    if (!isDragging) return; // Si isDragging es false, salir de la función
    isDragging = false;
    carousel.classList.remove("dragging");

    // Resets the position of the image in the card
    const cardImage = document.querySelector(".card img");
    cardImage.style.transition = "left 0.3s ease-in-out"; // Adds a smooth transition
    cardImage.style.left = "0"; // Resets the image position
    setTimeout(() => {
        cardImage.style.transition = ""; // Removes the transition after a brief delay
    }, 300);
}



const infiniteScroll = () => {
    // If the carousel is at the end, append copies of the first few cards to the end
    if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });
    }
    // If the carousel is at the beginning, append copies of the last few cards to the beginning
    else if (carousel.scrollLeft === 0) {
        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });
        // Adjust the scroll position to simulate seamless scrolling
        carousel.scrollLeft = carousel.offsetWidth;
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!carouselContainerOpportunities.matches(":hover")) autoPlay();
}



const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
carouselContainerOpportunities.addEventListener("mouseenter", () => clearTimeout(timeoutId));
carouselContainerOpportunities.addEventListener("mouseleave", autoPlay);
}
/* FIN CARRUSEL */