/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userDBcontroller = require("../controllers/userDBcontroller");

/*************** Middlewares require ******************/
const loginMiddleware = require("../middlewares/loginMiddleware");
const uploadImgUser = require("../middlewares/multerUser");
const registerMiddleware = require("../middlewares/registerMiddleware");
const addressMiddleware = require("../middlewares/addressMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*************** Validations require ******************/
const loginValidation = require("../validations/loginValidation");
const registerValidation = require("../validations/registerValidation");
const addressValidation = require("../validations/addressValidation");

/*************** Login form ******************/
router.get("/login", guestMiddleware, userDBcontroller.viewLogin);
router.post("/login", loginValidation, loginMiddleware, userDBcontroller.login);

/*************** User profile ******************/
router.get("/profile", authMiddleware, userDBcontroller.profile);

/*************** Logout ******************/
router.get("/logout", userDBcontroller.logout);

/*************** Register **********************/
router.get("/register", userDBcontroller.viewRegister);

router.post(
  "/register", uploadImgUser.single("image"),
  registerValidation,
  registerMiddleware,
  userDBcontroller.register
);

/*************** Address **********************/
router.get("/address", userDBcontroller.viewFormAddress);

router.post(
  "/address",
  addressValidation,
  addressMiddleware,
  userDBcontroller.registerAddress
);

/* ************* Delete ********************** */
router.delete("/delete", userDBcontroller.delete);

module.exports = router;
