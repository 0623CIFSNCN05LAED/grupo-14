const { Router } = require("express")
const router = Router()

const userController = require("../controllers/userController")

router.get("/login", userController.login);
router.get("/register", userController.register);


module.exports = router