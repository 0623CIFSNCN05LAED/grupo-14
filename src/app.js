const express = require("express");
const path = require("path");
const app = express();
const PORT = 3333;

const productsRouter = require("./routes/productsRouter");

const mainRouter = require('./routes/mainRouter'); //aca estoy requiriendo las funcionalidades del archivo,
                                                  //hace falta porque con el module.exports=router solo exportaba la funcionalidad de express, router!!!

app.listen(PORT, () => console.log(`Servidor creado en el puerto ${PORT}`));

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", "./src/views");

/* MAIN */

app.use(mainRouter);

/* USERS */

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

/* PRODUCTS */

app.use(productsRouter);

