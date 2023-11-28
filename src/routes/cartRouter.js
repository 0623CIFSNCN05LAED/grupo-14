/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const cartController = require("../controllers/cartController");

/*************** Product cart ******************/
router.get("/", cartController.viewCart);

/* ************* Add to cart ****************** */
router.post("/addToCart", cartController.addToCart)


module.exports = router;