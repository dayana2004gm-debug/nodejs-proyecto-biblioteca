const express = require("express");
const app = express();

const port = process.env.PORT || 3001; // Render asigna automáticamente su puerto

app.use(express.json()); // Para recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios (POST)

app.use("/libros", require("./routes/libros"));
app.use("/autores", require("./routes/autores"));
app.use("/categorias", require("./routes/categorias"));
app.use("/productos", require("./routes/productos"));
app.use("/login", require("./routes/login"));
app.use("/editoriales", require("./routes/editoriales"));

app.get("/", (req, res) => {
    res.end("Inicio........");
});

app.use((req, res) => {
    res.writeHead(404);
    res.end("404 - Página no encontrada");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});