const express = require("express");
const router = express.Router();
const connection = require("../db/connection");

router.get("/", (req, res) => {
    const sql = "SELECT * from autores";
    connection.query(sql, (error, respuesta) => {
        if (error) {
            console.log(error);
            res.end("Error al consultar la base de datos");
            return
        }
        res.json(respuesta)
    })
})

module.exports = router;