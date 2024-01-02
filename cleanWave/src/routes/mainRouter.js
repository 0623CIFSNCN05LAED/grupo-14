/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Middlewares require ******************/
const userCfCanNotPass = require("../middlewares/userCfMiddleware");
const userMCanNotPass = require("../middlewares/userMMiddleware");

/*************** Mayorista Router *******************/
const mayoristaRouter = require("./mayoristaRouter");
router.use("/mayorista",userCfCanNotPass, mayoristaRouter);

/*************** CF Router *******************/
const cfRouter = require("./cfRouter");
router.use("/consumidorfinal",userMCanNotPass, cfRouter);

/*************** Products Router ********************/
const productsRouter = require("./productsRouter");
router.use("/products", productsRouter);

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

/* *********** API users Router ****************** */
const apiUsersRouter = require("./api/usersApiRouter")
router.use("/api/users", apiUsersRouter)

module.exports = router;
