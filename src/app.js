const express = require("express");
const path = require("path");
const app = express();
const PORT = 3333;

app.listen(PORT,`Servidor creado en el puerto ${PORT}`);

app.use(express.static(path.join(__dirname,"../public")));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"/views/home.html"))
});
