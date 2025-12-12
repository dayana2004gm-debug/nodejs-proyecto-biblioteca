const express = require("express");
const router = express.Router();
const connection = require("../db/connection");

// Obtener todas las editoriales
router.get("/", (req, res) => {
    const sql = "SELECT * FROM editoriales";

    connection.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener editoriales" });
        }
        res.json(rows);
    });
});

// Insertar una editorial
router.post("/", (req, res) => {
    const { nombreeditorial, direccion, ciudad, pais, telefono } = req.body;

    const sql = `
        INSERT INTO editoriales (nombreeditorial, direccion, ciudad, pais, telefono)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [nombreeditorial, direccion, ciudad, pais, telefono],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al insertar editorial" });
            }
            res.json({ insertId: result.insertId });
        }
    );
});

// Actualizar una editorial
router.put("/", (req, res) => {
    const { ideditorial, nombreeditorial, direccion, ciudad, pais, telefono } = req.body;

    const sql = `
        UPDATE editoriales 
        SET nombreeditorial = ?, direccion = ?, ciudad = ?, pais = ?, telefono = ?
        WHERE ideditorial = ?
    `;

    connection.query(
        sql,
        [nombreeditorial, direccion, ciudad, pais, telefono, ideditorial],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al actualizar editorial" });
            }
            res.json({ affectedRows: result.affectedRows });
        }
    );
});

// Eliminar una editorial
router.delete("/:ideditorial", (req, res) => {
    const ideditorial = req.params.ideditorial;

    const sql = "DELETE FROM editoriales WHERE ideditorial = ?";

    connection.query(sql, [ideditorial], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al eliminar editorial" });
        }
        res.json({ affectedRows: result.affectedRows });
    });
});

module.exports = router;
