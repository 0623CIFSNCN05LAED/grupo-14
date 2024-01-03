// funciones.js

let botonesMostrados = false; // Variable para rastrear el estado de los botones
let ocultarBotonesTimeout; // Timeout para retrasar la ocultación de botones

function toggleBotones() {
    let columnaBotones = document.querySelector('.columna-botones');
    let botones = document.querySelectorAll('.boton-desplegable');

    // Actualizar el estado de botonesMostrados
    botonesMostrados = !botonesMostrados;

    // Si los botones están mostrados, llamar a la función para mostrarlos secuencialmente
    if (botonesMostrados) {
        mostrarBotonesSecuencialmente(botones);
    } else {
        ocultarBotones();
    }
}

function ocultarBotones() {
    let columnaBotones = document.querySelector('.columna-botones');
    let botones = document.querySelectorAll('.boton-desplegable');

    botones.forEach(function (boton) {
        boton.style.display = 'none';
    });

    columnaBotones.classList.remove('mostrar');
}

function mostrarBotonesSecuencialmente(botones) {
    let columnaBotones = document.querySelector('.columna-botones');

    // Asegurarse de que la columna de botones esté visible antes de mostrar los botones
    columnaBotones.classList.add('mostrar');

    botones.forEach(function (boton, index) {
        setTimeout(function () {
            boton.style.display = 'block';
        }, index * 50);
    });
}

// Verificar la visibilidad del icono-boton
function checkIconVisibility() {
    let iconoBoton = document.querySelector('.icono-boton');
    let columnaBotones = document.querySelector('.columna-botones');

    if (!isElementInViewport(iconoBoton) && !botonesMostrados) {
        // Si no está en el viewport y los botones no están mostrados, ocultar los botones
        ocultarBotones();
    }
}

// Verificar si un elemento está en el área visible del viewport
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Mostrar botones secuencialmente
function mostrarBotonesSecuencialmente(botones) {
    let columnaBotones = document.querySelector('.columna-botones');

    // Asegurarse de que la columna de botones esté visible antes de mostrar los botones
    columnaBotones.classList.add('mostrar');

    botones.forEach(function (boton, index) {
        setTimeout(function () {
            boton.style.display = 'block';
        }, index * 50); // Ajusta el intervalo de tiempo según tus preferencias
    });

    botonesMostrados = true; // Botones mostrados
}

// Agregar un listener para verificar la visibilidad al cargar y redimensionar la ventana
window.addEventListener('load', checkIconVisibility);
window.addEventListener('resize', checkIconVisibility);

// Agregar un listener para ocultar los botones cuando se sale de la columna de botones
let columnaBotones = document.querySelector('.columna-botones');
columnaBotones.addEventListener('mouseenter', function () {
    // Si el mouse entra en la columna de botones, cancelar el timeout
    if (ocultarBotonesTimeout) {
        clearTimeout(ocultarBotonesTimeout);
    }
});

columnaBotones.addEventListener('mouseleave', function () {
    // Si el mouse sale de la columna de botones, retrasar la ocultación de botones
    ocultarBotonesTimeout = setTimeout(ocultarBotones, 500); // Ajusta el tiempo según tus preferencias
});
