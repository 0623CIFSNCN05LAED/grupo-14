/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userController = require("../controllers/userController");

/*************** Middlewares require ******************/
const uploadImgUser = require("../middlewares/multerUser");
const registerMiddlewareCf = require("../middlewares/registerMiddlewareCf");
const registerMiddlewareM = require("../middlewares/registerMiddlewareM");

/*************** Validations require ******************/
const registerValidationCf = require("../validations/registerValidationCf");
const registerValidationM = require("../validations/registerValidationM");

/*************** Login form ******************/
router.get("/login", userController.login);

/*************** Register CF ******************/
router.get("/registerCf", userController.registerCf);
router.post(
  "/",
  uploadImgUser.single("image"),
  registerValidationCf,
  registerMiddlewareCf,
  userController.newUserCf
);

/*************** Register M ******************/
router.get("/registerMayorista", userController.registerMayorista);
router.post(
  "/M",
  uploadImgUser.single("image"),
  registerValidationM,
  registerMiddlewareM,
  userController.newUserM
);

module.exports = router;
