/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userController = require("../controllers/userController");

/*************** Middlewares require ******************/
const uploadImgUser = require("../middlewares/multerUser");
const registerMiddlewareCf = require("../middlewares/registerMiddlewareCf");
const registerMiddlewareM = require("../middlewares/registerMiddlewareM");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*************** Validations require ******************/
const registerValidationCf = require("../validations/registerValidationCf");
const registerValidationM = require("../validations/registerValidationM");

/*************** Login form ******************/
router.get("/login", guestMiddleware, userController.login);
router.post("/login", userController.loginProcess);

/*************** User profile ******************/
router.get("/profile", authMiddleware, userController.profile);

/*************** Logout ******************/
router.get("/logout", userController.logout);

/*************** Register CF ******************/
router.get("/registerCf", guestMiddleware, userController.registerCf);
router.post(
  "/",
  uploadImgUser.single("image"),
  registerValidationCf,
  registerMiddlewareCf,
  userController.newUserCf
);

/*************** Register M ******************/
router.get(
  "/registerMayorista",
  guestMiddleware,
  userController.registerMayorista
);
router.post(
  "/M",
  uploadImgUser.single("image"),
  registerValidationM,
  registerMiddlewareM,
  userController.newUserM
);

module.exports = router;
