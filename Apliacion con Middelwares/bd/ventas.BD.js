const ventasBD = require("./conexion").ventas;
const Venta = require("../clases/ventasClase");

function validarVentas(venta2) {
    var datosCorrectos = false;
    if (venta2.idUsuario != undefined && venta2.idProducto != undefined && venta2.fecha != undefined && venta2.hora != undefined && venta2.estatus != undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarVentas() {
    const ventas = await ventasBD.get();
    var ventasValidas = [];
    
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        const venta2 = venta1.getVenta;
        if (validarVentas(venta2)) {
            ventasValidas.push(venta2);
        }
    });
    
    return ventasValidas;
}

async function buscarPorId(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    var ventaValida = { error: true };
    
    if (validarVentas(venta1.getVenta)) {
        ventaValida = venta1.getVenta;
    }
    
    return ventaValida;
}

async function nuevaVenta(data) {
    data.estatus = "vendido";  // Se asegura de que el estatus sea 'vendido' al crear una nueva venta
    const venta1 = new Venta(data);
    var ventaValida = false;
    
    if (validarVentas(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    
    return ventaValida;
}

async function cancelarVenta(id) {
    const venta = await buscarPorId(id);
    var cancelada = false;
    
    if (venta.error != true && venta.estatus !== "cancelado") {
        await ventasBD.doc(id).update({ estatus: "cancelado" });
        cancelada = true;
    }
    
    return cancelada;
}

module.exports = {
    mostrarVentas,
    buscarPorId,
    nuevaVenta,
    cancelarVenta
};