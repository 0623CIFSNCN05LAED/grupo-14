
const mainController = {
    homeMayorista: (req,res)=>{
        res.render("homeMayorista"); //aca va el archivo views en ()
    },
    homeConsumidorFinal: (req,res)=>{
        res.render("homeCf");
    },
};


module.exports = mainController;