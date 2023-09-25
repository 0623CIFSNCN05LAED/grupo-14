/*************** Require's ******************/
const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator")

/*************** Multer storage *************/
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/img/products"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ 
  storage: storage,
});

/********** Express validator ****************/

const validations = [
    body("name").notEmpty().withMessage("Debes completar el campo de nombre"),
    body("shortName").notEmpty().withMessage("Debes completar el campo de nombre abreviado"),
    body("brand").notEmpty().withMessage("Debes completar el campo de marca"),
    body("price").notEmpty().withMessage("Debes completar el campo de precio minorista"),
    body("discount").notEmpty().withMessage("Debes completar el campo de descuento"),
    body("preferentialPrice").notEmpty().withMessage("Debes completar el campo de precio mayorista"),
    body("mount").notEmpty().withMessage("Debes completar el campo de stock"),
    body("category").notEmpty().withMessage("Debes seleccionar una categoria"),
    body("description").notEmpty().withMessage("Debes completar el campo de descripicion"),
    body("image").custom((value, {req})=>{

      let file = req.file;
      let acceptedExtensions = [".jpg", ".png", ".jpeg"];
      
      if(!file){
        throw new Error("Debes subir una imagen");
      } else{
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)){
          throw new Error(`Debes subir una archivo tipo ${acceptedExtensions.join(", ")}`);
        }
      }
      return true
    })
  ]

/*************** Controller require ******************/
const productsController = require("../controllers/productsController");

/*************** Get all products ******************/
router.get("", productsController.productsList);

/*************** Get one product ******************/
router.get("/productDetail/:id", productsController.detail);

/*************** Create one product ******************/
router.get("/createProduct", productsController.create);
router.post("", upload.single("image"), validations, productsController.newProduct);

/*************** Edit one product ******************/
router.get("/editProduct/:id", productsController.edit);
router.put("/:id", upload.single("image"), productsController.update);

/*************** Delete one product ******************/
router.delete("/:id", productsController.delete);

/*************** Product cart ******************/
router.get("/productCart", productsController.cart);

module.exports = router;
