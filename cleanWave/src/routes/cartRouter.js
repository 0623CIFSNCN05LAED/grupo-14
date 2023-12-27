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

/* ************* Remove one unit from cart ************* */
router.put("/deleteOneUnitFromCart", cartController.deleteOneUnitFromCart);

/* ************* Remove article from cart ***************/
router.delete("/deleteArticleFromCart", cartController.deleteArticleFromCart)

/* ************* Erase Cart **************************** */
router.delete("/eraseCart", cartController.eraseCart)

/* ************ Purchase Cart *************************** */
router.put("/purchaseCart", cartController.purchaseCart)


module.exports = router;