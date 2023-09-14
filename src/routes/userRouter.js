const { Router } = require("express")
const router = Router()

const userController = require("../controllers/userController")

router.get("/login", userController.login);
router.get("/registerCf", userController.registerCf);
router.get("/registerMayorista", userController.registerMayorista);


module.exports = router