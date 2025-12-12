const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de .env

const pool = mysql.createPool({
    /*host: "localhost",
    user: "root",
    password: "",
    database: "biblioteca_digital"*/
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos");
    connection.release();
});

module.exports = pool;