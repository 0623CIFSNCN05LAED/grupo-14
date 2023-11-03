const { Product } = require("../database/models")
const { v4: uuidv4 } = require("uuid");

module.exports = {
    findAll: async function(){
        try{
            const products =  await Product.findAll();
            return products;    
        } catch {

        }
        
    },
    
    findById: async function(id){
        try{

            const product = await Product.findByPk(id);
            return product;
        } catch {

        }
    },
    findInSaleProducts: async function(){
        try{

            const inSaleProducts = await Product.findAll({
                where: {
                    offer: 1
                }
            });
            return inSaleProducts;
        } catch {

        }
    },
    findBestSellerProducts: async function(){
        try{

            const bestSellerProducts = await Product.findAll({
                where: {
                    bestSeller: 1
                }
            });
            return bestSellerProducts;
        } catch {
            
        }
    },
    findRelatedProducts: async function(product){
        try{

            const relatedProducts = await Product.findAll({
                where: {
                    category_id : product.category_id
                }
            });
            return relatedProducts;
        } catch {

        }
    },
    createProduct: function (req){
        Product.create({
                id: uuidv4(),
                name: req.body.name,
                shortName: req.body.shortName,
                retailPrice: req.body.retailPrice,
                wholesalePrice: req.body.wholesalePrice,
                discount: req.body.discount,
                stock: req.body.stock,
                image: req.file ? req.file.filename : "defaultImg.jpg",
                category_id: Number(req.body.category_id),
                description: req.body.description,
                brand_id: Number(req.body.brand_id),
                sold: req.body.sold,
                bestSeller: req.body.bestSeller,
                offer: req.body.offer,
        });
    },
    editProduct: function(req, id){
        Product.update({
            name: req.body.name,
                shortName: req.body.shortName,
                retailPrice: req.body.retailPrice,
                wholesalePrice: req.body.wholesalePrice,
                discount: req.body.discount,
                stock: req.body.stock,
                image: req.file ? req.file.filename : "defaultImg.jpg",
                category_id: req.body.category_id,
                description: req.body.description,
                brand_id: req.body.brand_id,
                sold: req.body.sold,
                bestSeller: req.body.bestSeller,
                offer: req.body.offer,
        },{
            where: {id: id}
        })
    },
    deleteProduct: function (id){
        Product.destroy({
            where: {id: id}
        })
    }


}