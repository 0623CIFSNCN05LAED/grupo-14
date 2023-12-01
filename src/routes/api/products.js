const { Router } = require("express");
const router = Router();
const productsAPIController = require("../../controllers/api/productsAPIController");

router.get("/", productsAPIController.list);

module.exports = router;
