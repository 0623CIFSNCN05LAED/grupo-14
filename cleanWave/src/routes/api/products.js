const { Router } = require("express");
const router = Router();
const productsAPIController = require("../../controllers/api/productsAPIController");

router.get("/", productsAPIController.list);

router.get("/:id", productsAPIController.detail);

module.exports = router;
