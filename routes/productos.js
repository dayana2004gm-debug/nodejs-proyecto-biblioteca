const express = require("express");
const router = express.Router();
const pool = require("../db/connection");

// Habilitar CORS
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Obtener todos los productos
router.get("/", (req, res) => {
    const sql = "SELECT * FROM productos";
    pool.query(sql, (error, respuesta) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error al consultar la base de datos");
        }

        // Agregar rutas completas de imágenes
        const productosConImagen = respuesta.map(p => ({
            ...p,
            img_ch: `https://bibliotecadigital.alwaysdata.net/imagenes/imch/${p.imagenchica}`,
            img_gr: `https://bibliotecadigital.alwaysdata.net/imagenes/imgr/${p.imagengrande}`
        }));

        res.setHeader("Content-Type", "application/json");
        res.json(productosConImagen);
    });
});

// Obtener productos por categoría
router.get("/idcategoria/:idcategoria", (req, res) => {
    const idcategoria = req.params.idcategoria;
    const sql = "SELECT * FROM productos WHERE idcategoria = ?";

    pool.query(sql, [idcategoria], (error, respuesta) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error al consultar la base de datos");
        }

        if (respuesta.length === 0) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            return res.end("No hay productos para esta categoría");
        }

        const productosConImagen = respuesta.map(p => ({
            ...p,
            img_ch: `https://bibliotecadigital.alwaysdata.net/imagenes/imch/${p.imagenchica}`,
            img_gr: `https://bibliotecadigital.alwaysdata.net/imagenes/imgr/${p.imagengrande}`
        }));

        res.setHeader("Content-Type", "application/json");
        res.json(productosConImagen);
    });
});

// Obtener producto por id
router.get("/idproducto/:idproducto", (req, res) => {
    const idproducto = req.params.idproducto;
    const sql = `
        SELECT productos.*, 
               categorias.nombre AS categoria,
               editoriales.nombreeditorial AS editorial
        FROM productos
        LEFT JOIN categorias ON productos.idcategoria = categorias.idcategoria
        LEFT JOIN editoriales ON productos.ideditorial = editoriales.ideditorial
        WHERE idproducto = ?
    `;

    pool.query(sql, [idproducto], (error, respuesta) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error al consultar la base de datos");
        }

        if (respuesta.length === 0) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            return res.end("No se encontró el producto");
        }

        const producto = {
            ...respuesta[0],
            img_ch: `https://bibliotecadigital.alwaysdata.net/imagenes/imch/${respuesta[0].imagenchica}`,
            img_gr: `https://bibliotecadigital.alwaysdata.net/imagenes/imgr/${respuesta[0].imagengrande}`
        };

        res.setHeader("Content-Type", "application/json");
        res.json(producto);
    });
});

module.exports = router;