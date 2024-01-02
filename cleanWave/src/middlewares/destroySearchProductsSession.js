module.exports = (req,res,next)=>{
    if(req.originalUrl !== "/consumidorfinal/products" && req.originalUrl !== "/mayorista/products"){
        if(req.session.searchProductsCf){
            delete req.session.searchProductsCf
        }
        if(req.session.searchProductsM){
            delete req.session.searchProductsM
        }
    }
    next()
}