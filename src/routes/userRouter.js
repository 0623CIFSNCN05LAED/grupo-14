const { Router } = require("express")
const router = Router()

const userController = require("../controllers/userController")

router.get("/user/login", userController.login);
router.get("/user/register", userController.register);


module.exports = router