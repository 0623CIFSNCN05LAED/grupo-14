// ************** Require's ******************
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const notFound = require("./middlewares/404Middleware")

// ********** express() ******************
const app = express();

// ********* Middlewares *****************
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  express.urlencoded({ extended: false })
); /* esto nos permite capturar en req.body la info de un formulario que se envia via post */
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "cleanWave",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(userLoggedMiddleware);
app.use(cors())

const destroySearchProductSession = require("./middlewares/destroySearchProductsSession");
app.use(destroySearchProductSession);


// **************** Template Engine *********************
app.set("view engine", "ejs");
app.set("views", "./src/views");

// ********** Route system require and use() **************
const mainRouter = require("./routes/mainRouter");  
app.use(mainRouter);
app.get("/", (req, res) => {
  res.redirect("/consumidorfinal");
});
app.use(notFound)

// *************** Iniciar el servidor web *****************
const PORT = 3333;
app.listen(PORT, () => console.log(`Servidor creado en el puerto ${PORT}`));
