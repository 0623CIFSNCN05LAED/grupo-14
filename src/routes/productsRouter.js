/*************** Require's ******************/
const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/img"),
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

/*************** Controller require ******************/
const productsController = require("../controllers/productsController");

/*************** Get all products ******************/
router.get("", productsController.productsList);

/*************** Get one product ******************/
router.get("/productDetail/:id", productsController.detail);

/*************** Create one product ******************/
router.get("/createProduct", productsController.create);
router.post("", upload.single("image"), productsController.newProduct);

/*************** Edit one product ******************/
router.get("/editProduct/:id", productsController.edit);
router.put("/:id", upload.single("image"), productsController.update);
/*************** Delete one product ******************/
// Delete

/*************** Product cart ******************/
router.get("/productCart", productsController.cart);

module.exports = router;
