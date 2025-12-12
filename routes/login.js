const express = require("express");
const router = express.Router();
const connection = require("../db/connection");

router.post("/", (req, res) => {
    const { correotelefono, clave } = req.body;
    
    if (!correotelefono || !clave) {
        return res.json(-3); 
    }

    const sql = `
        SELECT * 
        FROM usuarios 
        WHERE correo = ? OR telefono = ?
    `;

    connection.query(sql, [correotelefono, correotelefono], (error, rows) => {
        if (error) {
            console.error("Error al consultar usuarios:", error);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        if (rows.length === 0) {
            return res.json(-1);  // usuario no encontrado
        }

        const usuario = rows[0];
        if (usuario.clave !== clave) {
            return res.json(-2); // clave incorrecta
        }

        delete usuario.clave;
        return res.json([usuario]);
    });
});

module.exports = router;