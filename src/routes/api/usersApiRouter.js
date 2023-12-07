const { Router } = require("express");
const router = Router();
const usersApiController = require("../../controllers/api/usersApiController");

router.get("/", usersApiController.getAllUsers);

module.exports = router;
