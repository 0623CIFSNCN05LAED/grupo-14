/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const cartController = require("../controllers/cartController");

/*************** Middlewares require ******************/
const authMiddleware = require("../middlewares/authMiddleware");


/*************** Product cart ******************/
router.get("/",authMiddleware, cartController.viewCart);

/* ************* Add to cart ****************** */
router.post("/addToCart", cartController.addToCart)


module.exports = router;