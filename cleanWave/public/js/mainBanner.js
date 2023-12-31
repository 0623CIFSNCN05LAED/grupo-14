const banner = document.querySelector(".banner"); //busca y devuelve la primer coincidencia
    let bannerSelection = document.querySelectorAll(".bannerSection"); //busca y devuelve una lista de todas las coincidencias
    let bannerSelectionLast = bannerSelection[bannerSelection.length -1];

    const btnLeft = document.querySelector("#btnLeft");
    const btnRight = document.querySelector("#btnRight");

    banner.insertAdjacentElement("afterbegin", bannerSelectionLast) //dentro del "banner", inserta "despues del comienzo" al "bannerSelectionLast" (osea lo ubica primero)
    
    function next(){
        let bannerSelectionFirst = document.querySelectorAll(".bannerSection")[0];
        banner.style.marginLeft = "-200%"; //corremos el banner 1 posicion hacia la izquierda (pasamos a la foto siguiente)
        banner.style.transition = "all 0.5s";
        setTimeout(function(){ 
            banner.style.transition = "none";
            banner.insertAdjacentElement("beforeend", bannerSelectionFirst); //aca hacemos que la foto de la izquierda pase a la derecha asi el carrusel es infinito
            banner.style.marginLeft = "-100%"; //acomodamos el banner a su posicion original porque al mover la foto de arriba, se estaria viendo la tercera.
        }, 500) // el 500 indica el tiempo de transision en ms
    };
    btnRight.addEventListener("click", function(){ //addEventListener recibe como primer parametro el event type entre "", y como segundo una funcion, event listener, que se ejecuta cuando ocurra el evento especificado.
        next(); 
    })

    function prev(){ //lo mismo que en next() pero espejado
        let bannerSelection = document.querySelectorAll(".bannerSection");
        let bannerSelectionLast = bannerSelection[bannerSelection.length -1]; /*las vuelvo a declarar xq cambia el orden */
        banner.style.marginLeft = "0%";
        banner.style.transition = "all 0.5s";
        setTimeout(function(){ 
            banner.style.transition = "none";
            banner.insertAdjacentElement("afterbegin", bannerSelectionLast);
            banner.style.marginLeft = "-100%"; 
        }, 500) /* el 500 indica el tiempo de transision en ms */
    };
    btnLeft.addEventListener("click", function(){
        prev();
    });

    let interval = setInterval(next,6000) //setInterval acepta una funcion como primer parametro y tiempo en ms como segundo.

    banner.addEventListener("mouseover", ()=> clearInterval(interval)); //aca hace que cuando el mouse este encima del banner se corte el intervalo asi no se mueve automaticamente

    banner.addEventListener("mouseout", ()=> interval = setInterval(next,6000));  //aca hace que cuando el mouse sale de encima del banner, se reanude el intervalo