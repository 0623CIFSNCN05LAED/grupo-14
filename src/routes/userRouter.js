const { Router } = require("express")
const router = Router()

const userController = require("../controllers/userController")

router.get("/users/login", userController.login);
router.get("/users/register", userController.register);


module.exports = router