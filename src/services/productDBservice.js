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
    createProduct: function (dataProduct){
        Product.createProduct({
                name: dataProduct.name,
                shortName: dataProduct.shortName,
                retailPrice: dataProduct.retailPrice,
                wholesalePrice: dataProduct.wholesalePrice,
                discount: dataProduct.discount,
                stock: dataProduct.stock,
                image: dataProduct.file ? dataProduct.file.filename : "defaultImg.jpg",
                category_id: dataProduct.category_id,
                description: dataProduct.description,
                brand_id: dataProduct.brand_id,
                sold: dataProduct.sold,
                bestSeller: dataProduct.bestSeller,
                offer: dataProduct.offer,
        });
    },
    editProduct: function(dataProduct, id){
        Product.update({
            name: dataProduct.name,
                shortName: dataProduct.shortName,
                retailPrice: dataProduct.retailPrice,
                wholesalePrice: dataProduct.wholesalePrice,
                discount: dataProduct.discount,
                stock: dataProduct.stock,
                image: dataProduct.image,
                category_id: dataProduct.category_id,
                description: dataProduct.description,
                brand_id: dataProduct.brand_id,
                sold: dataProduct.sold,
                bestSeller: dataProduct.bestSeller,
                offer: dataProduct.offer,
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