/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userDBcontroller = require("../controllers/userDBcontroller");

/*************** Middlewares require ******************/
const uploadImgUser = require("../middlewares/multerUser");
const registerMiddleware = require("../middlewares/registerMiddleware");
const addressMiddleware = require("../middlewares/addressMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*************** Validations require ******************/
const registerValidation = require("../validations/registerValidation");
const addressValidation = require("../validations/addressValidation");

/*************** Login form ******************/
router.get("/login", guestMiddleware, userDBcontroller.viewLogin);
router.post("/login", userDBcontroller.login);

/*************** User profile ******************/
router.get("/profile", authMiddleware, userDBcontroller.profile);

/*************** Logout ******************/
router.get("/logout", userDBcontroller.logout);

/*************** Register **********************/
router.get("/register", userDBcontroller.viewRegister);

router.post(
  "/register",
  registerValidation,
  registerMiddleware,
  userDBcontroller.register
);

/* ************* Delete ********************** */
router.delete("/delete", userDBcontroller.delete);

module.exports = router;
