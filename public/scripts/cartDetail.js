window.onload = function(){
    document.querySelectorAll(".cartItem").forEach(cartItem => {

        /* ENREALIDAD TODO ESTO PODRIA SER UN FETCH QUE VAYA A NUESTRA API DE AGREGAR PRODUCTO AL CARRITO Y QUE CAMBIE LA VISTA */
        const addButton = cartItem.querySelector("#add");
        const subtractButton = cartItem.querySelector("#subtract");
        const quantityInput = cartItem.querySelector("#quantity");

        addButton.addEventListener("click", function(e) {
            e.preventDefault();
            quantityInput.value = Number(quantityInput.value) + 1;
        });

        subtractButton.addEventListener("click", function(e) {
            e.preventDefault();
            if (quantityInput.value > 1) {
                quantityInput.value = Number(quantityInput.value) - 1;
            }
        });
        /* ENREALIDAD TODO ESTO PODRIA SER UN FETCH QUE VAYA A NUESTRA API DE AGREGAR PRODUCTO AL CARRITO Y QUE CAMBIE LA VISTA */


        /* BOTON DE ELIMINAR PRODUCTO */

        

    });





}