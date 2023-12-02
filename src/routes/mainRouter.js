/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** CF Router *******************/
const cfRouter = require("./cfRouter");
router.use("/consumidorfinal", cfRouter);

/*************** Mayorista Router *******************/
const mayoristaRouter = require("./mayoristaRouter");
router.use("/mayorista", mayoristaRouter);

/*************** Users Router **********************/
const userRouter = require("./userRouter");
router.use("/users", userRouter);

/************** About Router **********************/
const aboutRouter = require("./aboutRouter");
router.use("/about", aboutRouter);

/************** Tutorials Router ******************/
const tutorialsRouter = require("./tutorialsRouter");
router.use("/tutorials", tutorialsRouter);

/* *********** Cart Router ***************** */
const cartRouter = require("./cartRouter");
router.use("/cart", cartRouter);

/* *********** API products Router ***************** */
const apiProductsRouter = require("./api/products");
router.use("/api/products", apiProductsRouter);

module.exports = router;
