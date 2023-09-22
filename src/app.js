// ************** Require's ******************
const express = require("express");
const path = require("path");

// ********** express() ******************
const app = express();

// ********* Middlewares *****************
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// **************** Template Engine *********************
app.set("view engine", "ejs");
app.set("views", "./src/views");

// ********** Route system require and use() **************
const mainRouter = require("./routes/mainRouter"); //aca estoy requiriendo las funcionalidades del archivo,
//hace falta porque con el module.exports=router solo exportaba la funcionalidad router de express!!!
app.use(mainRouter);

// *************** Iniciar el servidor web *****************
const PORT = 3333;
app.listen(PORT, () => console.log(`Servidor creado en el puerto ${PORT}`));
