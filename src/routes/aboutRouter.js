const { Router } = require("express");
const router = Router();

const aboutController = require("../controllers/aboutController");

router.get("/about/nosotros", aboutController.nosotros);

router.get("/about/contacto", aboutController.contacto);

module.exports = router;