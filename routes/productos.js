const express = require("express");
const router = express.Router();
const pool = require("../db/connection"); // ahora usamos pool

router.get("/", (req, res) => {
    const sql = "SELECT * from productos";
    pool.query(sql, (error, respuesta) => {
        if (error) {
            console.log(error);
            res.end("Error al consultar la base de datos");
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.json(respuesta);
    });
});

router.get("/idcategoria/:idcategoria", (req, res) => {
    const idcategoria = req.params.idcategoria;
    const sql = `SELECT idproducto, nombre, precio, preciorebajado, imagenchica 
                 FROM productos 
                 WHERE idcategoria = ?`;
    pool.query(sql, [idcategoria], (error, respuesta) => {
        if (error) {
            console.log(error);
            res.end("Error al consultar la base de datos");
            return;
        }
        if (respuesta.length === 0) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end("No hay productos para esta categoría");
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.json(respuesta);
    });
});

router.get("/idproducto/:idproducto", (req, res) => {
    const idproducto = req.params.idproducto;
    const sql = `SELECT productos.*, categorias.nombre AS categoria,
                        editoriales.nombreeditorial AS editorial
                 FROM productos
                 LEFT JOIN categorias ON productos.idcategoria = categorias.idcategoria
                 LEFT JOIN editoriales ON productos.ideditorial = editoriales.ideditorial
                 WHERE idproducto = ?`;
    pool.query(sql, [idproducto], (error, respuesta) => {
        if (error) {
            console.log(error);
            res.end("Error al consultar la base de datos");
            return;
        }
        if (respuesta.length === 0) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end("No se encontró el producto");
            return;
        }
        res.setHeader("Content-Type", "application/json");
        res.json(respuesta);
    });
});

module.exports = router;
  