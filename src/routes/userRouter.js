/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userController = require("../controllers/userController");

/*************** Middlewares require ******************/
const uploadImgUser = require("../middlewares/multerUser");
const registerMiddleware = require("../middlewares/registerMiddleware");

/*************** Validations require ******************/
const registerValidation = require("../validations/registerValidation");

/*************** Login form ******************/
router.get("/login", userController.login);

/*************** Register CF ******************/
router.get("/registerCf", userController.registerCf);
router.post(
  "/",
  uploadImgUser.single("image"),
  registerValidation,
  registerMiddleware,
  userController.newUserCf
);

/*************** Register M ******************/
router.get("/registerMayorista", userController.registerMayorista);
router.post("/M", uploadImgUser.single("image"), userController.newUserM);

module.exports = router;
