const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Obtener todas las categorías con total de productos
router.get("/", (req, res) => {
    const sql = `
        SELECT c.idcategoria, c.nombre, c.descripcion,
               COUNT(p.idproducto) AS total
        FROM categorias c
        LEFT JOIN productos p ON c.idcategoria = p.idcategoria
        GROUP BY c.idcategoria, c.nombre, c.descripcion
        ORDER BY c.nombre
    `;

    pool.query(sql, (error, respuesta) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }
        res.json(respuesta);
    });
});

module.exports = router; 