const { Router } = require("express");
const router = Router();
const usersApiController = require("../../controllers/api/usersApiController");

router.get("/", usersApiController.getAllUsers);
router.get("/:id", usersApiController.getUserById)

module.exports = router;
