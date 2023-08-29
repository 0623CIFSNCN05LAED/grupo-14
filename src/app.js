const express = require("express");
const path = require("path");
const app = express();
const PORT = 3333;

const productsRouter = require("./routes/productsRouter");

app.listen(PORT, () => console.log(`Servidor creado en el puerto ${PORT}`));

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");
app.set("views", "./src/views");

/* MAIN */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeMayorista.html")); //Esta repetido
});

app.get("/mayorista", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeMayorista.html"));
});

app.get("/cf", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeCf.html"));
});

/* USERS */

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

/* PRODUCTS */

app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/productCart.html"));
});

app.use(productsRouter);
