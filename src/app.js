const express = require("express");
const path = require("path");
const app = express();
const PORT = 3333;

app.listen(PORT, () => console.log(`Servidor creado en el puerto ${PORT}`));

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeMayorista.html"));
});

app.get("/mayorista", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeMayorista.html"));
});
app.get("/cf", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/homeCf.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

app.get("/productCart", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/productCart.html"));
});

app.get("/productDetail", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});
