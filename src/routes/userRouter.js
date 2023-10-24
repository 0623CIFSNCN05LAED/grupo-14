/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userController = require("../controllers/userController");

/*************** Middlewares require ******************/
const uploadImgUser = require("../middlewares/multerUser");
const registerCfMiddleware = require("../middlewares/registerCfMiddleware");
const registerMMiddleware = require("../middlewares/registerMMiddleware");

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
  /* registerCfMiddleware, */
  userController.newUserCf
);

/*************** Register M ******************/
router.get("/registerMayorista", userController.registerMayorista);
router.post(
  "/M",
  uploadImgUser.single("image"),
  registerValidation,
  registerMMiddleware,
  userController.newUserM
);

module.exports = router;
