const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de .env

const connection = mysql.createConnection({
    /*host: "localhost",
    user: "root",
    password: "",
    database: "biblioteca_digital"*/
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.log("Error al conectar a la base de datos");
        return;
    }
    console.log("Conectado a la base de datos");
});

module.exports = connection;