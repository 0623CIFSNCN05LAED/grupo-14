const express = require("express");
const path = require("path");
const app = express();
const PORT = 3333;

const productsRouter = require("./routes/productsRouter");

const mainRouter = require('./routes/mainRouter'); //aca estoy requiriendo las funcionalidades del archivo,
                                                  //hace falta porque con el module.exports=router solo exportaba la funcionalidad router de express!!!

const userRouter = require("./routes/userRouter");

app.listen(PORT, () => console.log(`Servidor creado en el puerto ${PORT}`));

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", "./src/views");

/* MAIN */

app.use(mainRouter);

/* USER */

app.use(userRouter);


/* PRODUCTS */

app.use(productsRouter);