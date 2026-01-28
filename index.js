const express = require("express"); //exportamos dependencias
const sequelize = require("./data/db");
const topicsRoutes = require("./routes/topics.routes");
require("./models/topic.model");

const app = express();

// middewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuramos el motor de plantillas
app.set("views", "./views");
app.set("view engine", "ejs");

// ruta
app.use("/topics", topicsRoutes)

// levantamos el servidor con la bd
sequelize.sync({ force: false }) // force: false no borra tus datos al reiniciar
    .then(() => {
        console.log(" Base de datos sincronizada");
        app.listen(3000, () => { 
            console.log(" Servidor escuchando en: http://localhost:3000/topics"); 
        });
    })
    .catch(error => {
        console.error(" Error al conectar DB:", error);
    });

