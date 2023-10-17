/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userController = require("../controllers/userController");

/*************** Middlewares require ******************/
const uploadImgUser = require("../middlewares/multerUser");

/*************** Validations require ******************/

/*************** Login form ******************/
router.get("/login", userController.login);

/*************** Register CF ******************/
router.get("/registerCf", userController.registerCf);
router.post("/", uploadImgUser.single("image"), userController.newUser);

/*************** Register M ******************/
router.get("/registerMayorista", userController.registerMayorista);

module.exports = router;
