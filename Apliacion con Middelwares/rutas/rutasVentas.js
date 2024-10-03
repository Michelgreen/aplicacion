var ruta = require("express").Router();
var { mostrarVentas, nuevaVenta, cancelarVenta, buscarPorId } = require("../bd/ventasBD");

// Ruta para obtener todas las ventas
ruta.get("/Ventas", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

// Ruta para buscar una venta por su ID
ruta.get("/buscarPorId/:id", async (req, res) => {
    var ventaValida = await buscarPorId(req.params.id);
    res.json(ventaValida);
});

// Ruta para cancelar una venta (en lugar de borrar)
ruta.delete("/cancelarVenta/:id", async (req, res) => {
    var cancelada = await cancelarVenta(req.params.id);
    res.json(cancelada);
});

// Ruta para crear una nueva venta
ruta.post("/nuevaVenta", async (req, res) => {
    var ventaValida = await nuevaVenta(req.body);
    res.json(ventaValida);
});

module.exports = ruta;