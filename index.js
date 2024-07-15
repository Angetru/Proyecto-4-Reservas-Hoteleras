const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;
const url_base = process.env.URL_BASE || '/api';

//Importar routes
const reservaRoutes = require('./routes/reservaRoutes');

require("dotenv").config();

//middleware CORS a la aplicación
app.use(cors());

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));


//Routes
app.use(url_base + "/", reservaRoutes);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
