const express = require("express"); //exportamos dependencias

const topicsRoutes = require("./routes/topics.routes");

const app = express();

// middewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuramos el motor de plantillas
app.set("views", "./views");
app.set("view engine", "ejs");

// ruta
app.use("/topics", topicsRoutes)

// levantamos el servidor
app.listen( 3000, () => { 
    console.log("Servidor escuchando en: http://localhost:3000/topics"); } );

