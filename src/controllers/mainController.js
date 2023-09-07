const products = require("../data/products")

const mainController = {
    homeMayorista: (req,res)=>{
        const id = req.params.id;
        const product = products.find((product) => product.id == id);
        res.render("main/homeMayorista", {
            product, products
        }); //aca va la ruta desde views hasta el archivo homeMayorista. !! no va / al principio.
    },
    homeConsumidorFinal: (req,res)=>{
        res.render("main/homeCf");
    },
};


module.exports = mainController;