const { Router } = require("express");
const router = Router();

const aboutController = require("../controllers/aboutController");

router.get("/nosotros", aboutController.nosotros);

router.get("/contacto", aboutController.contacto);

module.exports = router;