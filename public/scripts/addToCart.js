
window.onload = function(){
    const addToCartScript = document.getElementById("addToCartScript"); /* agarro al elemento script */
    const productString = decodeURIComponent(addToCartScript.getAttribute("data-product")) /* decodifico la informacion que me paso la vista */
    const product = JSON.parse(productString) /* paso esa informacion a formato json */

    const userIdScript = decodeURIComponent(addToCartScript.getAttribute("data-user"))
    const userId = JSON.parse(userIdScript);
    /* CUANDO ESTEN LAS VALIDACIONES DEL FRONT HAGO local STORAGE */
    /* on click, validar y si pasan. Guardar el id en local storage */
    
    const addToCartButton = document.getElementById("addToCart");
    
    addToCartButton.addEventListener("click",  function(){
        const data =  {product, userId}
        console.log("data",data)
        fetch("/products/addToCart", {
            method: "POST",
            body: JSON.stringify(data), /* este data es el que se le pasa al servidor como req.body */
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response){
            return response.json()
        }).then(function(info){
            console.log("info",info)
        })
    })
    
}
