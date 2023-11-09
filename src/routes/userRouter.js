/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userDBcontroller = require("../controllers/userDBcontroller");

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
router.get("/login", guestMiddleware, userDBcontroller.viewLogin);
router.post("/login", userDBcontroller.login);

/*************** User profile ******************/
router.get("/profile", authMiddleware, userDBcontroller.profile);

/*************** Logout ******************/
router.get("/logout", userDBcontroller.logout);

/*************** Register **********************/
router.get("/register", userDBcontroller.viewRegister)

router.post("/register", userDBcontroller.register)

/* ************* Delete ********************** */
router.delete("/delete", userDBcontroller.delete)



module.exports = router;
