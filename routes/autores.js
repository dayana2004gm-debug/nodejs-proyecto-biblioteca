const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Ruta para obtener todos los autores
router.get("/", (req, res) => {
    const sql = "SELECT *, CONCAT('https://bibliotecadigital.alwaysdata.net/', foto) AS url_foto FROM autores";
    pool.query(sql, (error, respuesta) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }
        res.json(respuesta);
    });
});

module.exports = router;