const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Habilitar CORS para que el frontend pueda consumir esta API
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite cualquier origen
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Ruta principal para obtener libros con paginación y orden
router.get("/", (req, res) => {
    const columna = req.query.columna || "idlibro";
    const orden = (req.query.orden || "ASC").toUpperCase();
    const filas_pagina = parseInt(req.query.filas_pagina) || 10;
    const numero_pagina = parseInt(req.query.numero_pagina) || 1;

    const inicio_pagina = (numero_pagina - 1) * filas_pagina;

    const columnas_validas = ["idlibro", "titulo", "autor", "editorial", "genero", "valoracion"];
    const columna_final = columnas_validas.includes(columna) ? columna : "idlibro";
    const orden_final = orden === "DESC" ? "DESC" : "ASC";

    const sql = `SELECT * FROM libros ORDER BY ${columna_final} ${orden_final} LIMIT ?, ?`;

    pool.query(sql, [inicio_pagina, filas_pagina], (error, libros) => {
        if (error) {
            console.error("Error al consultar libros:", error);
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }

        pool.query("SELECT COUNT(idlibro) AS total FROM libros", (err, totalResult) => {
            if (err) {
                console.error("Error al contar libros:", err);
                return res.status(500).json({ error: "Error al obtener el total de libros" });
            }

            const totalFilas = totalResult[0].total;
            res.json({
                total: totalFilas,
                libros
            });
        });
    });
});

module.exports = router;