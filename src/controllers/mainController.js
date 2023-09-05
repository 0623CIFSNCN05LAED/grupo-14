const mainController = {
    homeMayorista: (req,res)=>{
        res.render("main/homeMayorista"); //aca va la ruta desde views hasta el archivo homeMayorista. !! no va / al principio.
    },
    homeConsumidorFinal: (req,res)=>{
        res.render("main/homeCf");
    },
};


module.exports = mainController;